import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'
import atlasCacheHandler from './.atlas/atlas-cache-handler.js'

function experimentalConfig() {

    const experimental = {
        scrollRestoration: true,
    }

    if (process.env.ATLAS_CACHE_HANDLER_ENABLED !== undefined) {
        const atlasExperimentalOptions = { ...experimental, ...{
            incrementalCacheHandlerPath: atlasCacheHandler,
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
