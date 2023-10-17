import { CoreBlocks } from '@faustwp/blocks'
import CustomHeading from './CoreHeading'
import AcfFieldTypeSettings from './AcfFieldTypeSettings'

export default {
  ...CoreBlocks,
  CoreHeading: CustomHeading,
  AcfFieldTypeSettings: AcfFieldTypeSettings,
}
