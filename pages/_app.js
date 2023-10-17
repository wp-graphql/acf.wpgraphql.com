import '@/faust.config'
import { WordPressBlocksProvider } from '@faustwp/blocks'
import { FaustProvider } from '@faustwp/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import 'focus-visible'
import '@/styles/tailwind.css'
// import '../globalStylesheet.css'
import blocks from '@/wp-blocks'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider config={{ blocks, theme: null }}>
        <Head>
          {router.pathname === '/' ? (
            <title>WPGraphQL</title>
          ) : (
            <title>{`${pageProps?.title} - WPGraphQL`}</title>
          )}
          <meta name="description" content={pageProps?.description} />
        </Head>
        <Component {...pageProps} key={router.asPath} />
      </WordPressBlocksProvider>
    </FaustProvider>
  )
}
