import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductsProvider } from '../services/hooks/useProducts/useProducts';
import { CartProvider } from '../services/hooks/useCart/useCart';
import { PaginationProvider } from '../services/hooks/usePagination';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <CartProvider>
        <PaginationProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </PaginationProvider>
      </CartProvider>
    </ProductsProvider>
  );
}

export default MyApp;
