import { LayoutFragment, Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { gql } from "@apollo/client";
import { Separator } from "@radix-ui/react-separator";
import slugify from "@sindresorhus/slugify";
import blocks from "@/wp-blocks";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import { flatListToHierarchical } from "@faustwp/core";


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

    const { title, editorBlocks } = node;
    let toc = [];
    
    editorBlocks && editorBlocks.map( block => {
        
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

    const blockList = flatListToHierarchical(editorBlocks, {childrenKey: 'innerBlocks'});

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
            {/* {
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
            } */}
            <WordPressBlocksViewer blocks={blockList} />
            {/* <h2>Raw Blocks List</h2>
            <pre>{JSON.stringify( blockList, null, 2)}</pre>
            <h2>Raw editorBlocks</h2>
            <pre>{JSON.stringify(node.editorBlocks, null, 2)}</pre> */}
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
                id: clientId
                parentId: parentClientId
                ...${blocks.CoreParagraph.fragments.key}
                ...${blocks.CoreColumns.fragments.key}
                ...${blocks.CoreColumn.fragments.key}
                ...${blocks.CoreCode.fragments.key}
                ...${blocks.CoreButtons.fragments.key}
                ...${blocks.CoreButton.fragments.key}
                ...${blocks.CoreQuote.fragments.key}
                ...${blocks.CoreImage.fragments.key}
                ...${blocks.CoreSeparator.fragments.key}
                ...${blocks.CoreList.fragments.key}
                ...${blocks.CoreHeading.fragments.key}
            }
        }
        ...aCFFieldTypeCategoriesFragment
    }
}
${LayoutFragment}
${aCFFieldTypeCategoriesFragment}
${blocks.CoreParagraph.fragments.entry}
${blocks.CoreColumns.fragments.entry}
${blocks.CoreColumn.fragments.entry}
${blocks.CoreCode.fragments.entry}
${blocks.CoreButtons.fragments.entry}
${blocks.CoreButton.fragments.entry}
${blocks.CoreQuote.fragments.entry}
${blocks.CoreImage.fragments.entry}
${blocks.CoreSeparator.fragments.entry}
${blocks.CoreList.fragments.entry}
${blocks.CoreHeading.fragments.entry}
`;

SingleFieldType.variables = ( { uri } ) => ( { uri } );