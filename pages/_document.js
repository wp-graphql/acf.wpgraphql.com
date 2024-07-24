import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head />
      <body className="font-inter bg-white dark:bg-navy">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
