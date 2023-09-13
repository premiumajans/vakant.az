import {getUser} from "@/Store/Slices/User";
import {Item} from "@/interfaces/generalResponses";
import {useTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import parse from 'html-react-parser'
import CustomItemDropdownMenu from "@/Components/Universal/CustomItemDropdownMenu/CustomItemDropdownMenu";
import React from "react";

const ItemCard = ({item: {description: {position, vacancy_id, job_description}, end_time,vacancy_type}, Delete, vacancyPosition}: {
    item: Item,
    Delete: any,
    vacancyPosition: 'ended' | "going"
}) => {
    const {t} = useTranslation('common')
    const {authorisation} = useSelector(getUser)


    return <div  className="col-xl-4 col-lg-6 col-md-6">
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <a className="d-flex align-items-center">
                        <div className="avatar avatar-sm me-2 d-flex align-items-center">
                            {vacancy_type === 2 ?  <span className="text-warning"><i
                                className="fas fa-crown"></i></span> : <img style={{objectFit:'cover'}} src="/logo.png" alt="Avatar"
                                 className="rounded-circle"/>
                            }
                        </div>
                        <div className="me-2 text-body h5 mb-0">
                            {position}
                        </div>
                    </a>
                    <div className="ms-auto">
                        <ul className="list-inline mb-0 d-flex align-items-center">
                            <li className="list-inline-item">
                                <div className="dropdown">
                                    {/*<button type="button" className="btn dropdown-toggle hide-arrow p-0" data-bs-toggle="dropdown" aria-expanded="false"><i className="bx bx-dots-vertical-rounded"></i></button>*/}
                                    <CustomItemDropdownMenu vacancyPosition={vacancyPosition} direction={'down'} Delete={Delete} vacancy_id={vacancy_id}/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {vacancyPosition !== 'ended' ? <div className="ms-auto">
                    <a className="me-2"><span
                        className="badge bg-label-success">{t('days-left', {days: Math.ceil((+(new Date(end_time).getTime()) - +(new Date().getTime())) / (1000 * 60 * 60 * 24))})}</span></a>
                </div> : ''}
            </div>
        </div>
    </div>
};

export default ItemCard;
