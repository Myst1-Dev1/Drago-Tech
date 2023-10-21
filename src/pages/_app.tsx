import { AppProps } from "next/app";

import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function MyApp({Component, ...pageProps}:AppProps) {

    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}