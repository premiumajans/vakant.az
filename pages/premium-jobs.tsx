import {Item, select} from "@/interfaces/generalResponses";
import {useTranslation} from "next-i18next";
import Pagination from "@/Components/Clients/Pagination/Pagination";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import parse from "html-react-parser";


const Jobs = ({
                  vacancies, modes, city, categories,
                  educations
              }: {
    vacancies: Item[],
    city: select[],
    modes: select[],
    categories: select[],
    educations: select[]
}) => {


    const {i18n, t} = useTranslation('common')
    const [pagination, setPagination] = useState(1)

    const [category, setCategory] = useState('')
    const [education, setEducation] = useState('')
    const [mode, setMode] = useState('')
    const [cityState, setCityState] = useState('')


    const filteredValue = useMemo(() => {
        return []

    }, [category, cityState, mode, vacancies, education])

    const {query} = useRouter()

    useEffect(() => {
        setEducation(query?.education)
        setMode(query?.mode)
        setCategory(query?.category)
        setCityState(query?.city)
    }, [query])


    return <>


        <section data-aos="fade-up" className="ftco-section ftco-no-pb bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div
                        className="col-md-7 text-center heading-section">
                        <h2 className="mb-4">{t('vacancies')}</h2>
                    </div>
                </div>
            </div>
        </section>

        <section className="ftco-section ftco-candidates ftco-candidates-2 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 pr-lg-4">
                        <div className="row">
                            {vacancies.length ? vacancies.filter(item => item.vacancy_type === 2).slice((pagination - 1) * 10, (pagination - 1) * 10 + 10).map(item => {
                                if (item.vacancy_type === 2) {
                                    return <Link data-aos="fade-up" className="col-md-6" key={item.id}
                                                 href={'/job/' + item.id.toString()}>
                                        <div>
                                            <div className="job-post-item jobs p-4 d-block">
                                                <div className="one-third mb-4 mb-md-0">
                                                    <div className="job-post-item-header align-items-center">
                                                    <span
                                                        className="subadge">{modes.find(mode => mode.id === item.description.mode_id)?.translations.find(item => item.locale === i18n?.language)?.name}
                                                        <span className="text-warning"> &nbsp; <i
                                                            className="fas fa-crown"></i>
                                                        </span>
                                                    </span>
                                                        <h2 className="mb-4 text-black d-flex align-items-center">
                                                            <a>{item.description.position}</a>
                                                        </h2>

                                                    </div>
                                                    <div className="job-post-item-header align-items-center description">
                                                        <div>{parse(item.description.candidate_requirement)}</div>
                                                    </div>
                                                    <div className="job-post-item-body d-block d-md-flex flex-column">
                                                        <div className="mr-3"><span className="icon-layers"></span>
                                                            <a>{item.description.company}</a></div>
                                                        <div><span className="icon-my_location"></span>
                                                            <span>{city.find(cityItem => cityItem.translations[0].id! === item.description.city_id)?.translations.find(item => item.locale === i18n.language)?.name}</span>


                                                        </div>
                                                        <div><span className="icon-date_range"></span>
                                                            <span>{item.shared_time.split(' ')[0]}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                }
                            }) : t('empty-data')
                            }
                        </div>
                        <div className="row mt-5">
                            <div className="col text-center">
                                <Pagination setPagination={setPagination}
                                            data={vacancies}
                                            pagination={pagination}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </>
};

export default Jobs;


export async function getServerSideProps(context: any) {
    const vacancies = await fetch(process.env['NEXT_PUBLIC_MAIN_PATH_WITH_API'] + 'vacancies')
    const city = await fetch(process.env['NEXT_PUBLIC_MAIN_PATH_WITH_API'] + 'city')
    const modes = await fetch(process.env['NEXT_PUBLIC_MAIN_PATH_WITH_API'] + 'modes')
    const categories = await fetch(process.env['NEXT_PUBLIC_MAIN_PATH_WITH_API'] + 'categories')
    const educations = await fetch(process.env['NEXT_PUBLIC_MAIN_PATH_WITH_API'] + 'education')


    return {
        props: {
            vacancies: await vacancies.json(),
            city: await city.json(),
            modes: await modes.json(),
            categories: await categories.json(),
            educations: await educations.json(),

            ...(await serverSideTranslations(context.locale, ["common"])),
        }
    }
}