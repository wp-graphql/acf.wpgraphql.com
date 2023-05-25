import { gql } from "@apollo/client";
import { Layout, LayoutFragment } from "@/components/Layout";

const ArchiveFieldType = props => {

    const { data } = props;

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

    return(
        <Layout 
            title="ArchiveFieldType" 
            data={data} 
            navigation={data?.navigation?.nodes}
            toc={toc}
        >
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </Layout>
    )
};

ArchiveFieldType.query = gql`
query GetArchiveFieldType($uri: String!) {
    node: nodeByUri(uri: $uri) {
        __typename
        uri
    }
    ...LayoutFragment
}
${LayoutFragment}
`;

ArchiveFieldType.variables = ({ uri }) => ({ uri });

export default ArchiveFieldType;