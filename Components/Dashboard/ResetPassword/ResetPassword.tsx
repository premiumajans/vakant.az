import { useResetPasswordMutation } from "@/Store/Query/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Swal from "sweetalert2";
import * as yup from 'yup'

const ResetPassword = () => {
  const { t } = useTranslation("common");
  const [isTextType, setIsTextType] = useState([false, false]);
  const [resetRequest, {isLoading}] = useResetPasswordMutation()
  const {query:{email,token}, push} = useRouter()

  

  const changeType = (index: number) => {
    const currentTypes = [...isTextType];
    currentTypes[index] = !currentTypes[index];
    setIsTextType(currentTypes);
  };


  let schema = yup.object().shape({
    new_password: yup.string().required(`${t("password-required")}`),
    confirm_password: yup.string().required(`${t("password-required")}`).oneOf([yup.ref("new_password")], `${t("password-match")}`),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    data.email = email
    data.token = token
    resetRequest(data)
    .then((res) => {
      if('data' in res) {
        const {message} = res.data
        Swal.fire(`${t(message)}`, ``, "success").then(() => {
          push('/user/login')
        })
      } else {
        Swal.fire(`${t('something-went-wrong')}`, "", "error");
      }
    })
  };

  return (
    <div className="authentication-wrapper authentication-basic container-p-y">
      <div className="authentication-inner">
        {/* <!-- Register Card --> */}
        <div className="card">
          <div className="card-body">
            {/* <!-- Logo --> */}
            <div
              style={{ height: "50px" }}
              className="app-brand justify-content-center"
            >
              <Link href={'/'}>
                <Image
                    style={{ objectFit: "cover" }}
                    src={"/logo.png"}
                    alt="logo"
                    width={350}
                    height={200}
                />
              </Link>
            </div>
            {/* <!-- /Logo --> */}
            <h4 className="mb-2">{t("change-password")}</h4>
            <form
                onSubmit={handleSubmit(onSubmit)}

              className="mb-3 fv-plugins-bootstrap5 fv-plugins-framework"
              action="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/horizontal-menu-template/auth-login-basic.html"
              method="POST"
              noValidate={false}
            >
              <div className="mb-3 form-password-toggle fv-plugins-icon-container">
                <label className="form-label" htmlFor="password">
                  {t("new-password")}
                </label>
                <div className="input-group input-group-merge">
                  <input
                    {...register("new_password")}
                    className={`form-control ${
                      errors. new_password ? "is-invalid" : ""
                    }`}
                    type={isTextType[0] ? "text" : "password"}
                    name="new_password"
                    id="new_password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  />
                  <span
                    onClick={() => changeType(0)}
                    className="input-group-text cursor-pointer"
                  >
                    <i
                      className={`bx ${isTextType[0] ? "bx-show" : "bx-hide"}`}
                    ></i>
                  </span>
                  {errors.new_password ? (
                    <div className="fv-plugins-message-container invalid-feedback">
                      <div>{errors.new_password.message as string}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3 form-password-toggle fv-plugins-icon-container">
                <label className="form-label" htmlFor="confirm-password">
                  {t("cnew-password")}
                </label>
                <div className="input-group input-group-merge">
                  <input
                    {...register("confirm_password")}
                    className={`form-control ${
                      errors.confirm_password ? "is-invalid" : ""
                    }`}
                    type={isTextType[1] ? "text" : "password"}
                    name="confirm_password"
                    id="currepassword_confirmationnpassword_confirmationtPassword"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  />
                  <span
                    onClick={() => changeType(1)}
                    className="input-group-text cursor-pointer"
                  >
                    <i
                      className={`bx ${isTextType[1] ? "bx-show" : "bx-hide"}`}
                    ></i>
                  </span>
                  {errors.confirm_password ? (
                    <div className="fv-plugins-message-container invalid-feedback">
                      <div>{errors.confirm_password.message as string}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <button disabled={isLoading} className="btn btn-primary d-grid w-100 mb-3">
                {t("submit")}
              </button>
              <div className="text-center">
                <Link href="/user/login">
                  <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                  {t("back-to-login")}
                </Link>
              </div>
              <input type="hidden" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  {
    /* <!-- / Content --> */
  }
};

export default ResetPassword;
