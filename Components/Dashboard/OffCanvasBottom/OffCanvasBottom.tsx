import {useTranslation} from "next-i18next";
import Link from "next/link";
import {useEffect, useState} from "react";

const OffCanvasBottom = () => {
    const {t} = useTranslation('common')
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    },[])
    return (
        <>
            <div
                style={{height: 'max-content'}}
                className={"offcanvas offcanvas-bottom " + (show ? 'show' : '')}
                tabIndex={-1}
                id="offcanvasBottom"
                aria-labelledby="offcanvasBottomLabel"
                aria-modal="true"
                role="dialog"
            >
                <div className="offcanvas-header">
                    <h5 id="offcanvasBottomLabel" className="offcanvas-title">
                        {t('companyData')}
                    </h5>
                </div>
                <div className="offcanvas-body">
                    <Link href={'/user/my-company'}>
                        <button type="button" className="btn btn-primary">
                            {t('continue')}
                        </button>
                    </Link>

                </div>
            </div>
            <div className={`offcanvas-backdrop fade ${show ? 'show' : ''}`}></div>
        </>
    );
};

export default OffCanvasBottom;
