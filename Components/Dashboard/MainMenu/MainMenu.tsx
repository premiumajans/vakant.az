import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";


const MainMenu = () => {
  const {pathname} = useRouter()
  const {t} = useTranslation('common')

  
  

  

  
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu-horizontal menu-horizontal  menu bg-menu-theme flex-grow-0"
      >
        <div className="container-fluid d-flex h-100">
          <ul style={{ zIndex: "100", justifyContent:'center' }} className="menu-inner">
            {/* <!-- Dashboards --> */}
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

            {/* <!-- Pages --> */}
            {/* <li className={"menu-item " + (pathname == '/user/'  ? 'active' : '')}>
              <a href="javascript:void(0)" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-collection"></i>
                <div>{t('my-packages')}</div>

              </a>
            </li> */}

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
        </div>
      </aside>
    </>
  );
};

export default MainMenu;




