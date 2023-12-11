import { withFaust, getWpHostname } from '@faustwp/core';
import nextMDX from '@next/mdx';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const options = {
    theme: 'one-dark-pro',
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        scrollRestoration: true,
    },
    trailingSlash: true,
    images: {
        domains: ['bpacfwpgraphql.wpengine.com'],
    },
};

export default withFaust( withMDX( withSearch( withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig) ) ) );
