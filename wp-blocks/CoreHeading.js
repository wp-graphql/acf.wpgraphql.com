import { CoreBlocks } from '@faustwp/blocks'
import slugify from '@sindresorhus/slugify'
const { CoreHeading: FaustCoreHeading } = CoreBlocks

function Component(props) {
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

Component.displayName = { ...FaustCoreHeading.displayName }
Component.config = { ...FaustCoreHeading.config }
Component.fragments = { ...FaustCoreHeading.fragments }

export default Component
