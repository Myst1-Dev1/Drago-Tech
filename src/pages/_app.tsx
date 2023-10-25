import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductsProvider } from '../services/hooks/useProducts/useProducts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ProductsProvider>
  );
}

export default MyApp;
