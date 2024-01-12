import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'

function experimentalConfig() {

    const experimental = {
        scrollRestoration: true,
    }

    if (process.env.ATLAS_CACHE_HANDLER_ENABLED === undefined) {
        const atlasExperimentalOptions = { ...experimental, ...{
            // instead of require.resolve, use createRequire 
            // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve
            // see: 
            incrementalCacheHandlerPath: import.meta.resolve( './.atlas/atlas-cache-handler.js' ),
            isrMemoryCacheSize: 0
        }}
        return atlasExperimentalOptions
    }
  
    return experimental
}
  
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: experimentalConfig(),
    trailingSlash: true,
    images: {
        domains: [getWpHostname()],
    },
};


  

export default withFaust( withSearch( withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig) ) );
