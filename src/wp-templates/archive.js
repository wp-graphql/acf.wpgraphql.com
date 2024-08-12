import { gql } from '@apollo/client'
import { useFaustQuery } from "@faustwp/core";
import Head from 'next/head'

import { LayoutArchive, LAYOUT_ARCHIVE_QUERY } from '@/components/LayoutArchive'

const ARCHIVE_QUERY = gql`
  query Archive($uri: String!) {
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
  const { node } = useFaustQuery(ARCHIVE_QUERY);
  const {
    docsSidebarMenuItems,
    footerMenuItems,
    primaryMenuItems,
    sitewideNotice
  } = useFaustQuery(LAYOUT_ARCHIVE_QUERY);

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
    query: LAYOUT_ARCHIVE_QUERY,
  },
  {
    query: ARCHIVE_QUERY,
    variables: (seedNode) => {
      return {
        uri: seedNode.uri
      }
    }
  }
];
