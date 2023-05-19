import { withFaust, getWpHostname } from '@faustwp/core';
import nextMDX from '@next/mdx'
import { remarkPlugins } from './mdx/remark.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'
import { recmaPlugins } from './mdx/recma.mjs'

const withMDX = nextMDX({
    options: {
        remarkPlugins,
        rehypePlugins,
        recmaPlugins,
        providerImportSource: '@mdx-js/react',
    },
})

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

export default withFaust( withMDX( nextConfig ) );
