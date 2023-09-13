import MainWraper from "@/Components/Dashboard/MainWraper/MainWraper";
import NewItemForm from "@/Components/Dashboard/NewItemForm/NewItemForm";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Edit = () => {

    return (
        <MainWraper>
            <NewItemForm/>
        </MainWraper>
    );
};

export default Edit;

export async function getServerSideProps(context:any) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),

        }
    }
}


