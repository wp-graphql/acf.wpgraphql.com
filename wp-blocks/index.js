import { CoreBlocks } from '@faustwp/blocks'

import { AcfFieldTypeConfigurationBlock } from './AcfFieldTypeConfigurationBlock'
import { AcfFieldTypeSettingsBlock } from './AcfFieldTypeSettingsBlock'
import { AcfGraphqlQuery } from './AcfGraphqlQuery'
import { CoreCode } from './CoreCode'
import { CoreHeading } from './CoreHeading'
import { CoreQuote } from './CoreQuote'

const blocks = {
  ...CoreBlocks,
  CoreCode,
  CoreHeading,
  CoreQuote,
  AcfGraphqlQuery,
  AcfFieldTypeSettingsBlock,
  AcfFieldTypeConfigurationBlock,
}

export default blocks
