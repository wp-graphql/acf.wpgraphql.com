import { gql } from "@apollo/client"
import { getApolloClient } from "@faustwp/core/dist/mjs/client"
import { getServerSideSitemap } from "next-sitemap"

const client = getApolloClient()

const SITEMAP_QUERY = gql`
query SitemapQuery($after: String) {
    contentNodes(
      where: {
        contentTypes: [
          FIELD_TYPE
          POST
          PAGE
        ]
      }
      first: 50
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        uri
        modifiedGmt
      }
    }
  }
`

async function getAllWPContent(after = null, acc = []) {
    const { data } = await client.query({
        query: SITEMAP_QUERY,
        variables: {
            after,
        },
    })

    acc = [...acc, ...data.contentNodes.nodes]

    if (data.contentNodes.pageInfo.hasNextPage) {
        acc = await getAllWPContent(data.contentNodes.pageInfo.endCursor, acc)
    }

    return acc
}

// Sitemap component
export default function WPSitemap() {}

// collect all the post
export const getServerSideProps = async (ctx) => {
    const nodes = await getAllWPContent()

    const allRoutes = nodes.reduce((acc, node) => {
        if (!node.uri) {
            return acc
        }

        acc.push({
            loc: node.uri,
            lastmod: new Date(node.modifiedGmt).toISOString(),
        })

        return acc
    }, [])

    return await getServerSideSitemap(ctx, allRoutes)
}
