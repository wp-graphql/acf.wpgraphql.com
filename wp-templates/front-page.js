import { gql } from '@apollo/client'
import { useFaustQuery } from '@faustwp/core'

import HomepageLayoutsLayoutsFaqsLayout from '@/components/HomepageLayoutsLayoutsFaqsLayout'
import HomepageLayoutsLayoutsFeaturesLayout from '@/components/HomepageLayoutsLayoutsFeaturesLayout'
import HomepageLayoutsLayoutsHeroLayout from '@/components/HomepageLayoutsLayoutsHeroLayout'
import HomepageLayoutsLayoutsSupportedFieldTypesLayout from '@/components/HomepageLayoutsLayoutsSupportedFieldTypesLayout'
import { LayoutFrontPage, LAYOUT_FRONT_PAGE_QUERY } from '@/components/LayoutFrontPage'

const FRONT_PAGE_QUERY = gql`
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
  }
  ${HomepageLayoutsLayoutsHeroLayout.fragment}
  ${HomepageLayoutsLayoutsFeaturesLayout.fragment}
  ${HomepageLayoutsLayoutsSupportedFieldTypesLayout.fragment}
  ${HomepageLayoutsLayoutsFaqsLayout.fragment}
`;

export const FrontPage = () => {

  const faustData = useFaustQuery(FRONT_PAGE_QUERY)

  if (!faustData?.frontPage) {
    return null
  }

  const frontPage = faustData.frontPage;

  return (
    <LayoutFrontPage>
      {frontPage?.homepageLayouts?.layouts?.map((layout, i) => {
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


FrontPage.queries = [
  {
    query: LAYOUT_FRONT_PAGE_QUERY,
  },
  {
    query: FRONT_PAGE_QUERY,
    variables: ({ uri }) => ({ uri }),
  },
]

