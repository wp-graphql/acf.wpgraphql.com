import { gql } from '@apollo/client'

import HomepageLayoutsLayoutsFaqsLayout from '@/components/HomepageLayoutsLayoutsFaqsLayout'
import HomepageLayoutsLayoutsFeaturesLayout from '@/components/HomepageLayoutsLayoutsFeaturesLayout'
import HomepageLayoutsLayoutsHeroLayout from '@/components/HomepageLayoutsLayoutsHeroLayout'
import HomepageLayoutsLayoutsSupportedFieldTypesLayout from '@/components/HomepageLayoutsLayoutsSupportedFieldTypesLayout'
import { LayoutFrontPage } from '@/components/LayoutFrontPage'

export const FrontPage = ({ data }) => {
  return (
    <LayoutFrontPage data={data}>
      {data?.frontPage?.homepageLayouts?.layouts?.map((layout, i) => {
        switch (layout.__typename) {
          case 'HomepageLayoutsLayoutsHeroLayout':
            return <HomepageLayoutsLayoutsHeroLayout key={i} {...layout} />
          case 'HomepageLayoutsLayoutsFeaturesLayout':
            return <HomepageLayoutsLayoutsFeaturesLayout key={i} {...layout} />
          case 'HomepageLayoutsLayoutsSupportedFieldTypesLayout':
            return (
              <HomepageLayoutsLayoutsSupportedFieldTypesLayout key={i} {...layout} />
            )
          case 'HomepageLayoutsLayoutsFaqsLayout':
            return <HomepageLayoutsLayoutsFaqsLayout key={i} {...layout} />
          default:
            return <pre>{JSON.stringify(layout, null, 2)}</pre>
        }
      })}
    </LayoutFrontPage>
  )
}

FrontPage.query = gql`
  query GetFrontPage($uri: String!) {
    frontPage: nodeByUri(uri: $uri) {
      __typename
      uri
      id
      ... on Page {
        title
      }
      ... on ContentType {
        name
      }
      ... on WithAcfHomepageLayouts {
        homepageLayouts {
          layouts {
            __typename
            ...HomepageLayoutsLayoutsHeroLayout
            ...HomepageLayoutsLayoutsFeaturesLayout
            ...HomepageLayoutsLayoutsSupportedFieldTypesLayout
            ...HomepageLayoutsLayoutsFaqsLayout
          }
        }
      }
    }
    ...LayoutFrontPageFragment
  }
  ${HomepageLayoutsLayoutsHeroLayout.fragment}
  ${HomepageLayoutsLayoutsFeaturesLayout.fragment}
  ${HomepageLayoutsLayoutsSupportedFieldTypesLayout.fragment}
  ${HomepageLayoutsLayoutsFaqsLayout.fragment}
  ${LayoutFrontPage.fragment}
`

FrontPage.variables = ({ uri }) => ({ uri })
