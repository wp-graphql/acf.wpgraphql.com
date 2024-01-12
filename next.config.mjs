import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        scrollRestoration: true,
    },
    trailingSlash: true,
    images: {
        domains: [getWpHostname()],
    },
};

export default withFaust( withSearch( withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig) ) );