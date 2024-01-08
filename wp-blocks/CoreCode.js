import { CoreBlocks } from '@faustwp/blocks'
import slugify from '@sindresorhus/slugify'
const { CoreCode: FaustCoreCode } = CoreBlocks

export function CoreCode(props) {
  const { attributes } = props


  const customAttributes = {
    ...attributes,
    anchor: !attributes.anchor
      ? slugify(attributes.content)
      : attributes.anchor,
  }
  console.log({attributes, customAttributes});

  return (
    <>
      <FaustCoreCode {...props} attributes={customAttributes} />
    </>
  )
}

CoreCode.displayName = { ...FaustCoreCode.displayName }
CoreCode.config = { ...FaustCoreCode.config }
CoreCode.fragments = { ...FaustCoreCode.fragments }
