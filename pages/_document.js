import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head />
      <body className="bg-white dark:bg-navy font-inter">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
