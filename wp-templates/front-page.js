import { gql } from "@apollo/client"
import { LayoutFrontPage } from "@/components/LayoutFrontPage";
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Faqs } from '@/components/Faqs'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { FieldTypes, FieldTypesFragment } from '@/components/FieldTypes'
import { Hero } from '@/components/Hero'

export const FrontPage = ({ data }) => {
    return (
        <LayoutFrontPage>
            <Hero />
            <PrimaryFeatures />
            <SecondaryFeatures />
            <FieldTypes data={data} />
            <Faqs />
        </LayoutFrontPage>
    )
}

FrontPage.query = gql`
query GetFrontPage($uri: String!) {
    frontPage: nodeByUri(uri: $uri) {
        __typename
        uri
        id
        ...on Page {
            title
        }
        ...on ContentType {
            name
        }
    }
    ...FieldTypesFragment
}
${FieldTypesFragment}
`;

FrontPage.variables = ({ uri }) => ({ uri });