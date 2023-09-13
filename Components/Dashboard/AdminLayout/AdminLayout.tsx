import {PropsWithChildren, useEffect, useState} from 'react';
import Head from "next/head";
import Script from "next/script";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setInitialUser} from "@/Store/Slices/User";
import {useRouter} from "next/router";
import jwt_decode from "jwt-decode";
import {useRefreshMutation} from "@/Store/Query/Auth";
import Swal from "sweetalert2";
import {useTranslation} from "next-i18next";
import Loading from "@/Components/Dashboard/Loading/Loading";



const AdminLayout = ({children}: PropsWithChildren) => {
    const {t} = useTranslation('common')

    const user = useSelector(getUser);
    const {pathname, push} = useRouter();
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()
    const {company, authorisation} = useSelector(getUser);
    const router = useRouter();
    const [refresh, {}] = useRefreshMutation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!(user?.authorisation?.token.length > 0)) {
            if (
                pathname !== "/user/login" &&
                pathname !== "/user/register" &&
                pathname !== "/user/forgot-password" &&
                !pathname.startsWith("/user/reset-password")
            ) {

                setShow(false)
                push("login");
            }
        } else {
            if (
                pathname === "/user/login" ||
                pathname === "/user/register" ||
                pathname === "/user/forgot-password" ||
                pathname.startsWith("/user/reset-password")
            ) {
                setShow(false)
                push('/user/profile');
            }
        }

        return () => {
            setShow(true)
        }
    }, [pathname, push, user?.authorisation?.token]);


    useEffect(() => {
        let interval
        if(authorisation.token) {
            const checkTokenExpiry = () => {
                const decodedToken = jwt_decode(authorisation?.token);
                const expirationDate = new Date(decodedToken?.exp * 1000).getTime();
                const currentTime = Date.now()
                if (+expirationDate <= +currentTime) {
                    Swal.fire(`${t('token_is_expired')}`, "", "error")
                        .then(() => {
                            dispatch(setInitialUser());
                            router.push("login");
                        })

                }
            };

            interval = setInterval(checkTokenExpiry, 1000); // Check every second
        }

        return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
        };
    }, [authorisation?.token]);


    useEffect(() => {
        const link = document.createElement('link');
        const handleLoad = () => {
            setIsLoading(false);
        };

        if ((pathname.indexOf('user') >= 0)) {

            link.href = "/static/vendor/css/rtl/core.css";
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.media = 'all';
            link.addEventListener('load', handleLoad);
            document.head.appendChild(link);
            return () => {
                link.removeEventListener('load', handleLoad);
                document.head.removeChild(link);
                setIsLoading(true)
            };
        }


    }, []);

 


    return <>
        <Head>
            {/*<link rel="stylesheet" href="/static/vendor/css/rtl/core.css"/>*/}
            <link rel="stylesheet" href="/static/vendor/css/rtl/theme-default.css"/>
            <link rel="stylesheet" href="/static/vendor/fonts/boxicons.css"/>
            <link rel="stylesheet" href="/static/vendor/fonts/fontawesome.css"/>
            <link rel="stylesheet" href="/static/vendor/fonts/flag-icons.css"/>
            <link rel="stylesheet" href="/static/vendor/libs/typeahead-js/typeahead.css"/>
            <link rel="stylesheet" href="/static/vendor/libs/typeahead-js/typeahead.css"/>
            <link rel="stylesheet" href="/static/vendor/libs/formvalidation/dist/css/formValidation.min.css"/>

            <link rel="stylesheet" href="/static/vendor/css/pages/page-auth.css"/>

            <meta charSet="utf-8"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
            />


            {/* <!-- Fonts --> */}
            <link rel="preconnect" href="https://fonts.googleapis.com/"/>
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com/"
                crossOrigin="anonymous"
            />


            <script defer src="/static/vendor/libs/jquery/jquery.js"></script>

            <script defer src="/static/vendor/libs/popper/popper.js"></script>
            <script defer src="/static/vendor/js/bootstrap.js"></script>
            <script
                defer
                src="/static/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"
            ></script>

            <script defer src="/static/vendor/libs/hammer/hammer.js"></script>
            <script
                defer
                src="/static/vendor/libs/typeahead-js/typeahead.js"
            ></script>

            <script defer src="/static/vendor/js/menu.js"></script>



            <script defer src="/static/js/pages-auth.js"></script>

            {/* <!-- Helpers --> */}
            <script defer src="/static/vendor/js/helpers.js"></script>
            <script defer src="/static/form-editor.init.js"></script>
        </Head>
        <Script id="Google-Tag-Manager">
            {
                "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='../../../../www.googletagmanager.com/gtm5445.html?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5DDHKGP');"
            }
        </Script>

        {show ? isLoading ? <Loading/> : <main>{children}</main>  : ''}


    </>
};

export default AdminLayout;