import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle,} from 'reactstrap';
import React, {useState} from 'react';
import {Direction} from "reactstrap/types/lib/Dropdown";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setInitialUser} from "@/Store/Slices/User";
import {useLogoutMutation} from "@/Store/Query/Auth";
import axios from "axios";

const CustomUserDropdown = ({direction, ...args}: { direction: Direction }) => {
    const [logout, {isLoading}] = useLogoutMutation()
    const {authorisation:{token},user:{email,name}} = useSelector(getUser)
    const dispatch = useDispatch()
    const {push} = useRouter()
    const data = useSelector(getUser)
    const {i18n} = useTranslation('common')
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const router = useRouter()
    const handleChangeLanguage = (locale) => {
        router.push(router.pathname, router.asPath, {locale});
    };


    return <>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
            <DropdownToggle  caret
                             className="nav-link dropdown-toggle hide-arrow"
                             tag="a">

                    <div className="avatar avatar-online">
                        <img
                            width={"40"}
                            height={"40"}
                            src={data?.user.profile_photo_url}
                            alt=""
                            className="w-px-40 h-auto rounded-circle"
                        />
                    </div>
            </DropdownToggle>
            <DropdownMenu {...args}>
                <DropdownItem ><div className="flex-grow-1">
                    <span className="fw-semibold d-block">{name}</span>
                    <small className="text-muted">{email}</small>
                </div> </DropdownItem>
                <DropdownItem onClick={ () => {
                    logout(token)
                        .then(() => {
                            push('/user/login')
                            dispatch(setInitialUser())

                        })
                }}> <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span></DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </>
};

export default CustomUserDropdown;