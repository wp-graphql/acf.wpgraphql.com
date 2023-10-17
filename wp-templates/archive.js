import { gql } from '@apollo/client'

import { LayoutArchive } from '@/components/LayoutArchive'

export const Archive = (props) => {
  const { data } = props

  const { node } = data

  if (!node) {
    return null
  }

  return (
    <>
      <h1>Archive</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}

Archive.query = gql`
  query GetArchiveFieldType($uri: String!) {
    node: nodeByUri(uri: $uri) {
      __typename
      uri
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
