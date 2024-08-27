import { gql } from '@apollo/client'
import { useFaustQuery } from "@faustwp/core";
import Head from 'next/head'

import { FieldTypesList } from '@/components/FieldTypesList'
import { LayoutArchive, LAYOUT_ARCHIVE_QUERY } from '@/components/LayoutArchive'

export const GET_POST_QUERY = gql`
  query GetPost($uri: String!) {
    node: nodeByUri(uri: $uri) {
      __typename
      uri
      ... on ContentType {
        name
        label
        description
        contentNodes(
          first: 100
          where: { orderby: { field: TITLE, order: ASC } }
        ) {
          nodes {
            __typename
            uri
            id
            ... on FieldType {
              title
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ArchiveFieldType = () => {
  const postData = useFaustQuery(GET_POST_QUERY);
  const layoutData = useFaustQuery(LAYOUT_ARCHIVE_QUERY);

  if (!postData?.node) {
    return null
  }

  if (!layoutData) {
    return null
  }

  const { node } = postData;

  return (
    <>
      <Head>
        <title>{`${node?.label} - WPGraphQL for ACF`}</title>
      </Head>
      <LayoutArchive
        title={node?.label ? node.label : 'WPGraphQL for ACF'}
        data={{
          node,
          ...layoutData
        }}
      >
        <FieldTypesList data={{ node }} />
      </LayoutArchive>
    </>
  )
}

ArchiveFieldType.queries = [
  {
    query: LAYOUT_ARCHIVE_QUERY,
  },
  {
    query: GET_POST_QUERY,
    variables: ({ uri }) => ({ uri }),
  }
];
