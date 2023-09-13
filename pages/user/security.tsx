import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useChangePasswordMutation, useRefreshMutation,} from "@/Store/Query/Auth";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setInitialUser, setUser} from "@/Store/Slices/User";
import MainWraper from "@/Components/Dashboard/MainWraper/MainWraper";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import Head from "next/head";


const Security = () => {
    const {t} = useTranslation("common");
    const {authorisation} = useSelector(getUser);
    const [currentPassword, setCurrentPassword] = useState<string[]>([
        "",
        "",
        "",
    ]);

    const {push,reload} = useRouter();
    const [isTextType, setIsTextType] = useState([false, false, false]);
    const [changePassword, {isLoading, isSuccess}] =
        useChangePasswordMutation();
    const [refresh, {}] = useRefreshMutation();
    const dispatch = useDispatch();
    const {
        authorisation: {token},
        user: {email, name},
    } = useSelector(getUser);

    const changeType = (index: number) => {
        const currentTypes = [...isTextType];
        currentTypes[index] = !currentTypes[index];
        setIsTextType(currentTypes);
    };

    const setPassword = (index, value) => {
        const array = [...currentPassword];
        array[index] = value;
        setCurrentPassword(array);
    };


    let schema = yup.object().shape({
        current_password: currentPassword.some((val) => val.length > 0)
            ? yup
                .string()
                .min(6, `${t("password-min-6")}`)
                .required(`${t("password-required")}`)
            : yup.string(),
        name: yup.string().required(`${t("name-required")}`),
        new_password: currentPassword.some((val) => val.length > 0)
            ? yup
                .string()
                .min(6, `${t("password-min-6")}`)
                .required(`${t("password-required")}`)
            : yup.string(),
        confirm_password: currentPassword.some((val) => val.length > 0)
            ? yup
                .string()
                .min(6, `${t("password-min-6")}`)
                .required(`${t("password-required")}`)
                .oneOf([yup.ref("new_password")], `${t("password-match")}`)
            : yup.string(),
    });



    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
        setValue,
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data: any) => {
        setValue("email", email);
        const res = await changePassword({user: data, token});
        if ("data" in res) {
            Swal.fire(`${t(res.data.message)}`, "", "success")
                .then(async () => {
                    const refRes = await refresh(token);
                    if ("data" in refRes) {
                        if ('error' in refRes.data) {
                            dispatch(setInitialUser());
                            push("login");
                        } else {
                            dispatch(setUser(refRes.data));
                            setCurrentPassword(['','',''])
                            reload()
                            // reset();
                        }
                    } else {
                    }
                })

        } else {
            const errors = res.error?.data?.message;
            if ("status" in res.error?.data) {
                Swal.fire(`${t(res.error?.data.status)}`, "", "error").then(() => {
                    dispatch(setInitialUser());
                    push("login");
                })
            } else {
                if(typeof  errors === 'string') {
                    Swal.fire(`${t(errors)}`, "", "error");
                } else {
                    Swal.fire(`${t(Object.entries(errors)[0])}`, "", "error");
                }
            }
        }
    };


    return (
        <MainWraper>
            <Head>
                <title>{t("security")}</title>
            </Head>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div
                        style={{justifyContent: "center"}}
                        className="row mx-0 gy-3 px-lg-5"
                    >
                        <div className="card mb-4   col-sm-6">
                            <h5 className="card-header">{t("security")}</h5>
                            <div className="card-body">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    id="formAccountSettings"
                                    action="{{ route('user.updateProfile',auth()->guard('admin')->user()->id) }}"
                                    method="POST"
                                    encType="multipart/form-data"
                                >
                                    <div className="inputRow">
                                        <div className="mb-3  form-password-toggle">
                                            <label className="form-label" htmlFor="currentPassword">
                                                {t("email")}
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    {...register("email")}
                                                    className={`form-control ${
                                                        errors.email ? "is-invalid" : ""
                                                    }`}
                                                    type="text"
                                                    disabled
                                                    value={email}
                                                />
                                                {errors.email ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>{errors.email.message as string}</div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputRow">
                                        <div className="mb-3  form-password-toggle">
                                            <label className="form-label" htmlFor="currentPassword">
                                                {t("name")}
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    {...register("name")}
                                                    className={`form-control ${
                                                        errors.name ? "is-invalid" : ""
                                                    }`}
                                                    type="text"
                                                    defaultValue={name}
                                                />
                                                {errors.name ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>{errors.name.message as string}</div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputRow">
                                        <div className="mb-3 ">
                                            <label className="form-label" htmlFor="currentPassword">
                                                {t("current-password")}
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    {...(currentPassword.some((val) => val.length > 0)
                                                        ? register("current_password")
                                                        : "")}
                                                    onChange={(e) => setPassword(0, e.target.value)}
                                                    className={`form-control ${
                                                        errors.current_password ? "is-invalid" : ""
                                                    }`}
                                                    type={isTextType[0] ? "text" : "password"}
                                                    name="current_password"
                                                    id="currentPassword"
                                                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                />
                                                <span
                                                    onClick={() => changeType(0)}
                                                    className="input-group-text cursor-pointer"
                                                >
                          <i
                              className={`bx ${
                                  isTextType[0] ? "bx-show" : "bx-hide"
                              }`}
                          ></i>
                        </span>
                                                {errors.current_password ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>
                                                            {errors.current_password.message as string}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputRow">
                                        <div className="mb-3  form-password-toggle">
                                            <label className="form-label" htmlFor="newPassword">
                                                {t("new-password")}
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    {...(currentPassword.some((val) => val.length > 0)
                                                        ? register("new_password")
                                                        : "")}
                                                    className={`form-control ${
                                                        errors.new_password ? "is-invalid" : ""
                                                    }`}
                                                    onChange={(e) => setPassword(1, e.target.value)}
                                                    type={isTextType[1] ? "text" : "password"}
                                                    id="new_password"
                                                    name="new_password"
                                                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                />
                                                <span
                                                    onClick={() => changeType(1)}
                                                    className="input-group-text cursor-pointer"
                                                >
                          <i
                              className={`bx ${
                                  isTextType[1] ? "bx-show" : "bx-hide"
                              }`}
                          ></i>
                        </span>
                                                {errors.new_password ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>{errors.new_password.message as string}</div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputRow">
                                        <div className="mb-3  form-password-toggle">
                                            <label className="form-label" htmlFor="confirmPassword">
                                                {t("cnew-password")}
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    {...(currentPassword.some((val) => val.length > 0)
                                                        ? register("confirm_password")
                                                        : "")}
                                                    onChange={(e) => setPassword(2, e.target.value)}
                                                    className={`form-control ${
                                                        errors.confirm_password ? "is-invalid" : ""
                                                    }`}
                                                    type={isTextType[2] ? "text" : "password"}
                                                    name="confirm_password"
                                                    id="confirm_password"
                                                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                />
                                                <span
                                                    onClick={() => changeType(2)}
                                                    className="input-group-text cursor-pointer"
                                                >
                          <i
                              className={`bx ${
                                  isTextType[2] ? "bx-show" : "bx-hide"
                              }`}
                          ></i>
                        </span>
                                                {errors.confirm_password ? (
                                                    <div className="fv-plugins-message-container invalid-feedback">
                                                        <div>
                                                            {errors.confirm_password.message as string}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isSuccess ? <div className="success">{}</div> : ""}
                                    <div className="col-12 mt-1">
                                        <button
                                            type="submit"
                                            className={`btn btn-primary me-2 ${
                                                isLoading ? "disabled" : ""
                                            }`}
                                        >
                                            {t("save")}
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainWraper>
    );
};

export default Security;

export async function getServerSideProps(context:any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),

        }
    }
}
