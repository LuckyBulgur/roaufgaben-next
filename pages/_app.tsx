import '../styles/globals.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import SideBar from '../components/SideBar';


function MyApp({ Component, pageProps }: AppProps) {

  const paths = ["/", "/login", "/register", "/_error"];
  const currentPath = useRouter().pathname;
  return (
    <QueryClientProvider client={new QueryClient()}>
      {(!paths.includes(currentPath)) && <SideBar />}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;