import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'
import { withAtlasConfig } from "@wpengine/atlas-next"

const getHeaders = async () => {
    return [
        {
            source: "/:path*",
            headers: [
                {
                    key: "Content-Security-Policy",
                    value: "frame-ancestors 'self' *.wpgraphql.com",
                },
            ],
        },
    ];
}

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        scrollRestoration: true,
    },
    trailingSlash: true,
    images: {
        domains: [ getWpHostname() ],
    },
    headers: async () => await getHeaders(),
};


export default withAtlasConfig(
    withFaust(
        withSearch(
            withMarkdoc({
                schemaPath: './src/markdoc'
            })( nextConfig )
        )
));
