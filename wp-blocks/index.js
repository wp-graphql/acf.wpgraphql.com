import { CoreBlocks } from '@faustwp/blocks'

import { AcfFieldTypeConfigurationBlock } from './AcfFieldTypeConfigurationBlock'
import { AcfFieldTypeSettingsBlock } from './AcfFieldTypeSettingsBlock'
import { AcfGraphqlQuery } from './AcfGraphqlQuery'
import { CoreHeading } from './CoreHeading'
import { CoreCode } from './CoreCode'

const blocks = {
  ...CoreBlocks,
  CoreCode,
  CoreHeading,
  AcfGraphqlQuery,
  AcfFieldTypeSettingsBlock,
  AcfFieldTypeConfigurationBlock,
}

export default blocks
