import { AppProps } from 'next/app';

import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from 'react-toastify';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductsProvider } from '../services/hooks/useProducts/useProducts';
import { CartProvider } from '../services/hooks/useCart/useCart';
import { PaginationProvider } from '../services/hooks/usePagination';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
        <ProductsProvider>
          <CartProvider>
            <PaginationProvider>
              <Header />
              <ToastContainer />
              <Component {...pageProps} />
              <Footer />
            </PaginationProvider>
          </CartProvider>
      </ProductsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
