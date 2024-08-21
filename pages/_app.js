import '@/faust.config'
import React from 'react'

import { WordPressBlocksProvider } from '@faustwp/blocks'
import { FaustProvider } from '@faustwp/core'
import Head from 'next/head'

import 'focus-visible'
import '@/styles/tailwind.css'
import '../globalStylesheet.css'
import { SearchProvider } from '@/components/Search'
import { ThemeProvider } from '@/components/ThemeProvider'
import blocks from '@/wp-blocks'

import '@faustwp/core/dist/css/toolbar.css';

export default function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SearchProvider>
        <FaustProvider pageProps={pageProps}>
          <WordPressBlocksProvider config={{ blocks, theme: null }}>
            <Head>
              {router.pathname === '/' ? (
                <title>WPGraphQL for ACF</title>
              ) : (
                <title>{`${pageProps?.title} - WPGraphQL for ACF`}</title>
              )}
              <meta name="description" content={pageProps?.description} />
            </Head>
            <Component {...pageProps} key={router.asPath} />
          </WordPressBlocksProvider>
        </FaustProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}
