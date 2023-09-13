import { Item, select } from "@/interfaces/generalResponses";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import JobItem from "@/Components/Clients/JobItem";
import { headers } from "next/headers";
import JobInnerDetail from "@/Components/Clients/AnnouncementDetail";
import AnnouncementDetail from "@/Components/Clients/AnnouncementDetail";
import JobInnerComponentWrapper from "@/Components/Clients/JobInnerComponentWrapper";
import JobInfo from "@/Components/Clients/JobInfo";
import { nanoid } from "@reduxjs/toolkit";

const Index = ({
  vacancy,
  city,
  modes,
  categories,
  education,
  experience,
}: {
  vacancy: Item;
  city: select[];
  modes: select[];
  categories: select[];
  education: select[];
  experience: select[];
}) => {
  const { i18n, t } = useTranslation("common");
  const { query } = useRouter();
  const url = location.pathname;

  console.log(vacancy);
  console.log();

  return (
    <>
      <Head>
        <title>{vacancy.description?.position}</title>
        <meta property="og:title" content={vacancy.description?.position} />
        <meta
          property="og:description"
          content={vacancy.description?.company}
        />
        <meta
          property="og:url"
          content={
            process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] + "job/" + query.id
          }
        />
      </Head>

      <main className="bg-light">
        <section
          id="job-detail-page"
          className=" py-5 container d-flex align-items-start"
        >
          <div className="job-detail-top  d-flex align-items-start">
            <JobItem
              href={""}
              className="width-75"
              subadge={undefined}
              position={vacancy.description.position}
               salary={`${
                          (vacancy.description.min_salary ===
                            vacancy.description.max_salary || vacancy.description.max_salary === 1 )
                            ? vacancy.description.min_salary
                            : vacancy.description.min_salary +
                              " - " +
                              vacancy.description.max_salary
                        } AZN`}
              company={vacancy.description.company}
              shared_time={vacancy.shared_time}
              premium={false}
            />
            {/* <AnnouncementDetail
              id={vacancy.id}
              shared_time={vacancy.shared_time}
              last_time={vacancy.end_time}
              view_count={vacancy.view_count}
            /> */}
            <JobInnerComponentWrapper title={t("about-job")}>
              <JobInfo
                mode={
                  modes
                    .find((mode) => mode.id === vacancy.description.mode_id)
                    ?.translations.find(
                      (item) => item.locale === i18n?.language
                    )?.name
                }
                 salary={`${
                          (vacancy.description.min_salary ===
                            vacancy.description.max_salary || vacancy.description.max_salary === 1 )
                            ? vacancy.description.min_salary
                            : vacancy.description.min_salary +
                              " - " +
                              vacancy.description.max_salary
                        } AZN`}
                city={
                  city
                    .find(
                      (cityItem) =>
                        cityItem.translations[0].id! ===
                        vacancy.description.city_id
                    )
                    ?.translations.find((item) => item.locale === i18n.language)
                    ?.name
                }
                experience={
                  experience
                    .find(
                      (item) => item.id === vacancy.description.experience_id
                    )
                    ?.translations.find((item) => item.locale === i18n.language)
                    ?.name
                }
                education={
                  education
                    .find(
                      (item) => item.id === vacancy.description.education_id
                    )
                    ?.translations.find((item) => item.locale === i18n.language)
                    ?.name
                }
              />
            </JobInnerComponentWrapper>
            <JobInnerComponentWrapper title={t("about-job")}>
              <ul>
                {`${parse(vacancy.description.job_description)}`
                  .split("-")
                  .slice(1)
                  .map((item: any) => (
                    <li key={nanoid()}>- {item}</li>
                  ))}
              </ul>
            </JobInnerComponentWrapper>
            <JobInnerComponentWrapper title={t("candidate-requirements")}>
              <ul>
                {`${parse(vacancy.description.candidate_requirement)}`
                  .split("-")
                  .slice(1)
                  .map((item: any) => (
                    <li key={nanoid()}>- {item}</li>
                  ))}
              </ul>
            </JobInnerComponentWrapper>
          </div>
          <div className="job-detail-right  top-0">
            <AnnouncementDetail
              id={vacancy.id}
              shared_time={vacancy.shared_time}
              last_time={vacancy.end_time}
              view_count={vacancy.view_count}
            />
          </div>
        </section>
      </main>

      {/* <section className="ftco-section ftco-candidates ftco-candidates-2 bg-light">
        <div className="container p-md-4">
          <div className="post-header-secondary post-col text-right">
            {t("vacancy-count")}: {vacancy.view_count}
            <br /> {t("add")}
            <span className={"ml-1"}>#{vacancy.id}</span>
            <div className="post-header-share">
              <div
                className="fb-like fb_iframe_widget"
                data-action="recommend"
                data-layout="button_count"
                data-show-faces="false"
                fb-xfbml-state="rendered"
                fb-iframe-plugin-query="action=recommend&amp;app_id=168601233177656&amp;container_width=113&amp;href=https%3A%2F%2Fwww.boss.az%2Fvacancies%2F215133-p&amp;layout=button_count&amp;locale=az_AZ&amp;sdk=joey&amp;show_faces=false"
              ></div>
            </div>
          </div>
          <div className="">
            <div className="post-header d-flex justify-content-between">
              <div className="post-header-primary">
                <h1 className="post-title post-col">
                  {vacancy.description.position}
                  {vacancy.vacancy_type !== 1 ? (
                    <i className="ml-2 text-warning fas fa-crown"></i>
                  ) : (
                    ""
                  )}
                </h1>
                <div className={"d-flex align-items-center post-col"}>
                  <div
                    className="alert alert-primary mr-2"
                    role="alert"
                    style={{ width: "max-content", marginBottom: "0" }}
                  >
                    <span
                      className="post-salary salary"
                      style={{ fontWeight: "bold" }}
                    >
                      {" "}
                      {vacancy.description.min_salary} -{" "}
                      {vacancy.description.max_salary} AZN{" "}
                    </span>
                  </div>

                  <span>
                    {categories
                      .map((item) => item.alt)
                      .find((item) =>
                        item?.find((item) => {
                          return item.id === vacancy.description.category_id;
                        })
                      )
                      ?.find((item) => {
                        return item.id === vacancy.description.category_id;
                      })
                      ?.translations.find(
                        (item) => item.locale === i18n.language
                      )?.name ||
                      categories
                        .find(
                          (item) => item.id === vacancy.description.category_id
                        )
                        ?.translations.find(
                          (item) => item.locale === i18n.language
                        )?.name}{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="main-highlight mt-3">
              <div className="post-cols py-3 d-flex justify-content-between">
                <div className="post-col">
                  <ul className="params">
                    <li className="params-i">
                      <div className=" params-i-label">{t("city")}:</div>

                      <div className=" params-i-val">
                        {
                          city
                            .find(
                              (cityItem) =>
                                cityItem.translations[0].id! ===
                                vacancy.description.city_id
                            )
                            ?.translations.find(
                              (item) => item.locale === i18n.language
                            )?.name
                        }
                      </div>
                    </li>
                    <li className="params-i">
                      <div className=" params-i-label">{t("age")}:</div>

                      <div className=" params-i-val">
                        {" "}
                        {vacancy.description.min_age} -{" "}
                        {vacancy.description.max_age}
                      </div>
                    </li>
                    <li className="params-i">
                      <div className=" params-i-label">{t("education")}:</div>

                      <div className=" params-i-val">
                        {" "}
                        {
                          education
                            .find(
                              (item) =>
                                item.id === vacancy.description.education_id
                            )
                            ?.translations.find(
                              (item) => item.locale === i18n.language
                            )?.name
                        }
                      </div>
                    </li>
                    <li className="params-i">
                      <div className=" params-i-label">{t("experience")}:</div>

                      <div className=" params-i-val">
                        {" "}
                        {
                          experience
                            .find(
                              (item) =>
                                item.id === vacancy.description.experience_id
                            )
                            ?.translations.find(
                              (item) => item.locale === i18n.language
                            )?.name
                        }
                      </div>
                    </li>
                    <li className="params-i">
                      <div className=" params-i-label">
                        {t("vacancy-release-date")}:
                      </div>

                      <div className=" params-i-val">
                        {" "}
                        {vacancy.shared_time.split(" ")[0]}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="post-col">
                  <ul className="params params_contacts">
                    <li className="params-i">
                      <div className=" params-i-label">
                        {t("vacancy-end-date")}:
                      </div>

                      <div className=" params-i-val">
                        {" "}
                        {vacancy.end_time.split(" ")[0]}
                      </div>
                    </li>
                    <li className="params-i">
                      <div className=" params-i-label">{t("company")}:</div>

                      <div className=" params-i-val">
                        {" "}
                        {vacancy.description.company}
                      </div>
                    </li>
                    <li className="params-i">
                      <div className=" params-i-label">{t("phone")}:</div>
                      <div className=" params-i-val">
                        <a
                          className="phone"
                          href={`tel:${vacancy.description.phone}`}
                        >
                          {" "}
                          {vacancy.description.phone}{" "}
                        </a>
                      </div>
                    </li>
                    <li className="params-i">
                      <div className=" params-i-label">{t("email")}:</div>
                      <div className=" params-i-val">
                        <a href={`mailto:${vacancy.description.email}`}>
                          {" "}
                          {vacancy.description.email}{" "}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="post-cols d-flex justify-content-between">
              <div className="post-col">
                <dt className="job_description params-i-label">
                  {t("about-job")}
                </dt>
                <dd className="job_description params-i-val">
                  {parse(vacancy.description.job_description)}
                </dd>
              </div>
              <div className="post-col">
                <dt className="requirements params-i-label">
                  {t("candidate-requirements")}
                </dt>
                <dd className="requirements params-i-val">
                  {parse(vacancy.description.candidate_requirement)}
                </dd>
              </div>
            </div>

            <div className="tag-widget post-tag-container">
              <div className="tagcloud">
                {vacancy.description.tags?.indexOf("[") >= 0 &&
                vacancy.description.tags?.indexOf("]") >= 0
                  ? JSON.parse(vacancy.description.tags)?.map((item, index) => {
                      return (
                        <a key={index} className="tag-cloud-link">
                          {item.value}
                        </a>
                      );
                    })
                  : vacancy.description.tags && (
                      <a className="tag-cloud-link">
                        {vacancy.description.tags}
                      </a>
                    )}
              </div>
            </div>

            {vacancy.vacancy_type === 1 ? (
              <div className="services mt-3">
                <button className="btn btn-primary">
                  <i className="fas fa-crown"></i> {t("make-premium")}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  const vacancy = await fetch(
    process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] +
      "vacancies/" +
      context.query.id
  );

  const city = await fetch(
    process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] + "city"
  );
  const modes = await fetch(
    process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] + "modes"
  );
  const categories = await fetch(
    process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] + "categories"
  );
  const education = await fetch(
    process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] + "education"
  );
  const experience = await fetch(
    process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] + "experience"
  );

  return {
    props: {
      vacancy: (await vacancy.json()).vacancy,
      city: await city.json(),
      modes: await modes.json(),
      categories: await categories.json(),
      education: await education.json(),
      experience: await experience.json(),
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}
