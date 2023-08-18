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




// const nodeContent =`
//     <div className="prose dark:prose-invert">
//             <h2>Description</h2>
//             <h2>Field Settings</h2>
//             <h2>Query in GraphQL</h2>
//             <pre>{JSON.stringify(node, null, 2)</pre>
//         </div>
// `;

export const SingleFieldType = ({ data }) => {
    const { node } = data;
    
    if ( ! node ) {
        return null;
    }

    const { title } = node;
    let toc = [];
    
    node.editorBlocks && node.editorBlocks.map( block => {
        
        if ( ! block.attributes || ! block.attributes.level ) {
            return null;
        }

        if ( block.attributes.level === 2 || block.attributes.level === 3 ) {
            let id = slugify( block.attributes.content );
            let heading = {
                tagName: `h${block.attributes.level}`,
                children: [{
                    type: 'text',
                    value: block.attributes.content
                }],
            }
            toc.push( heading )
        }    
    });


    return (
        <Layout 
            data={data} 
            navigation={data?.navigation?.nodes}
            toc={toc}
            >
            <h1>{title}</h1>
            { node?.aCFFieldTypeCategories && node?.aCFFieldTypeCategories?.nodes && <div id="field-type-categories" className="my-2">
                { node.aCFFieldTypeCategories.nodes.map( fieldTypeCategory => <Badge key={fieldTypeCategory.id} variant="">{fieldTypeCategory.name}</Badge> ) }
            </div>
            }
            <Separator className="my-4" /> 
            { node?.modified && 
                <div id="last-updated" className="text-sm text-gray-500">
                    Last Upated: {new Date(node.modified).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                </div>
            }
            {
                node.editorBlocks && node.editorBlocks.map( ( block, i ) => {
                    switch( block.__typename ) {
                        case 'CoreHeading':
                            let Tag = `h${block.attributes.level}`;
                            return (
                                <Tag key={i} id={slugify(block.attributes.content)}>
                                    {block.attributes.content}
                                </Tag>
                            );
                            break;
                        case 'AcfTestBlock': 
                                return <pre>{JSON.stringify(block, null, 2)}</pre>
                        default:
                            return <span key={i} dangerouslySetInnerHTML={{ __html: block.renderedHtml }} />;
                            break;
                    }
                })
            }
            <h2>Raw editorBlocks</h2>
            {
                /**
                 *  uncomment to debug editorBlocks
                 *  <pre>{JSON.stringify(node.editorBlocks, null, 2)}</pre>
                 */
            }
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
            # content
            modified
            editorBlocks {
                __typename
                name
                renderedHtml
                ...on CoreHeading {
                    attributes {
                        level
                        content
                    }
                }
            }
        }
        ...aCFFieldTypeCategoriesFragment
    }
}
${LayoutFragment}
${aCFFieldTypeCategoriesFragment}
`;

SingleFieldType.variables = ( { uri } ) => ( { uri } );