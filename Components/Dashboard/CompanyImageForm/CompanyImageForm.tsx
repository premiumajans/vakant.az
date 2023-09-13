import {useSendPhotoMutation} from "@/Store/Query/Auth";
import {getUser} from "@/Store/Slices/User";
import {yupResolver} from "@hookform/resolvers/yup";
import Image from "next/image";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";
import * as yup from "yup";

const CompanyImageForm = ({img}: { img: string }) => {

    const {company} = useSelector(getUser);


    const {t} = useTranslation("common");
    const [photo, setPhoto] = useState("");
    const [sendPhotoRequest, {isLoading}] = useSendPhotoMutation();
    const [showChangeImage, setShowChangeImage] = useState(false)
    const ref = useRef()
    const {
        authorisation: {token},
    } = useSelector(getUser);

    const schema = yup.object().shape({
        photo: yup.mixed().required(),
    });

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = (data: any) => {
        const formData = new FormData();
        formData.append("photo", ref.current.files[0], "etJFB.jpg");
        setShowChangeImage(true)
        sendPhotoRequest({data: formData, token}).then((res) => {
            if ("data" in res) {
                Swal.fire(`${t(res.data.message)}`, "", "success").then(() => {
                });
            } else {
                Swal.fire(`${t('something-went-wrong')}`, "", "error").then(() => {
                    setPhoto('')
                });
            }
        })
    };




    return (
        <form onChange={handleSubmit(onSubmit)}>
            <div
                style={{margin: 10}}
                className="d-flex align-items-start align-items-sm-center gap-4"
            >
                <Image
                    style={{objectFit: "contain"}}
                    src={!showChangeImage ? (img?.length > 0 &&  !img?.includes('undefined') && !img?.includes('null') ? img : photo || "/static/img/avatar.svg") : (photo || "/static/img/avatar.svg")}
                    alt="user-avatar"
                    className="d-block rounded"
                    height="100"
                    width="100"
                    id="uploadedAvatar"
                />
                <div className="button-wrapper">
                    <label
                        htmlFor="upload"
                        className={"btn btn-primary me-2 " + (!company ? 'disabled' : '')}
                        tabIndex={0}
                    >
                        <span className="d-none d-sm-block">{isLoading ? 'Loading...' : `${t("photo-upload")}`}</span>
                        <i className="bx bx-upload d-block d-sm-none"></i>
                        <input
                            {...register("photo")}
                            disabled={isLoading || !company}
                            ref={ref}
                            onChange={(e) => {
                                setPhoto(URL.createObjectURL(e.target.files[0]));
                                setValue("photo", e.target.files && e.target.files[0]);
                            }}
                            accept=".webp, .jpg, .jpeg, .png, .svg"
                            type="file"
                            id="upload"
                            name="photo"
                            className={`account-file-input ${
                                errors.photo ? "is-invalid" : ""
                            }`}
                            hidden
                        />
                    </label>
                </div>
            </div>
        </form>
    );
};

export default CompanyImageForm;
