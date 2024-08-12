import { gql } from '@apollo/client'

import FeatureTabsLeft from './FeatureTabsLeft'
import FeatureTabsTop from './FeatureTabsTop'

const HomepageLayoutsLayoutsFeaturesLayout = (feature) => {
  const layout = feature?.layout?.[0] ?? 'top'
  switch (layout) {
    case 'top':
      return <FeatureTabsTop {...feature} />
    default:
      return <FeatureTabsLeft {...feature} />
  }
}

HomepageLayoutsLayoutsFeaturesLayout.fragment = gql`
  fragment HomepageLayoutsLayoutsFeaturesLayout on LayoutFeatureTabs_Fields {
    __typename
    ...FeatureTabsTop
    ...FeatureTabsLeft
  }
  ${FeatureTabsTop.fragment}
  ${FeatureTabsLeft.fragment}
`

export default HomepageLayoutsLayoutsFeaturesLayout
