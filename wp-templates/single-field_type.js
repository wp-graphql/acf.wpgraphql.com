import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { flatListToHierarchical } from '@faustwp/core'
import { Separator } from '@radix-ui/react-separator'
import Head from 'next/head'

import { Layout } from '@/components/Layout'
import { Badge } from '@/components/ui/badge'
import blocks from '@/wp-blocks'
import { AcfFieldTypeSettingsBlock } from '@/wp-blocks/AcfFieldTypeSettingsBlock'
import { AcfGraphqlQuery } from '@/wp-blocks/AcfGraphqlQuery'

export const SingleFieldType = ({ data }) => {
  const { node } = data

  if (!node) {
    return null
  }

  const { title, editorBlocks } = node
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

  return (
    <>
      <Head>
        <title>{`${title} - WPGraphQL for ACF`}</title>
      </Head>
      <Layout data={data} navigation={data?.navigation?.nodes} toc={toc}>
        <h1>{title}</h1>
        {node?.aCFFieldTypeCategories && node?.aCFFieldTypeCategories?.nodes && (
          <div id="field-type-categories" className="my-2">
            {node.aCFFieldTypeCategories.nodes.map((fieldTypeCategory) => (
              <Badge key={fieldTypeCategory.id} variant="">
                {fieldTypeCategory.name}
              </Badge>
            ))}
          </div>
        )}
        <Separator className="my-4" />
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
    </>
  )
}

const aCFFieldTypeCategoriesFragment = gql`
  fragment aCFFieldTypeCategoriesFragment on FieldType {
    aCFFieldTypeCategories {
      nodes {
        id
        name
      }
    }
  }
`

SingleFieldType.query = gql`
query SingleAcfFieldType($uri: String!) {
    ...LayoutFragment
    node: nodeByUri(uri: $uri) {
        __typename
        uri
        ...on FieldType {
            title
            # content
            modified
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
                ...AcfFieldTypeSettingsBlockFragment
                ...AcfGraphqlQueryFragment
            }
        }
        ...aCFFieldTypeCategoriesFragment
    }
}
${Layout.fragment}
${aCFFieldTypeCategoriesFragment}
${AcfFieldTypeSettingsBlock.fragments.entry}
${AcfGraphqlQuery.fragments.entry}

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

SingleFieldType.variables = ({ uri }) => ({ uri })
