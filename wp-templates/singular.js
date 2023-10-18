import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { flatListToHierarchical } from '@faustwp/core'

import { Layout } from '@/components/Layout'
import blocks from '@/wp-blocks'

export const Singular = ({ data }) => {
  const myNode = data?.node

  if (!myNode) {
    return null
  }

  const { editorBlocks } = myNode

  let toc = []

  editorBlocks &&
    editorBlocks.map((block) => {
      if (!block.attributes || !block.attributes.level) {
        return null
      }

      if (block.attributes.level === 2 || block.attributes.level === 3) {
        let heading = {
          tagName: `h${block.attributes.level}`,
          children: [
            {
              type: 'text',
              value: block.attributes.content,
            },
          ],
        }
        toc.push(heading)
      }
    })

  const blockList = flatListToHierarchical(editorBlocks, {
    childrenKey: 'innerBlocks',
  })

  // eslint-disable-next-line no-console
  console.log({
    editorBlocks,
    blockList,
  })

  return (
    <Layout
      title={node?.title ? node.title : 'WPGraphQL for ACF'}
      data={data}
      navigation={data?.navigation?.nodes}
      toc={toc}
    >
      {node?.modified && (
        <div id="last-updated" className="text-sm text-gray-500">
          Last Upated:{' '}
          {new Date(node.modified).toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      )}
      <WordPressBlocksViewer blocks={blockList} />
    </Layout>
  )
}

Singular.query = gql`
query SingularTemplate($id: ID!, $asPreview: Boolean = false) {
    node: post(id: $id, idType: URI, asPreview: $asPreview) {
        __typename
        uri
        ...on NodeWithTitle {
            title
        }
        ...on NodeWithEditorBlocks {
            editorBlocks {
                __typename
                name
                renderedHtml
                id: clientId
                parentId: parentClientId
                ...${blocks.CoreParagraph.fragments.key}
                ...${blocks.CoreColumns.fragments.key}
                ...${blocks.CoreColumn.fragments.key}
                ...${blocks.CoreCode.fragments.key}
                ...${blocks.CoreButtons.fragments.key}
                ...${blocks.CoreButton.fragments.key}
                ...${blocks.CoreQuote.fragments.key}
                ...${blocks.CoreImage.fragments.key}
                ...${blocks.CoreSeparator.fragments.key}
                ...${blocks.CoreList.fragments.key}
                ...${blocks.CoreHeading.fragments.key}
            }
        }
        ...on ContentNode {
            modified
            ...on NodeWithContentEditor {
                content
            }
        }
    }
    ...LayoutFragment
}
${blocks.CoreParagraph.fragments.entry}
${blocks.CoreColumns.fragments.entry}
${blocks.CoreColumn.fragments.entry}
${blocks.CoreCode.fragments.entry}
${blocks.CoreButtons.fragments.entry}
${blocks.CoreButton.fragments.entry}
${blocks.CoreQuote.fragments.entry}
${blocks.CoreImage.fragments.entry}
${blocks.CoreSeparator.fragments.entry}
${blocks.CoreList.fragments.entry}
${blocks.CoreHeading.fragments.entry}
${Layout.fragment}
`

Singular.variables = ({ uri, asPreview }) => {
  return {
    id: uri,
    asPreview
  }
}
