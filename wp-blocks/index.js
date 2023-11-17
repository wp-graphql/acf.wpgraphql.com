import { CoreBlocks } from '@faustwp/blocks'

import { CoreHeading } from './CoreHeading'
import { AcfGraphqlQuery } from './AcfGraphqlQuery'
import { AcfFieldTypeSettingsBlock } from './AcfFieldTypeSettingsBlock'
import { AcfFieldTypeConfigurationBlock } from './AcfFieldTypeConfigurationBlock'

const blocks = {
  ...CoreBlocks,
  CoreHeading,
  AcfGraphqlQuery,
  AcfFieldTypeSettingsBlock,
  AcfFieldTypeConfigurationBlock,
}

export default blocks
