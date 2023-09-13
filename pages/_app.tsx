import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {persistor, store} from "../Store/store";
import {useRouter} from "next/router";
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {createWrapper} from "next-redux-wrapper";
import AdminLayout from "@/Components/Dashboard/AdminLayout/AdminLayout";
import ClientLayout from "@/Components/Clients/ClientsLayout/ClientLayout";
import 'aos/dist/aos.css';
import OffCanvasBottom from "@/Components/Dashboard/OffCanvasBottom/OffCanvasBottom";
import {getUser} from "@/Store/Slices/User";
import {appWithTranslation, useTranslation} from "next-i18next";
import Head from "next/head";
import {useEffect, useState} from "react";
import Loading from "@/Components/Dashboard/Loading/Loading";


function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    const {pathname} = router
    const {company, authorisation} = useSelector(getUser);
    const {i18n} = useTranslation('common')
    const [loading, setLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const link = document.createElement('link');
        const handleLoad = () => {
            setIsLoading(false);
        };

        if (!(pathname.indexOf('user') >= 0)) {

            link.href = "/clients/css/style.css";
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


    }, [pathname]);


    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true)
        };

        const handleRouteComplete = () => {
            setLoading(false)
        };

        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeComplete', handleRouteComplete)// If the component is unmounted, unsubscribe

        const html = document.querySelector('html')!
        if (window) {
            if (window.screenX < 992) {
                html.classList.add('layout-menu-expanded')
            }

        }
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }

    }, [router])


    return (
        <>
            <Head>
                <title>{"Vakant.az"}</title>
                <meta
                    name="description"
                    content="Vakansiyalar"
                />
                <meta name="author" content="Taleh Maharramov, Elgiz Ismayilov"/>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no"
                />
                <meta property="og:site_name" content="Vakant.az"/>
                <meta property="og:locale" content={i18n.language}/>

            </Head>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {" "}
                    {pathname.indexOf('/user') >= 0 ? <AdminLayout>
                            {!company && pathname === '/user/create-new-item' ? <OffCanvasBottom/> : ''}
                            <Component {...pageProps} />

                        </AdminLayout> :
                        loading || isLoading ? <Loading/> : <ClientLayout> <Component {...pageProps} /></ClientLayout>}
                    {" "}
                </PersistGate>
            </Provider>
        </>
    );
}

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(appWithTranslation(App));


