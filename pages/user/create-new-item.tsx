import MainWraper from "@/Components/Dashboard/MainWraper/MainWraper";
import NewItemForm from "@/Components/Dashboard/NewItemForm/NewItemForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";

const CreateNewItem = () => {
  const {t:translate} = useTranslation('common')


  return (
    <>
      <Head>
          <title>{translate("post-an-ad")}</title>
        </Head>
     <MainWraper>
         <NewItemForm/>
     </MainWraper>
   
    </>
  );
};

export default CreateNewItem;



export async function getServerSideProps(context:any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),

        }
    }
}
