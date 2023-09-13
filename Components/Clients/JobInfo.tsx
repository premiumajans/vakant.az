import Image from "next/image";
import React from "react";
import location from "../../public/images/job-detail-location.svg";
import regime from "../../public/images/job-detail-regime.svg";
import service from "../../public/images/job-detail-service.svg";
import educationImg from "../../public/images/education.svg";
import salaryImg from "../../public/images/job-detail-salary.svg";
import { useTranslation } from "next-i18next";
interface IJobInfo {
  city: string;
  salary: string;
  mode: string;
  experience: string;
  education: string;
}

function JobInfo({ city, salary, mode, experience, education }: IJobInfo) {
  const { i18n, t } = useTranslation("common");

  return (
    <div id="job-info" className="d-flex align-items-center">
      <div className="job-inner-box d-flex align-items-center">
        <div className="img-box mr-4">
          <Image src={location} width={22} alt="email" />
        </div>
        <div>
          <span>{city}</span>
          <p className="mb-0">{t("city")}</p>
        </div>
      </div>
      <div className="job-inner-box d-flex align-items-center">
        <div className="img-box mr-4">
          <Image src={salaryImg} width={22} alt="email" />
        </div>
        <div>
          <span>{salary}</span>
          <p className="mb-0">{t("salary")} AZN</p>
        </div>
      </div>
      <div className="job-inner-box d-flex align-items-center">
        <div className="img-box mr-4">
          <Image src={regime} width={22} alt="email" />
        </div>
        <div>
          <span>{mode}</span>
          <p className="mb-0">{t("work-mode")}</p>
        </div>
      </div>
      <div className="job-inner-box d-flex align-items-center">
        <div className="img-box mr-4">
          <Image src={service} width={22} alt="email" />
        </div>
        <div>
          <span>{experience}</span>
          <p className="mb-0">{t("experience")}</p>
        </div>
      </div>
      <div className="job-inner-box d-flex align-items-center">
        <div className="img-box mr-4">
          <Image
            style={{ width: "30px" }}
            src={educationImg}
            width={24}
            alt="email"
          />
        </div>
        <div>
          <span>{education}</span>
          <p className="mb-0">{t("education")}</p>
        </div>
      </div>
    </div>
  );
}

export default JobInfo;
