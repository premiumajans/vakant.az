import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle,} from 'reactstrap';
import React, {useEffect, useState} from 'react';
import {Direction} from "reactstrap/types/lib/Dropdown";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

const CustomLanguageDropdown = ({direction, ...args}: { direction: Direction }) => {
    const {i18n} = useTranslation('common')
    const [client, setClient] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [language, setLanguage] = useState<'az' | 'en' | 'ru'>('az')
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const router = useRouter()
    const handleChangeLanguage = (locale: string) => {
        router.push(router.pathname, router.asPath, {locale});
    };


    useEffect(() => {
        if(!(router.pathname.indexOf('user') >= 0)) {
            setClient(true)
        }
    },[])


    return <>
        <Dropdown className={'nav-i'} onClick={(e: any) => {
            if (e.target.value === 'en' || e.target.value === 'az' || e.target.value === 'ru') {
                setLanguage(e.target.value)
            }
        }} isOpen={dropdownOpen} toggle={toggle} direction={direction}>
            <DropdownToggle caret
                            className="nav-link dropdown-toggle hide-arrow"
                            tag="a" style={{
                marginRight: 10,
                background: "none",
                color: 'black',
                border: 'none',
                cursor: 'pointer'
            }}><i className={'fi fi-' + (i18n.language === 'en' ? 'us' : i18n.language)}
                  style={{marginRight: 5}}></i>{!client ? i18n.language?.toUpperCase() : '' }</DropdownToggle>
            <DropdownMenu {...args}>
                <DropdownItem onClick={(e) => handleChangeLanguage('az')} value={'az'} ><i className={'fi fi-az'}></i> Azərbaycan </DropdownItem>
                <DropdownItem onClick={(e) => handleChangeLanguage('en')} value={'en'}><i className={'fi fi-us'}></i> English </DropdownItem>
                <DropdownItem onClick={(e) => handleChangeLanguage('ru')} value={'ru'}><i className={'fi fi-ru'}></i> Русский </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </>
};

export default CustomLanguageDropdown;