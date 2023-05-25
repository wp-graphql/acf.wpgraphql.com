import { setConfig } from "@faustwp/core";
import templates from "@/wp-templates/index.js";
import possibleTypes from "./possibleTypes.json";
import PersistedQueriesPlugin from "./plugins/PersistedQueriesPlugin";

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [new PersistedQueriesPlugin()],
  possibleTypes,
});
