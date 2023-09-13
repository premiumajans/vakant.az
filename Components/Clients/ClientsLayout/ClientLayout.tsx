import Head from "next/head";
import {PropsWithChildren, useEffect} from "react";
import HeaderNav from "@/Components/Clients/HeaderNav/HeaderNav";
import Footer from "@/Components/Clients/Footer/Footer";
import AOS from "aos";

const ClientLayout = ({children}: PropsWithChildren) => {
    useEffect(() => {
        AOS.init();
    },[])


    return <>
        <Head>
            {/*<link rel="stylesheet"    href="/clients/css/style.css"/>*/}
            <link rel="stylesheet" href="/clients/css/open-iconic-bootstrap.min.css"/>
            <link rel="stylesheet" href="/clients/css/magnific-popup.css"/>
            <link rel="stylesheet" href="/clients/css/ionicons.min.css"/>
            <link rel="stylesheet" href="/clients/css/bootstrap-datepicker.css"/>
            <link rel="stylesheet" href="/static/vendor/fonts/fontawesome.css"/>
            <link rel="stylesheet" href="/clients/css/flaticon.css"/>
            <link rel="stylesheet" href="/clients/css/icomoon.css"/>
            <link rel="stylesheet" href="/static/vendor/fonts/flag-icons.css"/>
        </Head>


        <HeaderNav/>
        {children}

        <Footer/>


    </>
};

export default ClientLayout;