import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'

const getAtlasCacheHandler = async ( config = {} ) => {
    if (process?.env?.ATLAS_CACHE_HANDLER_ENABLED && process.env.ATLAS_CACHE_HANDLER_ENABLED !== undefined ) {
        return config;
    }
    
    const { atlasCacheHandler } = await import('./.atlas/atlas-cache-handler.js');

    return { ...config, ...{
        incrementalCacheHandlerPath: atlasCacheHandler,
        isrMemoryCacheSize: 0,
    } };
}
  
const nextConfig = () => {
    return {
        reactStrictMode: true,
        pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
        experimental: getAtlasCacheHandler({
            scrollRestoration: true,
        }),
        trailingSlash: true,
        images: {
            domains: [ getWpHostname() ],
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'bpacfwpgraphql.wpengine.com',
                    port: '',
                    pathname: '/**',
                  },
            ]
        },
    }
};


export default withFaust( 
    withSearch( 
        withMarkdoc({
            schemaPath: './src/markdoc' 
        })( nextConfig() ) 
    ) 
);