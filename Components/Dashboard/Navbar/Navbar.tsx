import { getUser} from "@/Store/Slices/User";

import React, {PropsWithChildren, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Image from "next/image";
import Link from "next/link";
import CustomLanguageDropdown from "@/Components/Universal/CustomLanguageDropdown/CustomLanguageDropdown";
import CustomUserDropdown from "@/Components/Universal/CustomUserDropdown/CustomUserDropdown";
import SideNav from "@/Components/Dashboard/SideNav/SideNav";

const Navbar = (props: PropsWithChildren) => {
  const {authorisation:{token},user:{email,name}} = useSelector(getUser)
  const [menu, setMenu] = useState(false)
  const dispatch = useDispatch()



  return (
    <>
      <SideNav menu={menu} setMenu={setMenu}/>
      <nav
      style={{zIndex:'1000'}}
        className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div style={{height:'100%'}} className="container-fluid">
          <div style={{height:'100%'}} className="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
          <Link  href={'/'}>
            <Image style={{
              width:'400px',
              height:'100%',
              objectFit:'cover'
            }} width={450} height={450} src={'/logo.png'} alt="logo" />
          </Link>
          </div>

          <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0  d-xl-none  ">
            <a onClick={() => setMenu(!menu)}
              className="nav-item nav-link px-0 me-xl-4"
              
            >
              <i className="bx bx-menu bx-sm"></i>
            </a>
          </div>

          <div
            className="navbar-nav-right d-flex align-items-center"
            id="navbar-collapse"
          >
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              {/* <!-- Language --> */}
              <CustomLanguageDropdown direction={'down'}/>
              {/* <!-- User --> */}
              <CustomUserDropdown direction={'down'}/>
              {/* <!--/ User --> */}
            </ul>
          </div>

          {/* <!-- Search Small Screens --> */}
          <div className="navbar-search-wrapper search-input-wrapper container-fluid d-none">
            <input
              type="text"
              className="form-control search-input  border-0"
              placeholder="Search..."
              aria-label="Search..."
            />
            <i className="bx bx-x bx-sm search-toggler cursor-pointer"></i>
          </div>
        </div>
      </nav>
      <main >{props.children}</main>
    </>
  );
};

export default Navbar;
