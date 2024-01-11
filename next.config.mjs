import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: experimentalConfig(),
    trailingSlash: true,
    images: {
        domains: [getWpHostname()],
    },
};

function experimentalConfig() {

    const experimental = {
        scrollRestoration: true,
    }

    if (process.env.ATLAS_CACHE_HANDLER_ENABLED !== undefined) {
        const atlasExperimentalOptions = { ...experimental, ...{
            incrementalCacheHandlerPath: require.resolve('./.atlas/atlas-cache-handler.js'),
            isrMemoryCacheSize: 0
        }}
       console.log( { atlasExperimentalOptions })
       return atlasExperimentalOptions
    }
  
    return experimental
  }
  

export default withFaust( withSearch( withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig) ) );
