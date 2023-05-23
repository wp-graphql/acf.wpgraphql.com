import { LayoutFragment, Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { getNodeText } from "@/lib/utils";
import { gql } from "@apollo/client";
import { Separator } from "@radix-ui/react-separator";
import slugify from "@sindresorhus/slugify";
import rehypeParse from "rehype-parse/lib";
import rehypeStringify from "rehype-stringify/lib";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const nodeContent =`
    <div className="prose dark:prose-invert">
            <h2>Description</h2>
            <h2>Field Settings</h2>
            <h2>Query in GraphQL</h2>
            <pre>{JSON.stringify(node, null, 2)</pre>
        </div>
`;

export const SingleFieldType = ({ data }) => {
    const { node } = data;
    
    console.log( { 
        node
    })

    if ( ! node ) {
        return null;
    }

    const { title } = node;
    let toc = [];

    let content = nodeContent ? 
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
        .processSync(nodeContent)
    : null;

    return (
        <Layout 
            data={data} 
            navigation={data?.navigation?.nodes}
            toc={toc}
            >
            <h1>{title}</h1>
            { node?.aCFFieldTypeCategories && node?.aCFFieldTypeCategories?.nodes && <div id="field-type-categories" className="my-2">
                { node.aCFFieldTypeCategories.nodes.map( fieldTypeCategory => <Badge key={fieldTypeCategory.id} variant="secondary">{fieldTypeCategory.name}</Badge> ) }
            </div>
            }
            <div id="last-updated" className="text-sm text-gray-500">Last Upated: xx-xx-xxxx </div>
            
            <Separator className="my-4" /> 
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </Layout>
    )
}

const aCFFieldTypeCategoriesFragment = gql`
fragment aCFFieldTypeCategoriesFragment on FieldType {
    aCFFieldTypeCategories {
        nodes {
            id
            name
        }
    }
}
`;

SingleFieldType.query = gql`
query SingleAcfFieldType($uri: String!) {
    ...LayoutFragment
    node: nodeByUri(uri: $uri) {
        __typename
        uri
        ...on FieldType {
            title
        }
        ...aCFFieldTypeCategoriesFragment
    }
}
${LayoutFragment}
${aCFFieldTypeCategoriesFragment}
`;

SingleFieldType.variables = ( { uri } ) => ( { uri } );