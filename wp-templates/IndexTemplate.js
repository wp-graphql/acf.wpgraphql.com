import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { flatListToHierarchical, useFaustQuery } from '@faustwp/core'
import Head from 'next/head'

import { LAYOUT_QUERY, Layout } from '@/components/Layout'
import blocks from '@/wp-blocks'

const INDEX_TEMPLATE_QUERY = gql`
query IndexTemplate($uri: String!) {
    node: nodeByUri(uri: $uri) {
        __typename
        uri
        ...on NodeWithTitle {
            title
        }
        ...on DatabaseIdentifier {
            databaseId
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
`

export const IndexTemplate = () => {
  const faustData = useFaustQuery(INDEX_TEMPLATE_QUERY)
  const layoutData = useFaustQuery(LAYOUT_QUERY);

  if (!faustData?.node || !layoutData) {
    return null
  }

  const node = faustData?.node;

  const { editorBlocks } = node

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
    <>
      <Head>
        <title>{`${node?.title} - WPGraphQL for ACF`}</title>
      </Head>
      <Layout
        title={node?.title ? node.title : 'WPGraphQL for ACF'}
        toc={toc}
        node={node}
        {...layoutData}
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
        {/* <h2>Raw editorBlocks</h2> */}
        {
          /**
           *  uncomment to debug editorBlocks
           *  <pre>{JSON.stringify(node.editorBlocks, null, 2)}</pre>
           */
          // <pre>{JSON.stringify(node, null, 2)}</pre>
        }
      </Layout>
    </>
  )
}

IndexTemplate.queries = [
  {
    query: LAYOUT_QUERY,
  },
  {
    query: INDEX_TEMPLATE_QUERY,
    variables: ({ uri }) => ({ uri }),
  }
];