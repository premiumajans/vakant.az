import ResetPassword from "@/Components/Dashboard/ResetPassword/ResetPassword";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ResetPasswordPage = () => {
  return (
    <>
      <ResetPassword />
    </>
  );
};

export async function getStaticProps(context:any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),

        }
    }
}


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false
  };
}

export default ResetPasswordPage;




