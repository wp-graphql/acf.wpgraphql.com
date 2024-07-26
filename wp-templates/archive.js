import { gql } from '@apollo/client'
import Head from 'next/head'

import { LayoutArchive, LAYOUT_ARCHIVE_QUERY } from '@/components/LayoutArchive'
import { useFaustQuery } from '@/lib/getFaustQueryResponse';

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

export const Archive = (props) => {
  const { node } = useFaustQuery(ARCHIVE_QUERY, props);
  const {
    docsSidebarMenuItems,
    footerMenuItems,
    primaryMenuItems,
    sitewideNotice
  } = useFaustQuery(LAYOUT_ARCHIVE_QUERY, props);

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
        __FAUST_QUERIES__={props.__FAUST_QUERIES__}
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
