import React from "react";
import CustomerImage from "../../public/clients/images/customer.svg";
import CoronaImage from "../../public/clients/images/corona.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface IJobItem {
  href?: string;
  subadge?: string | undefined;
  position?: string | undefined;
  salary?: string | undefined;
  company?: string | undefined;
  shared_time?: string | undefined;
  premium?: boolean;
  className?: string;
}

function JobItem({
  subadge,
  premium,
  className,
  href,
  position,
  salary,
  company,
  shared_time,
}: IJobItem) {
  console.log(shared_time?.split("-")[2].split(" ")[0]);
  const { i18n, t } = useTranslation("common");
  const month = shared_time?.split("-")[1];
  const date = `${+shared_time?.split("-")[2].split(" ")[0]} ${t(month)}`;
  

  return (
    <Link
      href={href}
      data-aos="fade-up"
      className={`job-item ${className} bg-white position-relative flex-column  flex-md-row d-flex align-items-start  align-items-md-center justify-content-between bg-white`}
    >
      <div className="job-item-left d-flex align-items-center">
        <Image src={CustomerImage} alt="customer-image" />
        <div className="company pl-3">
          <h3 className="mb-0">{position}</h3>
          <p className="mb-0">{company}</p>
        </div>
      </div>
      <div className="d-flex text-center pt-3 pt-md-0 align-items-center job-item-right">
        <span className="salary pr-3 border-right">{salary}</span>
        <span className="date pl-3">{date}</span>
      </div>
      {premium && (
        <div className="type d-flex align-items-center">
          <i className="fas fa-crown text-warning"></i>
          <span className="">Premium</span>
        </div>
      )}
    </Link>
  );
}

export default JobItem;
