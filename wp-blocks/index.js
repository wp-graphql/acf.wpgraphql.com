import { CoreBlocks } from '@faustwp/blocks'

import AcfFieldTypeSettings from './AcfFieldTypeSettings'
import CustomHeading from './CoreHeading'

const blocks = {
  ...CoreBlocks,
  CoreHeading: CustomHeading,
  AcfFieldTypeSettings: AcfFieldTypeSettings,
}

export default blocks
