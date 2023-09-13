import Link from "next/link";
import {useTranslation} from "next-i18next";

const PageTitle = ({address,title}:{address:string,title:string}) => {
    const {t} = useTranslation('common')
    return <>
        <div data-aos="fade-up" className="col-md-12 text-center mb-5 "><p
            className="breadcrumbs mb-0"><span className="mr-3"><Link href="/"> {t('home-page')} <i
            className="ion-ios-arrow-forward"></i></Link></span> <span>{address}</span></p><h1 className="mb-3 bread">{title}
            </h1></div>
    </>
};

export default PageTitle;