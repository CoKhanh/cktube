'use client'

import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </ConvexClientProvider>
  );
}
