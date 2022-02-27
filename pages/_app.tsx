import '../styles/globals.css';

import Cookies from 'js-cookie';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { QueryClient, QueryClientProvider } from 'react-query';

import BottomBar from '../components/BottomBar';
import SideBar from '../components/SideBar';

const { publicRuntimeConfig } = getConfig()

function MyApp({ Component, pageProps }: AppProps) {

  const paths = ["/", "/login", "/register", "/_error"];
  const router = useRouter();
  const currentPath = router.pathname;

  const checkIsUserLoggedIn = useCallback(async () => {
    if (!paths.includes(currentPath)) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
      const data = await fetch(`${publicRuntimeConfig.serverUrl}/user`, { headers });
      const json = await data.json();
      if (json.message == "Unauthorized") {
        router.push('/login');
      }
    }
  }, []);

  useEffect(() => {
    checkIsUserLoggedIn();
  }, [checkIsUserLoggedIn]);

  return (
    <>
      <Head>
        <title>ROaufgaben</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Verwalte deine Schulaufgaben ganz einfach" />
        <meta name="theme-color" content="#0f2027"></meta>
      </Head>
      <QueryClientProvider client={new QueryClient()}>
        <Component {...pageProps} />
        {(!paths.includes(currentPath)) && (!isMobile) ? < SideBar /> : <BottomBar />}
      </QueryClientProvider>
    </>
  );
}

export default MyApp;