import { SessionProvider, signOut} from 'next-auth/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper, store } from '../store/store'
import { Provider } from 'react-redux'
import {BsFillArrowLeftCircleFill, BsPower} from 'react-icons/bs'
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter();
   const enableBackForRoutes = ['/places', '/map'];
   const backIsEnable = enableBackForRoutes.includes(router.asPath);
   const signOutIsEnable = router.asPath !== '/auth';
   return (
      <div className="container mx-auto max-h-screen">
         <SessionProvider session={pageProps.session}>
            <Provider store={store}>
               <button className={`${backIsEnable ? '' : 'hidden'} text-xl m-5 text-emerald-500 hover:text-emerald-400`} onClick={() => router.back()}>
                  <BsFillArrowLeftCircleFill/>
               </button>
               <Component {...pageProps} />
               <button className={`${signOutIsEnable ? '' : 'hidden'} text-xl m-5 text-emerald-500 hover:text-emerald-400 absolute top-0 right-0`} onClick={() => signOut()}>
        <BsPower/>
    </button>
            </Provider>
         </SessionProvider>
      </div>
   )
}

export default wrapper.withRedux(MyApp)
