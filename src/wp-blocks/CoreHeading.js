import { CoreBlocks } from '@faustwp/blocks'
import slugify from '@sindresorhus/slugify'
const { CoreHeading: FaustCoreHeading } = CoreBlocks

export function CoreHeading(props) {
  const { attributes } = props

  const customAttributes = {
    ...attributes,
    anchor: !attributes.anchor
      ? slugify(attributes.content)
      : attributes.anchor,
  }

  return (
    <>
      <FaustCoreHeading {...props} attributes={customAttributes} />
    </>
  )
}

CoreHeading.displayName = { ...FaustCoreHeading.displayName }
CoreHeading.config = { ...FaustCoreHeading.config }
CoreHeading.fragments = { ...FaustCoreHeading.fragments }
