import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import CustomLanguageDropdown from "@/Components/Universal/CustomLanguageDropdown/CustomLanguageDropdown";
import { useTranslation } from "next-i18next";

const HeaderNav = () => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const [whiteNav, setWhiteNav] = useState("scrolled");


  

  useEffect(() => {
    const handleSubmit = (e: any) => {
      if (e.target.scrollingElement.scrollTop > 250) {
        setWhiteNav("scrolled awake");
      } else if (e.target.scrollingElement.scrollTop > 150) {
        setWhiteNav("scrolled sleep");
      } else {
        setWhiteNav("scrolled");
      }
    };

    if (window !== undefined) {
      window.addEventListener("scroll", handleSubmit);
    }

    return () => {
      window.removeEventListener("scroll", handleSubmit);
    };
  }, []);

  return (
    <>
      <div className="bar-container">
        <div className="container">
          <div className="bar">
            <a className="bar-i"></a>
          </div>
        </div>
      </div>
      <header
        style={pathname === "/" ? { marginBottom: 30 } : {}}
        className="header"
        data-lotriver-header=""
      >
        <div
          id="header-right"
          className="container d-flex flex-column flex-sm-row justify-content-between align-items-center"
        >
          <Link
            className="logo inline-block"
            style={{ height: "60px" }}
            href="/"
          >
            <Image
              style={{ height: "100%", objectFit: "contain", width: 185 }}
              width={250}
              height={350}
              src={"/clients/images/vakant-white-logo.png"}
              alt={"logo"}
            />
          </Link>

          <div className="nav-secondary">
            <div className="nav-i">
              <Link className="nav-i-link nav-i-link_current" href="/jobs">
                {t("find-a-job")}
              </Link>
            </div>
            <div className="nav-i">
              <Link className="btn btn_large" href="/user/login">
                {t("post-a-job")}
              </Link>
            </div>
            <CustomLanguageDropdown direction={"down"} />
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderNav;
