"use client";

import ModalProvider from "@/src/contexts/Modal.context/Modal.Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense, useState } from "react";

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<div id="Loading"></div>}>
        <ModalProvider>{children}</ModalProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default ProvidersLayout;
