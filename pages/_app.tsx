import '../styles/globals.css';

import Cookies from 'js-cookie';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
    <QueryClientProvider client={new QueryClient()}>
      <Component {...pageProps} />
      {(!paths.includes(currentPath)) && <SideBar />}
    </QueryClientProvider>
  );
}

export default MyApp;