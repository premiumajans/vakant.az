import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@/Store/Query/Auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "@/Store/Slices/User";
import Link from "next/link";
import axios from "axios";

const Login = () => {
  const { push } = useRouter();
  const {
    authorisation: { token },
  } = useSelector(getUser);

  const [loginRequest, { data, isLoading, isError, error }] =
    useLoginMutation();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const { t } = useTranslation("common");
  const [hidePassword, setHidePassword] = useState(false);

  let schema = yup.object().shape({
    email: yup
      .string()
      .email(`${t("email-valid")}`)
      .required(`${t("email-required")}`)
      .min(3, `${t("email-min-3")}`),
    password: yup
      .string()
      .required(`${t("password-required")}`)
      .min(6, `${t("password-min-6")}`),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setLogin(true);
  }, []);

  const onSubmit = async (data: any) => {
    const res = await loginRequest(data);
    console.log(res);
    if ("error" in res) {
    } else {
      dispatch(setUser(res.data));
      // axios.post("/api/save-user", res.data)
      push("profile");
    }
  };


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
                <Link  href={'/'}>
                  <Image
                      src={"/logo.png"}
                      style={{ objectFit: "cover" }}
                      alt="logo"
                      width={350}
                      height={200}
                  />
                </Link>
              </div>
              {/* <!-- /Logo --> */}
              <h4 className="mb-2">{t("login-to-account")}</h4>
              <p className="mb-4">{t("welcome")}</p>

              {login ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}

                  className="mb-3"
                >
                  <div className="mb-3">
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

                  <div className="mb-3 form-password-toggle">
                    <label
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="form-label"
                      htmlFor="password"
                    >
                      {t("password")}
                      <Link href="/user/forgot-password">
                        <span style={{ textTransform: "none" }}>
                          {" "}
                          {t("forgot-password")}{" "}
                        </span>
                      </Link>
                    </label>
                    <span className="input-group input-group-merge">
                      <input
                        {...register("password")}
                        type={hidePassword ? "password" : "text"}
                        id="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        name="password"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password"
                      />
                      <span
                        onClick={() => setHidePassword(!hidePassword)}
                        className="input-group-text cursor-pointer"
                      >
                        <i
                          className={`bx ${
                            hidePassword ? "bx-hide" : "bx-show"
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
                    </span>
                  </div>

                  {/*<div className="mb-3">*/}
                  {/*  <div className="form-check">*/}
                  {/*    <input*/}
                  {/*      className="form-check-input"*/}
                  {/*      type="checkbox"*/}
                  {/*      id="terms-conditions"*/}
                  {/*      name="terms"*/}
                  {/*    />*/}
                  {/*    <label*/}
                  {/*      className="form-check-label"*/}
                  {/*      htmlFor="terms-conditions"*/}
                  {/*    >*/}
                  {/*      {t("remember-me")}*/}
                  {/*    </label>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {error?.status === 401 ? (
                    <div
                      style={{ display: "block", margin: 10 }}
                      className="fv-plugins-message-container invalid-feedback"
                    >
                      <div>{t("email or password are invalid")}</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    className={`btn btn-primary d-grid w-100 ${
                      isLoading || Object.keys(errors).length > 0
                        ? "disabled"
                        : ""
                    }`}
                  >
                    {t("login")}
                  </button>
                </form>
              ) : (
                ""
              )}

              <p className="text-center">
                <span> {t("new-in-our-platform")}</span>
                <Link href="/user/register">
                  <span> {t("create-an-account")} </span>
                </Link>
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
      </div>

      {/* <!-- / Content --> */}
    </>
  );
};

export default Login;
