import { gql } from '@apollo/client'
import Head from 'next/head'
import { useFaustQuery } from '@faustwp/core';

import { FieldTypesList } from '@/components/FieldTypesList'
import { LayoutArchive } from '@/components/LayoutArchive'

export const GET_LAYOUT_QUERY = gql`
  query GetLayout {
    ...LayoutArchiveFragment
  }
  ${LayoutArchive.fragment}
`;

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
  const { data } = props
console.log({data});
  const { node } = useFaustQuery(GET_POST_QUERY);
  const { primaryMenuItems, footerMenuItems, docsSidebarMenuItems } = useFaustQuery(GET_LAYOUT_QUERY);

  if (!node) {
    return null
  }

  let toc = []

  console.log({primaryMenuItems, footerMenuItems, docsSidebarMenuItems});


  return (
    <>
      <Head>
        <title>{`${data?.node?.label} - WPGraphQL for ACF`}</title>
      </Head>
      <LayoutArchive
        title={data?.node?.label ? data.node.label : 'WPGraphQL for ACF'}
        data={data}
        navigation={data?.navigation?.nodes}
        toc={toc}
      >
        <FieldTypesList data={data} />
      </LayoutArchive>
    </>
  )
}

ArchiveFieldType.queries = [
  {
    query: GET_LAYOUT_QUERY,
  },
  {
    query: GET_POST_QUERY,
    variables: ({ uri }) => ({ uri }),
  }
];

ArchiveFieldType.variables = ({ uri }) => ({ uri })
