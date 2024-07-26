import { print } from '@apollo/client/utilities';
import { sha256 } from 'js-sha256';

export function useFaustQuery(query, props = null) {
  const sha = sha256(print(query));

  return props?.__FAUST_QUERIES__?.[sha];
}