import "../styles/globals.scss";
import { AppProps } from "next/app";
import Layout from "../components/layout";
import { AuthCxtProvider } from "../store/authCxt";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthCxtProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthCxtProvider>
  );
}

export default MyApp;
