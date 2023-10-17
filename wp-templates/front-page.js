import { gql } from '@apollo/client'
import { LayoutFrontPage } from '@/components/LayoutFrontPage'
import HomepageLayoutsLayoutsFaqs from '@/components/HomepageLayoutsLayoutsFaqs'
import HomepageLayoutsLayoutsSupportedFieldTypes from '@/components/HomepageLayoutsLayoutsSupportedFieldTypes'
import HomepageLayoutsLayoutsFeatures from '@/components/HomepageLayoutsLayoutsFeatures'
import HomepageLayoutsLayoutsHero from '@/components/HomepageLayoutsLayoutsHero'
import { PrimaryNavigationFragment } from '@/components/PrimaryNavigation'

export const FrontPage = ({ data }) => {
  return (
    <LayoutFrontPage data={data}>
      {data?.frontPage?.homepageLayouts?.layouts?.map((layout, i) => {
        switch (layout.__typename) {
          case 'HomepageLayoutsLayoutsHero':
            return <HomepageLayoutsLayoutsHero key={i} {...layout} />
          case 'HomepageLayoutsLayoutsFeatures':
            return <HomepageLayoutsLayoutsFeatures key={i} {...layout} />
          case 'HomepageLayoutsLayoutsSupportedFieldTypes':
            return (
              <HomepageLayoutsLayoutsSupportedFieldTypes key={i} {...layout} />
            )
          case 'HomepageLayoutsLayoutsFaqs':
            return <HomepageLayoutsLayoutsFaqs key={i} {...layout} />
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
            ...HomepageLayoutsLayoutsHero
            ...HomepageLayoutsLayoutsFeatures
            ...HomepageLayoutsLayoutsSupportedFieldTypes
            ...HomepageLayoutsLayoutsFaqs
          }
        }
      }
    }
    ...PrimaryNavigationFragment
  }
  ${HomepageLayoutsLayoutsHero.fragment}
  ${HomepageLayoutsLayoutsFeatures.fragment}
  ${HomepageLayoutsLayoutsSupportedFieldTypes.fragment}
  ${HomepageLayoutsLayoutsFaqs.fragment}
  ${PrimaryNavigationFragment}
`

FrontPage.variables = ({ uri }) => ({ uri })
