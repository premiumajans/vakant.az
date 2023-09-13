import Login from "@/Components/Dashboard/Login/Login";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const LoginPage = () => {
  const {t} = useTranslation('common')
  return (
    <>
    <Head>
      <title>{t('login')}</title>
    </Head>
      <Login />
    </>
  );
};

export default LoginPage;


export async function getServerSideProps(context:any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),

    }
  }
}
