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
  const archiveData = useFaustQuery(ARCHIVE_QUERY);
  const arciveLayoutData = useFaustQuery(LAYOUT_ARCHIVE_QUERY);

  if ( !archiveData?.node ) {
    return null
  }

  if ( ! arciveLayoutData ) {
    return null
  }

  const { node } = archiveData;

  return (
    <>
      <Head>
        <title>{`${node?.name} - WPGraphQL for ACF`}</title>
      </Head>
      <LayoutArchive
        title={node?.name ? node.name : 'Archive'}
        data={{
          node,
          ...arciveLayoutData
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
