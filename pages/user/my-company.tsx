import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Head from "next/head";

import MainWraper from "@/Components/Dashboard/MainWraper/MainWraper";
import draftToHtml from "draftjs-to-html";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import dynamic from "next/dynamic";
import {EditorProps} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {getUser, setInitialUser, setUser} from "@/Store/Slices/User";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import CompanyImageForm from "@/Components/Dashboard/CompanyImageForm/CompanyImageForm";
import {
    useCancelPremiumMutation,
    useCheckCompanyMutation,
    useGetPremiumMutation,
    useIncreasePremiumMutation,
    useRefreshMutation,
    useUpdateCompanyMutation,
} from "@/Store/Query/Auth";
import Loading from "@/Components/Dashboard/Loading/Loading";
import {useRouter} from "next/router";


const Company = () => {
    const {authorisation, company} = useSelector(getUser);
    const [updateCompany, {isLoading}] = useUpdateCompanyMutation();
    const [check, {data, isLoading: loading}] = useCheckCompanyMutation();
    const [getPremium, {isLoading: premiumLoading, data: premiumData}] = useGetPremiumMutation()
    const [cancelPremium, {isLoading: cancelLoading}] = useCancelPremiumMutation()
    const [increasePremium, {isLoading: increaseLoading}] = useIncreasePremiumMutation()
    const [refresh, {}] = useRefreshMutation();
    const dispatch = useDispatch()
    const {push} = useRouter()
    const message = data?.message;


    const Editor = dynamic<EditorProps>(
        () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
        {ssr: true}
    );

    const {t} = useTranslation("common");

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        check({token: authorisation?.token})

    }, []);

    useEffect(() => {
        if (Object.entries(data !== undefined ? data?.message : "").length > 0) {
            const {name, phone, email, adress, about,} = data.message;

            const initialContent = JSON.stringify({
                entityMap: {},
                blocks: [
                    {
                        key: "637gr",
                        text:
                            about == null
                                ? ""
                                : about
                                    .replace(/<\/?[^>]+(>|$)/g, "")
                                    .replace(/&nbsp;/g, "")
                                    .replace(/\\n/g, "\\n"),
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                ],
            });

            const contentState = convertFromRaw(JSON.parse(initialContent));
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);

            setValue("name", name);
            setValue("phone", phone);
            setValue("email", email);
            setValue("adress", adress);
            setValue("about", about == null ? "" : about);
        }
    }, [data]);

    let schema = yup.object().shape({
        email: yup
            .string()
            .email(`${t("email-valid")}`)
            .required(`${t("email-required")}`),
        name: yup
            .string()
            .min(3, `${t("name-min-3")}`)
            .required(`${t("name-required")}`),
        adress: yup.string().required(`${t("adress-required")}`),
        phone: yup.string().required(`${t("phone-required")}`),
        about: yup.string(),
    });

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = (data: any) => {
        console.log(data)
        updateCompany({data, token: authorisation.token}).then((res) => {
            if ("data" in res) {
                Swal.fire(`${t(res.data.message)}`, "", "success").then(() => {
                    check({token: authorisation?.token}).then(async () => {
                        const refRes = await refresh(authorisation?.token);
                        if ("data" in refRes) {
                            if ('error' in refRes.data) {
                                dispatch(setInitialUser());
                                push("login");
                            } else {
                                dispatch(setUser(refRes.data));
                            }
                        } else {
                            console.log(refRes.error.message)
                        }
                    })

                });
            } else {
                Swal.fire(`${t(res.error.message)}`, "", "error");
            }
        });
    };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    return (
        <MainWraper>
            <Head>
                <script defer src="/static/vendor/libs/jquery/jquery.js"></script>

                <script
                    defer
                    src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
                ></script>
                <script
                    defer
                    src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
                ></script>
                <title>{t("my-company")}</title>
            </Head>
            <div className="container-xxl flex-grow-1 container-p-y">
                {loading ? (
                    <Loading/>
                ) : (
                    <div className="row">
                        {company ? <div className="col-md-12 my-3">
                            <div className="card">
                                {data?.premium ?
                                    <div className="card-body">
                                        <div className="col-12">
                                            <div
                                                className="page-title-box d-sm-flex align-items-center justify-content-between">

                                                <span className="text-warning">&nbsp;<i
                                                    className="fas fa-crown"></i></span>
                                                <div style={{textAlign: "right"}} className={'d-flex flex-column'}>

                                                    <h4 className="mb-sm-2">{t('current-position')}:
                                                        <span
                                                            className="text-primary">{message?.premium?.start_time.split(' ')[0]}</span>
                                                    </h4>
                                                    <h4 className="mb-sm-2">{t('vacancy-end-date')}:
                                                        <span
                                                            className="text-primary">{message?.premium?.end_time.split(' ')[0]}</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-3 premium-active">
                                            <button disabled={increaseLoading} onClick={() => {
                                                increasePremium({token: authorisation.token, id: message?.id})
                                                    .then(res => {
                                                        if ("data" in res) {
                                                            Swal.fire(`${t(res.data.message)}`, "", "success").then(() => {
                                                                check({token: authorisation?.token});
                                                            });
                                                        } else {
                                                            Swal.fire(`${t(res.error.message)}`, "", "error");
                                                        }
                                                    })
                                            }} type="button" className="btn btn-primary" data-toggle="modal"
                                                    data-target="#exampleModal"
                                                    data-whatever="@mdo">
                                                <i className="fas fa-clock"></i>&nbsp;{increaseLoading ? t('loading') : t('increase-time')}
                                            </button>
                                            <button disabled={cancelLoading} onClick={() => {
                                                cancelPremium({token: authorisation.token, id: message?.id})
                                                    .then(res => {
                                                        if ("data" in res) {
                                                            Swal.fire(`${t(res.data.message)}`, "", "success").then(() => {
                                                                check({token: authorisation?.token});
                                                            });
                                                        } else {
                                                            Swal.fire(`${t(res.error.message)}`, "", "error");
                                                        }
                                                    })
                                            }} className="btn btn-danger text-white w-45"
                                            ><i
                                                className="fas fa-clock"></i> &nbsp;{cancelLoading ? t('loading') : t('cancel')}
                                            </button>
                                        </div>
                                    </div> : <>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between mt-3">
                                                <button disabled={premiumLoading} onClick={() => getPremium({
                                                    token: authorisation.token,
                                                    id: message?.id
                                                }).then(res => {
                                                    if ("data" in res) {
                                                        Swal.fire(`${t('success')}`, "", "success").then(() => {
                                                            check({token: authorisation?.token});
                                                        });
                                                    } else {
                                                        Swal.fire(`${t(res.error.message)}`, "", "error");
                                                    }
                                                })
                                                } type="button" className="btn btn-primary" data-toggle="modal"
                                                        data-target="#exampleModal"
                                                        data-whatever="@mdo">
                                                    <i className="fas fa-crown"></i>&nbsp;{premiumLoading ? t('loading') : t('make-premium')}
                                                </button>
                                            </div>
                                        </div>
                                    </>

                                }
                            </div>
                        </div> : ''}
                        <div className="col-md-12">
                            <div className="card mb-4">
                                <hr className="my-0"/>
                                <div className="card-body">
                                    <CompanyImageForm
                                        img={process.env['NEXT_PUBLIC_MAIN_PATH'] + message?.photo}
                                    />
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        id="formAccountSettings"
                                        encType="multipart/form-data"
                                        action=""
                                        method="POST"
                                    >
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="firstName" className="form-label">
                                                    {t("name")}
                                                </label>
                                                <input
                                                    {...register("name")}
                                                    className={`form-control ${
                                                        errors.name ? "is-invalid" : ""
                                                    }`}
                                                    type="text"
                                                    name="name"
                                                    defaultValue={message?.name}
                                                    placeholder="Premium Ajans MMC"
                                                    autoFocus
                                                />
                                                {errors.name ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>{errors.name.message as string}</div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="adress" className="form-label">
                                                    {t("adress")}
                                                </label>
                                                <input
                                                    {...register("adress")}
                                                    type="text"
                                                    defaultValue={message?.adress}
                                                    className={`form-control ${
                                                        errors.adress ? "is-invalid" : ""
                                                    }`}
                                                    name="adress"
                                                    placeholder="Bakı, Azerbaijan"
                                                />
                                                {errors.adress ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>{errors.adress.message as string}</div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="email" className="form-label">
                                                    {t("email")}
                                                </label>
                                                <input
                                                    {...register("email")}
                                                    defaultValue={message?.email}
                                                    className={`form-control ${
                                                        errors.email ? "is-invalid" : ""
                                                    }`}
                                                    type="text"
                                                    name="email"
                                                    placeholder="example@site.com"
                                                />
                                                {errors.email ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>{errors.email.message as string}</div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label" htmlFor="phoneNumber">
                                                    {t("phone")}
                                                </label>
                                                <div className="input-group input-group-merge">
                                                    <input
                                                        {...register("phone")}
                                                        defaultValue={message?.phone}
                                                        type="number"
                                                        id="phone"
                                                        name="phone"
                                                        className={`form-control ${
                                                            errors.phone ? "is-invalid" : ""
                                                        }`}
                                                        placeholder="50 000 05 10"
                                                    />
                                                    {errors.phone ? (
                                                        <div className="fv-plugins-message-container invalid-feedback">
                                                            <div>{errors.phone.message as string}</div>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-xl-12">
                                                <h6 className="form-label"></h6>
                                                <div className="nav-align-top mb-4">
                                                    <div className="nav-item "></div>
                                                    {show ? (
                                                        <div className="tab-content">
                                                            <div
                                                                className="tab-pane fade active show "
                                                                id={`navs-az`}
                                                                role="tabpanel"
                                                            >
                                                                <div className="col-12">
                                                                    <div
                                                                        style={{padding: "10px"}}
                                                                        className="card mb-4"
                                                                    >
                                                                        <Editor
                                                                            placeholder={`${t("write-here")}`}
                                                                            editorState={editorState}
                                                                            wrapperClassName="demo-wrapper"
                                                                            editorClassName="demo-editor"
                                                                            onEditorStateChange={(e) => {
                                                                                setEditorState(e);
                                                                                setValue(
                                                                                    "about",
                                                                                    draftToHtml(
                                                                                        convertToRaw(
                                                                                            editorState.getCurrentContent()
                                                                                        )
                                                                                    )
                                                                                );
                                                                            }}
                                                                            toolbar={{
                                                                                options: [
                                                                                    "inline",
                                                                                    "list",
                                                                                    "textAlign",
                                                                                    "history",
                                                                                ],
                                                                            }}
                                                                        />
                                                                        <textarea
                                                                            hidden
                                                                            {...register("about")}
                                                                            name="about[az]"
                                                                            id="elmaz1"
                                                                            className="form-control"
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <button
                                                disabled={isLoading}
                                                type="submit"
                                                className="btn btn-primary me-2"
                                            >
                                                {" "}
                                                {t("save")}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainWraper>
    );
};

export default Company;

export async function getServerSideProps(context: any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),

        }
    }
}
