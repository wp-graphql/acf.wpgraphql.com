import { CoreBlocks } from '@faustwp/blocks'

import { AcfFieldTypeSettingsBlock } from './AcfFieldTypeSettingsBlock'
import CustomHeading from './CoreHeading'

const blocks = {
  ...CoreBlocks,
  CoreHeading: CustomHeading,
  AcfFieldTypeSettingsBlock,
}

export default blocks
