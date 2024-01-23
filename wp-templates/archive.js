import { gql } from '@apollo/client'
import { useFaustQuery } from "@faustwp/core";
import Head from 'next/head'

import { LayoutArchive, GET_LAYOUT_QUERY } from '@/components/LayoutArchive'

const GET_ARCHIVE_QUERY = gql`
  query GetArchive($uri: String!) {
    node: nodeByUri(uri: $uri) {
      __typename
      uri
      ... on ContentType {
        label
      }
      ... on TermNode {
        name
      }
      ... on Category {
        posts {
          nodes {
            title
          }
        }
      }
    }
  }
`

export const Archive = () => {
  const { node } = useFaustQuery(GET_ARCHIVE_QUERY);
  const {
    docsSidebarMenuItems,
    footerMenuItems,
    primaryMenuItems,
    sitewideNotice
  } = useFaustQuery(GET_LAYOUT_QUERY);

  return (
    <>
      <Head>
        <title>{`${node?.name} - WPGraphQL for ACF`}</title>
      </Head>
      <LayoutArchive
        title={node?.name ? node.name : 'Archive'}
        data={{
          node,
          docsSidebarMenuItems,
          footerMenuItems,
          primaryMenuItems,
          sitewideNotice
        }}
      >
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      </LayoutArchive>
    </>
  )
}


Archive.queries = [
  {
    query: GET_LAYOUT_QUERY,
  },
  {
    query: GET_ARCHIVE_QUERY,
    variables: (seedNode) => {
      return {
        uri: seedNode.uri
      }
    }
  }
];
