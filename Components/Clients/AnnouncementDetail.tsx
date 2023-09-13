import React from "react";
import Email from "../../public/images/job-detail-message.svg";
import Calendar from "../../public/images/job-detail-calendar.svg";
import Eye from "../../public/images/job-detail-eyes.svg";
import Lock from "../../public/images/job-detail-lock.svg";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface IAnnouncementDetail {
  id: number;
  shared_time: string;
  last_time: string;
  view_count: number;
}

function AnnouncementDetail({
  id,
  shared_time,
  last_time,
  view_count,
}: IAnnouncementDetail) {
  const { i18n, t } = useTranslation("common");
  const dateFormatter = (arg: string) => {
    const month = arg?.split("-")[1];
    const date = `${+arg?.split("-")[2].split(" ")[0]} ${t(month)}`;
    return date;
  };

  return (
    <div data-aos="fade-left" className="announcement-detail bg-white">
      <h3>Elan #{id}</h3>
      <div className="job-detail-inner-top d-flex justify-content-between align-items-center pb-3">
        <div className="d-flex align-items-center">
          <div className="img-box mr-4">
            <Image src={Email} width={22} alt="email" />
          </div>
          <div>
            <span>E-poçtu göstər</span>
            <p className="mb-0">E-poçt ünvanı</p>
          </div>
        </div>
        <div className="img-box">
          <Image alt="lock" src={Lock} />
        </div>
      </div>

      <div className="job-detail-bottom pt-3">
        <div className="announcement-time w-100 d-flex align-items-center">
          <div className="date-time-box d-flex align-items-center">
            <div className="img-box mr-4">
              <Image src={Calendar} width={22} alt="calendar" />
            </div>

            <div>
              <span>{dateFormatter(shared_time)}</span>
              <p className="mb-0">Elan tarixi</p>
            </div>
          </div>

          <div className="date-time-box">
            <span>{dateFormatter(last_time)}</span>
            <p className="mb-0">Bitmə tarixi</p>
          </div>
        </div>
        <div
          style={{ marginTop: "16px" }}
          className="date-time-box d-flex align-items-center"
        >
          <div className="img-box mr-4">
            <Image src={Eye} width={22} alt="calendar" />
          </div>

          <div>
            <span>{view_count}</span>
            <p className="mb-0">Baxilib</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
