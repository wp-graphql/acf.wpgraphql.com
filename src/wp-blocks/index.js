import { gql } from '@apollo/client'
import { CoreBlocks } from '@faustwp/blocks'

import { AcfFieldTypeConfigurationBlock } from './AcfFieldTypeConfigurationBlock'
import { AcfFieldTypeSettingsBlock } from './AcfFieldTypeSettingsBlock'
import { AcfGraphqlQuery } from './AcfGraphqlQuery'
import { CoreCode } from './CoreCode'
import { CoreHeading } from './CoreHeading'


const blocks = {
  ...CoreBlocks,
  CoreQuote: {
    ...CoreBlocks.CoreQuote,
    fragments: {
      ...CoreBlocks.CoreQuote.fragments,
      key: 'CustomCoreQuoteBlockFragment',
      entry: gql`
      fragment CustomCoreQuoteBlockFragment on CoreQuote {
        attributes {
          textAlign
          anchor
          backgroundColor
          citation
          className
          fontFamily
          fontSize
          gradient
          lock
          style
          textColor
          value
          cssClassName
        }
      }
    `
    }
  },
  CoreCode,
  CoreHeading,
  AcfGraphqlQuery,
  AcfFieldTypeSettingsBlock,
  AcfFieldTypeConfigurationBlock,
}


export default blocks
