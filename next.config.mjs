import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'

const getAtlasCacheHandler = async ( config = {} ) => {
    if (process.env.ATLAS_CACHE_HANDLER_ENABLED === undefined) {
        return { ...config };
    }
    
    return { ...config, ...{
        incrementalCacheHandlerPath: await import('./.atlas/atlas-cache-handler.js'),
        isrMemoryCacheSize: 0,
    } };
}
  
const nextConfig = {
        reactStrictMode: true,
        pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
        experimental: {
            scrollRestoration: true,
            ...(await getAtlasCacheHandler()),
        },
        trailingSlash: true,
        images: {
            domains: [ getWpHostname() ],
        },
    };


export default withFaust( 
    withSearch( 
        withMarkdoc({
            schemaPath: './src/markdoc' 
        })( nextConfig ) 
    ) 
);
