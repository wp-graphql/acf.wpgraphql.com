import { setConfig } from '@faustwp/core'
import templates from '@/wp-templates/index.js'
import possibleTypes from './possibleTypes.json'
import PersistedQueriesPlugin from './plugins/PersistedQueriesPlugin'
import TempPersistedQueriesFixPlugin from './plugins/TempPersistedQueriesFixPlugin'

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [
    // new TempPersistedQueriesFixPlugin(),
    // new PersistedQueriesPlugin(),
  ],
  usePersistedQueries: true,
  possibleTypes,
})
