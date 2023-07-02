import '@/styles/globals.css'
import { ReactQueryDevtools } from "react-query/devtools";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  // const [queryClient] = useState(() => new QueryClient());


  return (
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <Hydrate state={pageProps.dehydratedState}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </Hydrate>
  </QueryClientProvider>
  )
}
