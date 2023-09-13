import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePrivacyMutation, useRegisterMutation } from "@/Store/Query/Auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "@/Store/Slices/User";
import Link from "next/link";
import parse from "html-react-parser";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const {
    authorisation: { token },
  } = useSelector(getUser);
  const [registerRequest, { isLoading }] = useRegisterMutation();
  const [getPrivacy, { data, isLoading: privacyLoading }] =
    usePrivacyMutation();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [reg, setRegister] = useState(false);
  const { t } = useTranslation("common");
  const [isTextType, setIsTextType] = useState([false, false]);

  const changeType = (index: number) => {
    const currentTypes = [...isTextType];
    currentTypes[index] = !currentTypes[index];
    setIsTextType(currentTypes);
  };

  let schema = yup.object().shape({
    name: yup
      .string()
      .required(`${t("name-required")}`)
      .min(3, `${t("name-min-3")}`),
    email: yup
      .string()
      .email(`${t("email-valid")}`)
      .required(`${t("email-required")}`)
      .min(3),
    password: yup
      .string()
      .required(`${t("password-required")}`)
      .min(6, `${t("password-min-6")}`),
    password_confirmation: yup
      .string()
      .required(`${t("password_confirmation-required")}`)
      .min(6, `${t("password-min-6")}`)
      .oneOf([yup.ref("password")], `${t("password-match")}`),
    term: yup
      .bool()
      .required(`${t("privacy-required")}`)
      .oneOf([true], `${t("file-must-check")}`),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  useEffect(() => {
    setRegister(true);
  }, []);

  const onSubmit = async (data: any) => {
    data.term = data.term ? 1 : 0;
    registerRequest(data)
      .then((res) => {
        if ("data" in res) {
          dispatch(setUser(res.data));
          push("profile");
        } else {
          const errorMessage = res.error.data.errors.email[0];
          Swal.fire(`${t(errorMessage)}`, "", "error");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // useEffect(() => {
  //   if (token.length > 0) {
  //     push("profile");
  //   }
  // });

  return (
    <>
      {/* <!-- Content --> */}
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
                <Link  href={'/'}><Image
                    style={{ objectFit: "cover" }}
                    src={"/logo.png"}
                    alt="logo"
                    width={350}
                    height={200}
                /></Link>
              </div>
              {/* <!-- /Logo --> */}
              <h4 className="mb-2">{t("create-an-account")}</h4>
              <p className="mb-4">{t("welcome")}</p>

              {reg ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mb-3 fv-plugins-bootstrap5 fv-plugins-framework"
                  noValidate={false}
                >
                  <div className="mb-3 fv-plugins-icon-container">
                    <label htmlFor="username" className="form-label">
                      {t("username")}
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      placeholder="Enter your username"
                      autoFocus={false}
                    />
                    {errors.name ? (
                      <div className="fv-plugins-message-container invalid-feedback">
                        <div>{errors.name.message as string}</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-3 fv-plugins-icon-container">
                    <label htmlFor="email" className="form-label">
                      {t("email")}
                    </label>
                    <input
                      {...register("email")}
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                    {errors.email ? (
                      <div className="fv-plugins-message-container invalid-feedback">
                        <div>{errors.email.message as string}</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mb-3 form-password-toggle fv-plugins-icon-container">
                    <label className="form-label" htmlFor="password">
                      {t("new-password")}
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        {...register("password")}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        type={isTextType[0] ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      />
                      <span
                        onClick={() => changeType(0)}
                        className="input-group-text cursor-pointer"
                      >
                        <i
                          className={`bx ${
                            isTextType[0] ? "bx-show" : "bx-hide"
                          }`}
                        ></i>
                      </span>
                      {errors.password ? (
                        <div className="fv-plugins-message-container invalid-feedback">
                          <div>{errors.password.message as string}</div>
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
                        {...register("password_confirmation")}
                        className={`form-control ${
                          errors.password_confirmation ? "is-invalid" : ""
                        }`}
                        type={isTextType[1] ? "text" : "password"}
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      />
                      <span
                        onClick={() => changeType(1)}
                        className="input-group-text cursor-pointer"
                      >
                        <i
                          className={`bx ${
                            isTextType[1] ? "bx-show" : "bx-hide"
                          }`}
                        ></i>
                      </span>
                      {errors.password_confirmation ? (
                        <div className="fv-plugins-message-container invalid-feedback">
                          <div>
                            {errors.password_confirmation.message as string}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mb-3 fv-plugins-icon-container">
                    <div className="form-check">
                      <input
                        {...register("term")}
                        onChange={(e) => setValue("term", e.target.checked)}
                        className={`form-check-input ${
                          errors.term ? "is-invalid" : ""
                        }`}
                        type="checkbox"
                        id="terms-conditions"
                        name="terms"
                      />
                      <label
                        onClick={() => getPrivacy("")}
                        className="form-check-label"
                        htmlFor=""
                      >
                        {t("agree")}{" "}
                        <span
                          data-bs-toggle="modal"
                          data-bs-target="#editUser"
                          style={{ color: process.env.NEXT_PUBLIC_MAIN_COLOR }}
                        >
                          {t("privacy-policy")}
                        </span>
                      </label>
                      {errors.term ? (
                        <div className="fv-plugins-message-container invalid-feedback">
                          <div>{errors.term.message as string}</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <button
                    className={`btn btn-primary d-grid w-100 btn-card-block ${
                      isLoading ? "disabled" : ""
                    }`}
                  >
                    {t("create-an-account")}
                  </button>
                </form>
              ) : (
                ""
              )}

              <p className="text-center">
                {t("have-account")}{" "}
                <Link href="/user/login">{t("sign-in-instead")}</Link>
              </p>

              {/*<div className="divider my-4">*/}
              {/*  <span className="divider-text">or</span>*/}
              {/*</div>*/}

              {/*<div className="d-flex justify-content-center">*/}
              {/*  <a href="" className="btn btn-icon btn-label-facebook me-3">*/}
              {/*    <i className="tf-icons bx bxl-facebook"></i>*/}
              {/*  </a>*/}

              {/*  <a href="" className="btn btn-icon btn-label-google-plus me-3">*/}
              {/*    <i className="tf-icons bx bxl-google-plus"></i>*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>

        <div
          className={`modal fade`}
          id="editUser"
          tabIndex={-1}
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-simple modal-edit-user">
            <div className="modal-content p-3 p-md-5">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                {privacyLoading ? (
                  <Loading />
                ) : data?.term?.description ? (
                  parse(`${data?.term?.description}`)
                ) : (
                  "Nothing to show"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- / Content --> */}
    </>
  );
};

export default Register;
