import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'
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
    swcMinify: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        scrollRestoration: true,
    },
    images: {
        domains: [ getWpHostname() ],
    },
    headers: async () => await getHeaders(),
    reactStrictMode: false,
};


const finalConfig = withAtlasConfig(
    withFaust(
        withSearch(
            withMarkdoc({
                schemaPath: './src/markdoc'
            })( nextConfig )
        )
));

// Log the final configuration to debug
console.log("Final Next.js Configuration:", finalConfig);



export default finalConfig;
