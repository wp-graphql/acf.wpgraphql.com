import { withFaust, getWpHostname } from '@faustwp/core';
import withMarkdoc from '@markdoc/next.js'
import withSearch from './markdoc/search.mjs'

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        scrollRestoration: true,
        incrementalCacheHandlerPath: atlas_cache_handler(),
        isrMemoryCacheSize: 0
    },
    trailingSlash: true,
    images: {
        domains: [getWpHostname()],
    },
};

function atlas_cache_handler() {
    if (process.env.ATLAS_CACHE_HANDLER_ENABLED !== undefined) {
      return {
        incrementalCacheHandlerPath: require.resolve('./.atlas/atlas-cache-handler.js'),
        isrMemoryCacheSize: 0
      }
    }
  
    return undefined
  }
  

export default withFaust( withSearch( withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig) ) );
