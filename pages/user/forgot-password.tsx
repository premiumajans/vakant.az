import ForgetPassword from "@/Components/Dashboard/ForgotPassword/ForgotPassword";
import { getUser } from "@/Store/Slices/User";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const { push } = useRouter();
  const {
    authorisation: { token },
  } = useSelector(getUser);


  
  return (
    <>
      <ForgetPassword />
    </>
  );
};

export async function getServerSideProps(context:any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),

    }
  }
}

export default ForgotPassword;
