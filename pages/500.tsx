import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const FourOhFour = () => {
    const { t: translate } = useTranslation('common');
    return (
        <div style={{
            zIndex:10000000,
            background:'white',
            position:"absolute",
            width:'100%',
            height:'100%',
            top:0,
            left:0
        }} className="container-xxl container-p-y">
            <div style={{ textAlign: "center" }} className="misc-wrapper">
                <div className="mt-5">
                    <Link href={'/'}>
                        <Image  data-aos="fade-up"
                            src="/static/img/500.jpg"
                            alt="icon"
                            width="450"
                            height={'450'}
                            className="img-fluid"
                            data-app-light-img="illustrations/girl-with-laptop-light.png"
                            data-app-dark-img="illustrations/girl-with-laptop-dark.html"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FourOhFour;

