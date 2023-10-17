import { gql } from '@apollo/client'

import { FieldTypesList } from '@/components/FieldTypesList'
import { LayoutArchive } from '@/components/LayoutArchive'

export const ArchiveFieldType = (props) => {
  const { data } = props

  const { node } = data

  if (!node) {
    return null
  }

  let toc = []

  return (
    <LayoutArchive
      title={data?.node?.label ? data.node.label : 'WPGraphQL for ACF'}
      data={data}
      navigation={data?.navigation?.nodes}
      toc={toc}
    >
      <FieldTypesList data={data} />
      {/* { data?.node?.contentNodes && data.node.contentNodes.nodes.map( (node, i) => {
                return (
                    <div key={node.id}>
                        <Link className="text-blue-500 hover:text-blue-700" href={node.uri}>{node.title}</Link>
                    </div>
                )
            })} */}
    </LayoutArchive>
  )
}

ArchiveFieldType.query = gql`
  query GetArchiveFieldType($uri: String!) {
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
    ...LayoutArchiveFragment
  }
  ${LayoutArchive.fragment}
`

ArchiveFieldType.variables = ({ uri }) => ({ uri })
