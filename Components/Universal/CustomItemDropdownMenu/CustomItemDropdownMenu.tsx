import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle,} from 'reactstrap';
import React, {useState} from 'react';
import {Direction} from "reactstrap/types/lib/Dropdown";
import {useTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import {getUser} from "@/Store/Slices/User";

import Link from "next/link";

const CustomItemDropdownMenu = ({direction, Delete, vacancy_id, vacancyPosition}: {
    direction: Direction,
    Delete: any,
    vacancy_id: string,
    vacancyPosition: 'ended' | "going"
}) => {
    const {authorisation: {token}} = useSelector(getUser)
    const data = useSelector(getUser)
    const {t} = useTranslation('common')
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return <>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
            <DropdownToggle caret
                            className="button hide-arrow"
                            color={'none'}
            >
                <i className={'bx bx-dots-vertical-rounded'}></i>
            </DropdownToggle>
            <DropdownMenu>
                {vacancyPosition !== 'ended' ? <>
                    <DropdownItem>
                        <Link className={'text-dark'} href={'/job/' + vacancy_id}>{t('site-vacancy')}</Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link className={'text-dark'} href={`my-items/${vacancy_id}/edit`}>{t('edit')}</Link>
                    </DropdownItem>
                </> : ''}
                <DropdownItem onClick={(() => Delete({vacancy_id, token: token}))}>
                    <a className="text-danger">{t('delete')}</a>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </>
};

export default CustomItemDropdownMenu;