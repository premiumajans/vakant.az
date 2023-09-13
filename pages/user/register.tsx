import Register from '@/Components/Dashboard/Register/Register'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const register = () => {
  return <>
  <Register/>
  </>
}

export default register


export async function getServerSideProps(context:any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),

    }
  }
}
