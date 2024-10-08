import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { flatListToHierarchical, useFaustQuery } from '@faustwp/core'
import { Separator } from '@radix-ui/react-separator'
import Head from 'next/head'

import EditPost from '@/components/EditPost'
import { Layout, LAYOUT_QUERY } from '@/components/Layout'
import { Badge } from '@/components/ui/badge'
import blocks from '@/wp-blocks'
import { AcfFieldTypeConfigurationBlock } from '@/wp-blocks/AcfFieldTypeConfigurationBlock'
import { AcfFieldTypeSettingsBlock } from '@/wp-blocks/AcfFieldTypeSettingsBlock'
import { AcfGraphqlQuery } from '@/wp-blocks/AcfGraphqlQuery'

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

const SINGLE_ACF_FIELD_TYPE_QUERY = gql`
query SingleAcfFieldType($uri: String!) {
    node: nodeByUri(uri: $uri) {
        __typename
        uri
        id
        ...on FieldType {
            databaseId
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
                ...${AcfFieldTypeSettingsBlock.fragments.key}
                ...${AcfFieldTypeConfigurationBlock.fragments.key}
                ...${AcfGraphqlQuery.fragments.key}
            }
        }
        ...aCFFieldTypeCategoriesFragment
    }
}
${aCFFieldTypeCategoriesFragment}
${AcfFieldTypeSettingsBlock.fragments.entry}
${AcfFieldTypeConfigurationBlock.fragments.entry}
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

export const SingleFieldType = () => {

  const acfFieldData = useFaustQuery(SINGLE_ACF_FIELD_TYPE_QUERY)
  const layoutData = useFaustQuery(LAYOUT_QUERY);
  if (!acfFieldData?.node) {
    return null
  }

  if (!layoutData) {
    return null
  }

  const { node } = acfFieldData;

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

  console.log(  {
    blockList
  })

  return (
    <>
      <Head>
        <title>{`${title} - WPGraphQL for ACF`}</title>
      </Head>
      <Layout
          node={node}
          toc={toc}
          {...layoutData}
      >
        <EditPost post={node}><h1>{title}</h1></EditPost>
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

SingleFieldType.queries = [
  {
    query: LAYOUT_QUERY,
  },
  {
    query: SINGLE_ACF_FIELD_TYPE_QUERY,
    variables: ({ uri }) => ({ uri }),
  },
];