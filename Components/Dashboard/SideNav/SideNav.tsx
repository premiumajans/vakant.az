import Image from "next/image";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

const SideNav = ({menu, setMenu}: { menu: boolean, setMenu: any }) => {
    const {t} = useTranslation('common')
    const {pathname} = useRouter()

    return <>
        {menu ? <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme"
                   data-bg-class="bg-menu-theme"
                   style={{touchAction: "none", userSelect: "none"}}>


                <div style={{
                    display:'grid'
                }} className="app-brand demo ">
                    <Link href="/" >
                    <span className="app-brand-logo demo">
                        <Image style={{
                            objectFit:'cover',
                            height: 50,
                            color: 'transparent',
                            width: "100%"
                        }} width={400} height={400} src={'/logo.png'} alt={'logo'}/>
                    </span>
                    </Link>

                    <a onClick={() => setMenu(!menu)} className="layout-menu-toggle menu-link text-large ms-auto">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div className="menu-inner-shadow" style={{display: "block"}}></div>


                <ul className="menu-inner py-1 overflow-auto">

                    <li className="menu-header small text-uppercase">
                    </li>

                    <li className={"menu-item " + (pathname === '/user/profile' ? 'active' : '')}>
                        <Link href="/user/profile" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div>{t('my-profile')}</div>
                        </Link>
                    </li>

                    {/* <!-- Layouts --> */}
                    <li className={"menu-item " + (pathname == '/user/create-new-item'  ? 'active' : '')}>
                        <Link href="/user/create-new-item" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fas fa-bullhorn"></i>
                            <div>{t('post-an-ad')}</div>

                        </Link>
                    </li>

                    {/* <!-- Apps --> */}
                    <li className={"menu-item " + (pathname == '/user/my-items'  ? 'active' : '')}>
                        <Link href="/user/my-items" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fas fa-scroll"></i>
                            <div>{t('my-items')}</div>

                        </Link>

                    </li>

                    {/* <!-- Components --> */}
                    <li className={"menu-item " + (pathname == '/user/my-company'  ? 'active' : '')}>

                        <Link href="/user/my-company" className="menu-link menu-toggle">
                            <i className="menu-icon fas fa-building"></i>
                            <div>{t('my-company')}</div>
                        </Link>
                    </li>

                    {/* <!-- Forms --> */}
                    <li className={"menu-item " + (pathname == '/user/security'  ? 'active' : '')}>

                        <Link href="/user/security" className="menu-link menu-toggle">
                            <i className="menu-icon fas fa-shield-alt"></i>
                            <div>{t('security')}</div>
                        </Link>
                    </li>

                </ul>


            </aside>
            <div onClick={() => setMenu(!menu)} className="layout-overlay layout-menu-toggle"></div>
        </> : ''}
    </>
};

export default SideNav;