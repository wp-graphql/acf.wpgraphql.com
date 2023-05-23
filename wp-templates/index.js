import { Layout, LayoutFragment } from '@/components/Layout'
import { gql } from '@apollo/client';
import { SingleFieldType } from './single-field_type';
import IndexTemplate from './IndexTemplate';

// const tableOfContents = [];
// const title = "WPGraphQL";

// const IndexTemplate = (props) => {

//     let tableOfContents = props?.node?.content
//     ? collectHeadings(props?.node?.content)
//     : []

//     return (
//       <Layout title={title} tableOfContents={tableOfContents} {...props}>
//         <pre>{JSON.stringify(props, null, 2)}</pre>
//       </Layout>
//     )
// }

// IndexTemplate.query = gql`
// query IndexTemplate($uri: String!) { 
//     nodeByUri(uri:$uri) {
//         __typename
//         ...on NodeWithContentEditor {
//             content
//         }
//     }
//     ...LayoutFragment
// }
// ${LayoutFragment}
// `

// IndexTemplate.variables = ({ uri }) => ({ uri })



const templates = {
    "index": IndexTemplate,
    'single-field_type': SingleFieldType,
}

export default templates;