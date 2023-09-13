import MainWraper from "@/Components/Dashboard/MainWraper/MainWraper";
import Row from "@/Components/Dashboard/Row/Row";
import BasicCard from "@/Components/Dashboard/Statistics/BasicCard";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useTranslation} from "next-i18next";
import Link from "next/link";

const Profile = () => {
    const {t} = useTranslation('common')
    return (
        <>
            <Head>
                <title>{t('my-profile')}</title>
            </Head>
            <MainWraper>
                <div className="container-xxl flex-grow-1 container-p-y">
                    {/*<Adress start="" target="Profil"/>*/}
                    <Row>
                            <Link  className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{display:'inline-block'}} href={'/user/my-company'}>
                                <BasicCard
                                    title={t('my-company')}
                                    badge="bg-label-primary rounded p-2"
                                    icon="bx-building bx-sm"
                                />
                            </Link>
                            <Link  className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{display:'inline-block'}} href={'/user/create-new-item'}>
                                <BasicCard
                                    title={t('post-an-ad')}
                                    badge="badge bg-label-success rounded p-2"
                                    icon="bx bx-user bx-sm"
                                />
                            </Link>
                            <Link  className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{display:'inline-block'}} href={'/user/my-items'}>
                                <BasicCard
                                    title={t('my-items')}
                                    badge="bg-label-info rounded p-2"
                                    icon="bx-spreadsheet bx-sm"
                                />
                            </Link>
                            <Link  className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{display:'inline-block'}} href={'/user/security'}>

                                <BasicCard
                                    title={t('security')}
                                    badge="bg-label-danger rounded p-2"
                                    icon="bx-shield-alt bx-sm"
                                />
                            </Link>
                    </Row>
                </div>
            </MainWraper>
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

export default Profile;
