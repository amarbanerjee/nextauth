
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { NotificationContextProvider } from '../store/notification-context';
import Context from "../context/context"

function MyApp({ Component, pageProps }) {
  return (

    <NotificationContextProvider>
    <SessionProvider session={pageProps.session}>
      
      <Layout>
        <Context>
        <Component {...pageProps} />
        </Context>
      </Layout>
      
    </SessionProvider>
    </NotificationContextProvider>
    
  );
}

export default MyApp;
