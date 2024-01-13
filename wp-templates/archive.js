import { gql } from '@apollo/client'
import Head from 'next/head'

import { LayoutArchive } from '@/components/LayoutArchive'

export const Archive = (props) => {
  const { data } = props

  return (
    <>
      <Head>
        <title>{`${data?.node?.name} - WPGraphQL for ACF`}</title>
      </Head>
      <LayoutArchive
        title={data?.node?.name ? data.node.name : 'Archive'}
        data={data}
        navigation={data?.navigation?.nodes}
      >
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      </LayoutArchive>
    </>
  )
}

Archive.query = gql`
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
    ...LayoutArchiveFragment
  }
  ${LayoutArchive.fragment}
`

Archive.variables = (seedNode) => {
  console.log({seedNode});
  return {
    uri: seedNode.uri
  }; 
}
