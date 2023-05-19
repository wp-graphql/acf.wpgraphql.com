import { Layout, LayoutFragment } from '@/components/Layout'
import { gql } from '@apollo/client'

const IndexTemplate = ({ data }) => {

    const { node } = data;

    if ( ! node ) {
        return null;
    }

    return (
        <Layout data={data} >
            { node?.title && <h1>{node.title}</h1>}
            { node?.modified && 
                <div id="last-updated" className="text-sm text-gray-500">
                    Last Upated: {new Date(node.modified).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                </div>
            }
            { node.content && 
                <div className='prose dark:prose-invert' dangerouslySetInnerHTML={{ __html: node.content }} />
            }
        </Layout>
    )
}

IndexTemplate.query = gql`
query IndexTemplate($uri: String!) {
    ...LayoutFragment
    node: nodeByUri(uri: $uri) {
        __typename
        ...on NodeWithTitle {
            title
        }
        ...on ContentNode {
            modified
            ...on NodeWithContentEditor {
                content
            }
        }
    }
}
${LayoutFragment}
`

IndexTemplate.variables = ({ uri }) => ({ uri })

export default IndexTemplate