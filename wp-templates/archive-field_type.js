import { gql } from '@apollo/client'
import Head from 'next/head'

import { FieldTypesList } from '@/components/FieldTypesList'
import { LayoutArchive, LAYOUT_ARCHIVE_QUERY } from '@/components/LayoutArchive'
import { useFaustQuery } from '@/lib/getFaustQueryResponse';

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

export const ArchiveFieldType = (props) => {
  const response = useFaustQuery(GET_POST_QUERY, props);
  const node = response?.node;

  const {
    docsSidebarMenuItems,
    footerMenuItems,
    primaryMenuItems,
    sitewideNotice
  } = useFaustQuery(LAYOUT_ARCHIVE_QUERY, props);

  if (!node) {
    return null
  }

  return (
    <>
      <Head>
        <title>{`${node?.label} - WPGraphQL for ACF`}</title>
      </Head>
      <LayoutArchive
        title={node?.label ? node.label : 'WPGraphQL for ACF'}
        data={{
          node,
          docsSidebarMenuItems,
          footerMenuItems,
          primaryMenuItems,
          sitewideNotice
        }}
        __FAUST_QUERIES__={props.__FAUST_QUERIES__}
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
