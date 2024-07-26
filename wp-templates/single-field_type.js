import { gql } from '@apollo/client';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';
import { Separator } from '@radix-ui/react-separator';

import EditPost from '@/components/EditPost';
import { Layout, LAYOUT_QUERY } from '@/components/Layout';
import OpenGraph from '@/components/OpenGraph';
import { Badge } from '@/components/ui/badge';
import { useFaustQuery } from '@/lib/getFaustQueryResponse';
import blocks from '@/wp-blocks';
import { AcfFieldTypeConfigurationBlock } from '@/wp-blocks/AcfFieldTypeConfigurationBlock';
import { AcfFieldTypeSettingsBlock } from '@/wp-blocks/AcfFieldTypeSettingsBlock';
import { AcfGraphqlQuery } from '@/wp-blocks/AcfGraphqlQuery';

const aCFFieldTypeCategoriesFragment = gql`
  fragment aCFFieldTypeCategoriesFragment on FieldType {
    aCFFieldTypeCategories {
      nodes {
        id
        name
      }
    }
  }
`;

const SINGLE_ACF_FIELD_TYPE_QUERY = gql`
  query SingleAcfFieldType($uri: String!) {
    node: nodeByUri(uri: $uri) {
      __typename
      uri
      id
      ...on FieldType {
        databaseId
        title
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
      ...OpenGraph
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
  ${OpenGraph.fragments.contentNode}
`;

export const SingleFieldType = (props) => {
  const response = useFaustQuery(SINGLE_ACF_FIELD_TYPE_QUERY, props);
  const node = response?.node;

  if (!node) return null;

  const { title, editorBlocks } = node;
  let toc = [];

  if (editorBlocks) {
    editorBlocks.forEach(block => {
      if (block.attributes?.level === 2 || block.attributes?.level === 3) {
        toc.push({
          tagName: `h${block.attributes.level}`,
          children: [{ type: 'text', value: block.attributes.content }],
        });
      }
    });
  }

  const blockList = flatListToHierarchical(editorBlocks, {
    childrenKey: 'innerBlocks',
  });

  return (
    <>
      <OpenGraph seo={node?.seo} />
      <Layout node={node} toc={toc}>
        <EditPost post={node}>
          <h1>{title}</h1>
        </EditPost>
        {node?.aCFFieldTypeCategories?.nodes && (
          <div id="field-type-categories" className="my-2">
            {node.aCFFieldTypeCategories.nodes.map(fieldTypeCategory => (
              <Badge key={fieldTypeCategory.id} variant="">
                {fieldTypeCategory.name}
              </Badge>
            ))}
          </div>
        )}
        <Separator className="my-4" />
        {node?.modified && (
          <div id="last-updated" className="text-sm text-gray-500">
            Last Updated: {new Date(node.modified).toLocaleDateString('en-us', {
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
  );
};

SingleFieldType.queries = [
  {
    query: LAYOUT_QUERY,
  },
  {
    query: SINGLE_ACF_FIELD_TYPE_QUERY,
    variables: ({ uri }) => ({ uri }),
  },
];
