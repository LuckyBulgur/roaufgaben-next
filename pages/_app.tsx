import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import SideBar from '../components/SideBar';


function MyApp({ Component, pageProps }: AppProps) {

  const paths = ["/", "/login", "/register", "/_error"];
  const currentPath = useRouter().pathname;

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