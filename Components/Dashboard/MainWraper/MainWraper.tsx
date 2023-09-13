import React, { PropsWithChildren } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import Navbar from '../Navbar/Navbar'

const MainWraper = ({children}:PropsWithChildren) => {
  return (
    <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
    <div className="layout-container">
      <Navbar>
        <MainMenu />
        {children}
      </Navbar>
    </div>
  </div>
  )
}





export default MainWraper