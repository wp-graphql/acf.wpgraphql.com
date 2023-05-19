import "../../faust.config";
import Head from 'next/head'
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "../styles/globals.css";
import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import 'focus-visible'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
        <Head>
            {router.pathname === '/' ? (
                <title>WPGraphQL</title>
            ) : (
                <title>{`${pageProps?.title} - WPGraphQL`}</title>
            )}
            <meta name="description" content={pageProps?.description} />
        </Head>
        <Component {...pageProps} key={router.asPath} />
    </FaustProvider>
  );
}
