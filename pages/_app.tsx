import '../styles/globals.css';

import Cookies from 'js-cookie';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import SideBar from '../components/SideBar';

const { publicRuntimeConfig } = getConfig()

function MyApp({ Component, pageProps }: AppProps) {

  const paths = ["/", "/login", "/register", "/_error"];
  const currentPath = useRouter().pathname;
  const router = useRouter();

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  const checkIsUserLoggedIn = async () => {
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
  }

  return (
    <>
      <Head>
        <title>ROaufgaben</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Verwalte deine Schulaufgaben ganz einfach" />
      </Head>
      <QueryClientProvider client={new QueryClient()}>
        {(!paths.includes(currentPath)) && <SideBar />}
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;