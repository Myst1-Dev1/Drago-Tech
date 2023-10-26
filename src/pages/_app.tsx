import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductsProvider } from '../services/hooks/useProducts/useProducts';
import { CartProvider } from '../services/hooks/useCart/useCart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </ProductsProvider>
  );
}

export default MyApp;
