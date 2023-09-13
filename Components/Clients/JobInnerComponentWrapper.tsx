import React, { ReactNode } from "react";

interface IJobInnerComponentWrapper {
  children: ReactNode;
  title: string;
}
function JobInnerComponentWrapper({
  children,
  title,
}: IJobInnerComponentWrapper) {
  return (
    <div data-aos="fade-right" className="job-inner-wrapper">
      <h3 className="mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default JobInnerComponentWrapper;
