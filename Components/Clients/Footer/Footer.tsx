import { i18n, useTranslation } from "next-i18next";
import { useSettingsQuery } from "@/Store/Query/Auth";
import { useEffect, useState } from "react";
import { select } from "@/interfaces/generalResponses";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation("common");

  const { data } = useSettingsQuery("");
  const settings = data?.settings;

  const [category, setCategory] = useState<select[]>([]);

  useEffect(() => {
    fetch(process.env["NEXT_PUBLIC_MAIN_PATH_WITH_API"] + "categories")
      .then((res) => res.json())
      .then((res) => {
        setCategory(res);
      });
  }, []);

  return (
    <>
      <footer className="ftco-footer  ftco-bg-dark ftco-section">
        <div className="container">
          <div className="row">
            <div className={"col-lg-9 col-md-8 col-12"} data-aos="fade-up ">
              <div className="ftco-footer-widget mb-4 col">
                <h2 className="ftco-heading-2">{t("find-a-job")}</h2>
                <div className="block-23 mb-3">
                  <ul className={"row"}>
                    {category.map((item) => {
                      return (
                        <li
                          className={"col-md-6 col-lg-4 col-sm-6 col-12"}
                          key={item.id}
                        >
                          <Link href={`/category-jobs/${item.id}`}>
                            {
                              item.translations.find(
                                (item) => item.locale === i18n?.language
                              )?.name
                            }
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={"col-lg-3 col-md-4 col-12 d-flex justify-content-end"}
              data-aos="fade-up "
            >
              <div className="ftco-footer-widget mb-4 col">
                <h2 className="ftco-heading-2">{t("questions")}</h2>
                <div className="block-23 mb-3">
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <li>
                      <span className="icon icon-map-marker"></span>
                      <span className="text">
                        {
                          settings?.find((item) => item.name === "address")
                            ?.link
                        }
                      </span>
                    </li>
                    <li>
                      <a
                        href={`tel:${
                          settings?.find((item) => item.name === "phone_1")
                            ?.link
                        }`}
                      >
                        <span className="icon icon-phone"></span>
                        <span className="text">
                          {
                            settings?.find((item) => item.name === "phone_1")
                              ?.link
                          }
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${
                          settings?.find((item) => item.name === "phone_2")
                            ?.link
                        }`}
                      >
                        <span className="icon icon-phone"></span>
                        <span className="text">
                          {
                            settings?.find((item) => item.name === "phone_2")
                              ?.link
                          }
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${
                          settings?.find((item) => item.name === "email")?.link
                        }`}
                      >
                        <span className="icon icon-envelope"></span>
                        <span className="text">
                          {
                            settings?.find((item) => item.name === "email")
                              ?.link
                          }
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <ul className="ftco-footer-social list-unstyled float-md-center float-lft">
                  <li className="ftco-animate fadeInUp ftco-animated">
                    <a
                      href={
                        settings?.find((item) => item.name === "facebook")?.link
                      }
                    >
                      <span className="icon-facebook"></span>
                    </a>
                  </li>
                  <li className="ftco-animate fadeInUp ftco-animated">
                    <a
                      href={
                        settings?.find((item) => item.name === "instagram")
                          ?.link
                      }
                    >
                      <span className="icon-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-padding">
                <div className="section-container d-flex justify-content-center flex-wrap">
                  <div className="block-widget-wrap container d-flex justify-content-between">
                    <p className="copyright text-center">
                      {t("copyright")} © {new Date().getFullYear()}.{" "}
                    </p>
                    <a
                      style={{ display: "block" }}
                      href="https://www.premium.az/"
                    >
                      Premium Advertising
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
