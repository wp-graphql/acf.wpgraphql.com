import { Layout, LayoutFragment } from '@/components/Layout'
import { getNodeText } from '@/lib/utils';
import { gql } from '@apollo/client'
import slugify from '@sindresorhus/slugify';
import rehypeParse from 'rehype-parse/lib';
import rehypeStringify from 'rehype-stringify/lib';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const IndexTemplate = ({ data }) => {

    const { node } = data;

    if ( ! node ) {
        return null;
    }

    let toc = [];

    let content = node?.content ? 
    unified()
        .use(rehypeParse, {
            fragment: true,
        })
        .use(() => {
            return (tree) => {
                toc = tree.children;
                visit(tree, 'element', (node) => {
                    if ( node.tagName === 'h2' || node.tagName === 'h3' ) {
                        let title = getNodeText(node);
                        let id = slugify(title)
                        node.properties.id = id;
                    }
                });
            }
        })
        .use(rehypeStringify)
        .processSync(node.content)
    : null;

    return (
        <Layout 
            title={node?.title ? node.title : 'WPGraphQL for ACF' } 
            data={data} 
            navigation={data?.navigation?.nodes}
            toc={toc}
            >
            
            { node?.modified && 
                <div id="last-updated" className="text-sm text-gray-500">
                    Last Upated: {new Date(node.modified).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                </div>
            }
            { node.content && 
                <div 
                    dangerouslySetInnerHTML={{ __html: content }} 
                />
            }
        </Layout>
    )
}

IndexTemplate.query = gql`
query IndexTemplate($uri: String!) {
    ...LayoutFragment
    node: nodeByUri(uri: $uri) {
        __typename
        uri
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