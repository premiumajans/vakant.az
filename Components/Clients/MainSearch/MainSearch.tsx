import {select} from "@/interfaces/generalResponses";
import {useTranslation} from "next-i18next";
import {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";

const MainSearch = ({
                        modes, city, categories,
                        educations
                    }: {
    city: select[],
    modes: select[],
    categories: select[],
    educations: select[]
}) => {

    const {t, i18n} = useTranslation('common')
    // const dispatch = useDispatch()
    const {push} = useRouter()
    const [search, setSearch] = useState(false)

    let schema = yup.object().shape({
        category: yup.string(),
        city: yup.string(),
        mode: yup.string(),
        education: yup.string(),
        position: yup.string(),

    });

    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
        setValue,
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data: any) => {
        const {category, city, mode, education, position} = data
        // dispatch(setSearch(data))
        push(`/jobs?category=${category}&city=${city}&mode=${mode}&education=${education}&position=${position}`)
    };


    return <>
        <div className={`search-container ${search ? 'search-container_opened' : ''}`}><a className=" search-toggle"
                                                                                          href="#">
            <div className="container"><span onClick={() => setSearch(!search)} className="search-toggle-inner"><span
                className="search-toggle-text">{t('search')}</span></span></div>
        </a>
            <div style={{zIndex:1}} className="search-form">
                <div className="container d-flex justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="simple_form new_search text-center"
                          id="new_search" noValidate={false} action="/vacancies"
                          accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓"
                                                                     autoComplete="off"/><input autoComplete="off"
                                                                                                type="hidden"
                                                                                                name="search[company_id]"
                                                                                                id="search_company_id"/>
                        <div className="search-form-row">
                            <div className="input select optional search_category_id"><label
                                className="select optional control-label"
                                htmlFor="search_category_id">{t("category")}</label><select
                                {...register('category')}
                                className="select optional form-control" name="category"
                                id="search_category_id">
                                <option value={''}></option>
                                {categories?.map((el) => {
                                    return (
                                        <>
                                            <optgroup key={el.id}
                                                      label={el.translations.find(item => item.locale === i18n.language)?.name}>
                                                {el.alt?.map((el) => {
                                                    return (
                                                        <option value={el.id}
                                                                key={el.id}>
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
                            </div>

                            <div className="input select optional search_region_id"><label
                                className="select optional control-label"
                                htmlFor="search_region_id">{t("city")}</label><select   {...register('city')}  className="select optional form-control"
                                                                                name="city"
                                                                                id="search_region_id">
                                <option value={''}></option>
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

                            </select></div>

                            <div className="input select optional search_salary"><label
                                className="select optional control-label" htmlFor="search_salary">{t('position')}</label><input
                                {...register('position')}
                                className="select optional form-control" name={'position'}
                                id="search_salary">
                            </input></div>

                            <div className="input select optional search_education_id"><label
                                className="select optional control-label"
                                htmlFor="search_education_id">{t('education')}</label><select
                                {...register('education')}
                                className="select optional form-control" name="education"
                                id="search_education_id">
                                {educations?.map((el) => {
                                    return (
                                        <>
                                            <option value={el.id === 1 ? '' : el.id}
                                                    key={el.id}>
                                                {
                                                    el.translations.find(
                                                        (el) => el.locale === i18n.language
                                                    )?.name
                                                }
                                            </option>
                                        </>
                                    );
                                })}
                            </select></div>

                            <div className="input select optional search_experience_id"><label
                                className="select optional control-label" htmlFor="search_experience_id">
                                {t('work-mode')}
                            </label>
                                <select   {...register('mode')}  className="select optional form-control"
                                                         name="mode" id="search_experience_id">
                                    <option value={''}></option>
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
                            </div>

                        </div>


                        <div className="btn-container"><input onClick={() => setSearch(!search)} type="submit"
                                                              name="commit" value={t('search').toString()}
                                                              className="btn btn btn_load-more"
                                                              data-disable-with="Axtar"/></div>
                    </form>
                </div>
            </div>
        </div>

    </>
};

export default MainSearch;