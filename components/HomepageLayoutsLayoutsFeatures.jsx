import { gql } from '@apollo/client'

import FeatureTabsLeft from './FeatureTabsLeft'
import FeatureTabsTop from './FeatureTabsTop'

const HomepageLayoutsLayoutsFeatures = (feature) => {
  const layout = feature?.layout?.[0] ?? 'top'
  switch (layout) {
    case 'top':
      return <FeatureTabsTop {...feature} />
    default:
      return <FeatureTabsLeft {...feature} />
  }
}

HomepageLayoutsLayoutsFeatures.fragment = gql`
  fragment HomepageLayoutsLayoutsFeatures on LayoutFeatureTabs_Fields {
    __typename
    ...FeatureTabsTop
    ...FeatureTabsLeft
  }
  ${FeatureTabsTop.fragment}
  ${FeatureTabsLeft.fragment}
`

export default HomepageLayoutsLayoutsFeatures
