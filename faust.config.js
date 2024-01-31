import { setConfig } from '@faustwp/core'

import possibleTypes from './possibleTypes.json'

import templates from '@/wp-templates/index.js'

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [],
  usePersistedQueries: true,
  possibleTypes,
  experimentalToolbar: true,
})
