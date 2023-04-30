import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import '../styles/globals.css';
import { getSingleFood } from './foods/[id]';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1 * 60 * 60 * 1000,
      staleTime: 1 * 60 * 60 * 1000,
    },
  },
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('savedFoods')) {
      const savedFoods = JSON.parse(localStorage.getItem('savedFoods'));
      savedFoods.forEach((foodId) => {
        queryClient.prefetchQuery(['singleFood', foodId], getSingleFood);
      });
    } else {
      localStorage.setItem('savedFoods', JSON.stringify([]));
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
