import {
    useCategoriesQuery,
    useCityQuery,
    useEducationQuery,
    useExperienceQuery,
    useGetItemMutation,
    useModesQuery,
    usePostVacanciesMutation,
    useSalariesQuery,
    useUpdateItemMutation,
} from "@/Store/Query/Auth";
import {getUser} from "@/Store/Slices/User";
import {yupResolver} from "@hookform/resolvers/yup";
import Tagify from "@yaireo/tagify";
import Head from "next/head";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import * as yup from "yup";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import {EditorProps} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useRouter} from "next/router";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const NewItemForm = () => {
    const {pathname, query} = useRouter()
    const tagifyRef = useRef(null);
    const {t, i18n} = useTranslation("common");

    const {
        user: {id, name},
        authorisation: {token},
    } = useSelector(getUser);


    const Editor = dynamic<EditorProps>(
        () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
        {ssr: false}
    );

    const handleChangeContent = (newContent: string, editorState: any, setEditorState: any) => {

        const contentBlock = convertFromHTML(newContent);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

        if(contentBlock.contentBlocks.length) {
            const newEditorState = EditorState.push(
                editorState,
                contentState,
                'insert-characters'
            );
            setEditorState(newEditorState);
        }
    };


    useEffect(() => {
        if (pathname === '/user/my-items/[id]/edit') {
            if (query.id) {
                getItem({token, id: query.id})
                    .then((res) => {
                        setValue('position', res.data.vacancy.description.position)
                        setValue('category', res.data.vacancy.description.category_id)
                        setValue('mode', res.data.vacancy.description.mode_id)
                        setValue('city', res.data.vacancy.description.city_id)
                        setValue('experience', res.data.vacancy.description.experience_id)
                        setValue('education', res.data.vacancy.description.education_id)
                        setValue('minimum_age', res.data.vacancy.description.min_age)
                        setValue('maximum_age', res.data.vacancy.description.max_age)
                        setValue('minimum_salary', res.data.vacancy.description.min_salary)
                        setValue('maximum_salary', res.data.vacancy.description.max_salary)
                        setValue('relevant_people', res.data.vacancy.description.relevant_people)
                        setValue('email', res.data.vacancy.description.email)
                        setValue('phone', res.data.vacancy.description.phone)
                        setValue('tags', res.data.vacancy.description.tags)
                        setValue('company', res.data.vacancy.description.company)
                        handleChangeContent(res.data?.vacancy.description.job_description, editorState_1, setEditorState_1)
                        setValue(
                            "about_job",
                            draftToHtml(
                                convertToRaw(editorState_1.getCurrentContent())
                            )
                        );

                        handleChangeContent(res.data.vacancy.description.candidate_requirement, editorState_2, setEditorState_2)
                        setValue(
                            "candidate_requirements",
                            draftToHtml(
                                convertToRaw(editorState_1.getCurrentContent())
                            )
                        );
                    })
                    .catch(() => {

                    })
            }
        }
    }, [])


    const [getItem, {data: postItemData, isLoading: itemDataLoading}] = useGetItemMutation()
    const [updateItem, {data: updateItemData, isLoading: updateItemLoading}] = useUpdateItemMutation()

    const {data: categories, isLoading: loading1} = useCategoriesQuery("");
    const {data: salaries, isLoading: loading2} = useSalariesQuery("");
    const {data: education, isLoading: loading3} = useEducationQuery("");
    const {data: experience, isLoading: loading4} = useExperienceQuery("");
    const {data: modes, isLoading: loading5} = useModesQuery("");
    const [postItem, {isLoading}] = usePostVacanciesMutation();

    const {data: city} = useCityQuery("");
    const {push} = useRouter();
    let schema = yup.object().shape({
        position: yup.string().required(`${t("position-required")}`),
        category: yup.string().required(`${t("category-required")}`),
        mode: yup.string().required(`${t("mode-required")}`),
        city: yup.string().required(`${t("city-required")}`),
        experience: yup.string().required(`${t("experience-required")}`),
        education: yup.string().required(`${t("education-required")}`),
        minimum_age: yup.number().required(`${t("minimum_age-required")}`),
        maximum_age: yup
            .number()
            .required(`${t("maximum_age-required")}`)
            .test("maximum_age", `${t("maximum_age-test")}`, function (f) {
                const ref = yup.ref("minimum_age");
                return f > +this.resolve(ref);
            }),
        minimum_salary: yup.number().required(`${t("minimum_salary-required")}`),
        maximum_salary: yup
            .number()
            .required(`${t("maximum_salary-required")}`)
            .test("maximum_salary", `${t("maximum_salary-test")}`, function (f) {
                const ref = yup.ref("minimum_salary");

                return f > +this.resolve(ref);
            }),
        company: yup.string().required(`${t("company-required")}`),
        relevant_people: yup.string().required(`${t("relevant_people-required")}`),
        email: yup.string().required(`${t("email-required")}`),
        phone: yup.string().required(`${t("phone-required")}`),
        tags: yup.string(),
        candidate_requirements: yup
            .string()
            .required(`${t("candidate_requirements-required")}`),
        about_job: yup.string().required(`${t("about_job-required")}`),
    });

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
    } = useForm({resolver: yupResolver(schema)});

    useEffect(() => {
        const tagify = new Tagify(tagifyRef.current, {});

        if (postItemData) {
            if (postItemData?.vacancy?.description?.tags?.indexOf('[') >= 0) {
                tagify.addTags(JSON.parse(postItemData?.vacancy?.description?.tags).map(item => item.value));
                setValue('tags', postItemData?.vacancy?.description?.tags)
            } else {
                tagify.addTags(postItemData?.vacancy.description.tags).map(item => item.value);
            }

        }

        return () => {
            tagify.destroy();
        };
    }, [postItemData])

    const onSubmit = (data: any) => {

        data.about_job =  draftToHtml(
            convertToRaw(editorState_1.getCurrentContent())
        )
        data.candidate_requirements =  draftToHtml(
            convertToRaw(editorState_1.getCurrentContent())
        )
        data.user_id = id;

        if (pathname === '/user/my-items/[id]/edit') {
            updateItem({data, token, id: query.id})
                .then((res) => {
                    if ("data" in res) {
                        console.log(res)
                        if (res.data.status === "success") {
                            {
                                Swal.fire(`${t("vacancy-updated")}`, "", "success").then(() =>
                                    push("/user/my-items")
                                );
                            }
                        }
                    } else {
                        Swal.fire(`${t("something-went-wrong")}`, "", "error")
                    }
                });
        } else {
            postItem({data, token}).then((res) => {
                if ("data" in res) {
                    if (res.data.status === "success") {
                        {
                            Swal.fire(`${t("vacancy-success")}`, "", "success").then(() =>
                                push("/user/my-items")
                            );
                        }
                    }
                } else {
                    Swal.fire(`${t("something-went-wrong")}`, "", "error")
                }
            });
        }

    };

    const generateAge = () => {
        let array: Array<number> = [];
        for (let index = 18; index < 65; index++) {
            array.push(index);
        }
        return (
            <>
                {array.map((el, i) => (
                    <option key={i} value={el}>
                        {el}
                    </option>
                ))}
            </>
        );
    };

    const [editorState_1, setEditorState_1] = useState(() =>
        EditorState.createEmpty()
    );

    const [editorState_2, setEditorState_2] = useState(() =>
        EditorState.createEmpty()
    );



    return (
        <>
            <Head>
                <link
                    href="https://cdn.jsdelivr.net/npm/@yaireo/tagify/dist/tagify.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>


            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row mx-0 gy-3 px-lg-5">
                    {itemDataLoading || loading1 || loading2 || loading3 || loading4 || loading5 ? <Loading/> :

                        <div className="card mb-4">
                            <h5 className="card-header">{t("post-a-job")}</h5>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="needs-validation card-body"
                                noValidate
                                method="POST"
                                encType="multipart/form-data"
                            >
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-username">
                                            {t("position")}
                                        </label>
                                        <input
                                            {...register("position")}
                                            type="text"
                                            className={`form-control ${
                                                errors.position ? "is-invalid" : ""
                                            }`}
                                            name="position"
                                            required
                                            placeholder=""
                                        />
                                        {errors.position ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.position.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">{t("category")}</label>
                                        <select
                                            {...register("category")}
                                            className={`form-select ${
                                                errors.category ? "is-invalid" : ""
                                            }`}
                                            name="category"
                                            data-allow-clear="true"
                                            required
                                        >
                                            {categories?.map((el) => {
                                                return (
                                                    <>
                                                        <optgroup key={el.id} label={el.translations.find(item => item.locale === i18n.language)?.name}>
                                                            {el.alt?.map((el) => {
                                                                return (
                                                                    <option value={el.id} key={el.id}>
                                                                        {
                                                                            el.translations.find(
                                                                                (el) => el.locale === i18n.language
                                                                            )?.name
                                                                        }
                                                                    </option>
                                                                );
                                                            })}
                                                        </optgroup>
                                                    </>
                                                );
                                            })}
                                        </select>
                                        {errors.category ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.category.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">{t("work-mode")}</label>
                                        <select
                                            {...register("mode")}
                                            className={`form-select ${errors.mode ? "is-invalid" : ""}`}
                                            name="mode"
                                            data-allow-clear="true"
                                            required
                                        >
                                            {modes?.map((el) => {
                                                return (
                                                    <>
                                                        <option value={el.id} key={el.id}>
                                                            {
                                                                el.translations.find(
                                                                    (el) => el.locale === i18n.language
                                                                )?.name
                                                            }
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </select>
                                        {errors.mode ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.mode.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">{t("city")}</label>
                                        <select
                                            {...register("city")}
                                            name="city"
                                            className={`form-select ${errors.city ? "is-invalid" : ""}`}
                                            data-allow-clear="true"

                                            required
                                        >
                                            {city?.map((el) => {
                                                return (
                                                    <>
                                                        <option value={el.id} key={el.id}>
                                                            {
                                                                el.translations.find(
                                                                    (el) => el.locale === i18n.language
                                                                )?.name
                                                            }
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </select>
                                        {errors.city ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.city.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">{t("experience")}</label>
                                        <select
                                            {...register("experience")}
                                            className={`form-select ${
                                                errors.experience ? "is-invalid" : ""
                                            }`}
                                            name="experience"
                                            required
                                            data-allow-clear="true"
                                        >
                                            {experience?.map((el) => {
                                                return (
                                                    <>
                                                        <option value={el.id} key={el.id}>
                                                            {
                                                                el.translations.find(
                                                                    (el) => el.locale === i18n.language
                                                                )?.name
                                                            }
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </select>
                                        {errors.experience ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.experience.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">{t("education")}</label>
                                        <select
                                            {...register("education")}
                                            name="education"
                                            className={`form-select ${
                                                errors.education ? "is-invalid" : ""
                                            }`}
                                            data-allow-clear="true"
                                            required
                                        >
                                            {education?.map((el) => {
                                                return (
                                                    <>
                                                        <option value={el.id} key={el.id}>
                                                            {
                                                                el.translations.find(
                                                                    (el) => el.locale === i18n.language
                                                                )?.name
                                                            }
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </select>
                                        {errors.education ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.education.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">{t("min-age")}</label>
                                        <select
                                            {...register("minimum_age")}
                                            className={`form-select ${
                                                errors.minimum_age ? "is-invalid" : ""
                                            }`}
                                            data-allow-clear="true"
                                            name="minimum_age"
                                            required
                                        >
                                            {generateAge()}
                                        </select>
                                        {errors.minimum_age ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.minimum_age.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">{t("max-age")}</label>
                                        <select
                                            {...register("maximum_age")}
                                            required
                                            name="maximum_age"
                                            className={`form-select ${
                                                errors.maximum_age ? "is-invalid" : ""
                                            }`}
                                            data-allow-clear="true"
                                        >
                                            {generateAge()}
                                        </select>
                                        {errors.maximum_age ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.maximum_age.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">{t("min-salary")}</label>
                                        <select
                                            {...register("minimum_salary")}
                                            required
                                            name="minimum_salary"
                                            className={`form-select ${
                                                errors.minimum_salary ? "is-invalid" : ""
                                            }`}
                                            data-allow-clear="true"
                                        >
                                            {salaries?.map((el) => {
                                                return (
                                                    <>
                                                        <option value={el.salary} key={el.salary}>
                                                            {el.salary}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </select>
                                        {errors.minimum_salary ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.minimum_salary.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">{t("max-salary")}</label>
                                        <select
                                            {...register("maximum_salary")}
                                            required
                                            name="maximum_salary"
                                            className={`form-select ${
                                                errors.maximum_salary ? "is-invalid" : ""
                                            }`}
                                            data-allow-clear="true"
                                        >
                                            {salaries?.map((el) => {
                                                return (
                                                    <>
                                                        <option value={el.salary} key={el.salary}>
                                                            {el.salary}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </select>
                                        {errors.maximum_salary ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.maximum_salary.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">{t("about-job")}</label>
                                        <Editor
                                            placeholder={`${t("write-here")}`}
                                            editorState={editorState_1}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={(e) => {
                                                setEditorState_1(e);
                                                setValue(
                                                    "about_job",
                                                    draftToHtml(
                                                        convertToRaw(editorState_1.getCurrentContent())
                                                    )
                                                );
                                            }}
                                            toolbar={{
                                                options: ["inline", "list", "textAlign", "history"],
                                            }}
                                        />
                                        <textarea
                                            {...register("about_job")}
                                            hidden
                                            disabled
                                            value={draftToHtml(
                                                convertToRaw(editorState_1.getCurrentContent())
                                            )}
                                            id="elm1"
                                            rows={7}
                                            name="about_job"
                                            required
                                            className={`form-control ${
                                                errors.about_job ? "is-invalid" : ""
                                            }`}
                                        ></textarea>
                                        {errors.about_job ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.about_job.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            {t("candidate-requirements")}
                                        </label>
                                        <Editor
                                            placeholder={`${t("write-here")}`}
                                            editorState={editorState_2}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={(e) => {
                                                setEditorState_2(e);
                                                setValue(
                                                    "candidate_requirements",
                                                    draftToHtml(
                                                        convertToRaw(editorState_2.getCurrentContent())
                                                    )
                                                );
                                            }}
                                            toolbar={{
                                                options: ["inline", "list", "textAlign", "history"],
                                            }}
                                        />
                                        <textarea
                                            {...register("candidate_requirements")}

                                            hidden
                                            // hidden

                                            disabled
                                            value={draftToHtml(
                                                convertToRaw(editorState_2.getCurrentContent())
                                            )}
                                            id="elm2"
                                            rows={7}
                                            name="candidate_requirements"
                                            required
                                            className={`form-control ${
                                                errors.candidate_requirements ? "is-invalid" : ""
                                            }`}
                                        ></textarea>
                                        {errors.candidate_requirements ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>
                                                    {errors.candidate_requirements.message as string}
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-phone">
                                            {t("company")}
                                        </label>
                                        <input
                                            {...register("company")}

                                            type="text"
                                            name="company"
                                            className={`form-control ${
                                                errors.company ? "is-invalid" : ""
                                            }`}
                                            required
                                            placeholder=""
                                        />
                                        {errors.company ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.company.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-phone">
                                            {t("relevant-people")}
                                        </label>
                                        <input
                                            {...register("relevant_people")}
                                            type="text"
                                            name="relevant_people"
                                            className={`form-control ${
                                                errors.relevant_people ? "is-invalid" : ""
                                            }`}
                                            required
                                            placeholder=""
                                        />
                                        {errors.relevant_people ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.relevant_people.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-email">
                                            {t("email")}
                                        </label>
                                        <input
                                            {...register("email")}
                                            type="text"
                                            id="multicol-email"

                                            className={`form-control ${
                                                errors.email ? "is-invalid" : ""
                                            }`}
                                            name="email"
                                            required
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

                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="multicol-phone">
                                            {t("phone")}
                                        </label>
                                        <input
                                            {...register("phone")}

                                            type="text"
                                            className={`form-control phone-mask ${
                                                errors.email ? "is-invalid" : ""
                                            }`}
                                            name="phone"
                                            required
                                            placeholder="+994 50 000 0510"
                                        />
                                        {errors.phone ? (
                                            <div className="fv-plugins-message-container invalid-feedback">
                                                <div>{errors.phone.message as string}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col-12 mb-4">
                                        <label htmlFor="TagifyBasic" className="form-label">
                                            {t("tags")}
                                        </label>
                                        <input
                                            {...register("tags")}
                                            ref={tagifyRef}
                                            id="TagifyBasic"
                                            onChange={() => {
                                                setValue('tags', tagifyRef.current!.value)
                                            }}
                                            className="form-control"
                                            name="tags"
                                        />
                                    </div>

                                    <div className="pt-2">

                                        <button
                                            disabled={isLoading || updateItemLoading}
                                            type="submit"
                                            className="btn btn-primary me-sm-3 me-1"
                                        >
                                            {pathname === '/user/my-items/[id]/edit' ? t('update') :  t("save") }

                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default NewItemForm;
