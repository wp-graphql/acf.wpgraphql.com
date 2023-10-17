import { gql } from '@apollo/client'
import { flatListToHierarchical } from '@faustwp/core'

import { PrimaryNavigation } from '@/components/PrimaryNavigation'
import { SiteHeader } from '@/components/SiteHeader'

LayoutFrontPage.fragment = gql`
  fragment LayoutFrontPageFragment on RootQuery {
    ...PrimaryNavigationFragment
  }
  ${PrimaryNavigation.fragment}
`

export function LayoutFrontPage({ data, children }) {
  const primaryMenuItems = data?.primaryMenuItems ?? []
  const primaryNavigation = primaryMenuItems?.nodes
    ? flatListToHierarchical(primaryMenuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  return (
    <>
      <SiteHeader navigation={primaryNavigation} data={data} />
      <>{children}</>
    </>
  )
}
