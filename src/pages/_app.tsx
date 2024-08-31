import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Component {...pageProps} />
    </ConvexClientProvider>
  );
}
