import { CoreBlocks } from '@faustwp/blocks'

import { AcfFieldTypeSettingsBlock } from './AcfFieldTypeSettingsBlock'
import { AcfGraphqlQuery } from './AcfGraphqlQuery'
import { CoreHeading } from './CoreHeading'

const blocks = {
  ...CoreBlocks,
  CoreHeading,
  AcfFieldTypeSettingsBlock,
  AcfGraphqlQuery,
}

export default blocks
