import { TopNavigationFragment } from '@/components/TopNavigation'
import { gql } from '@apollo/client'
import { flatListToHierarchical } from '@faustwp/core'
import { SiteHeader } from '@/components/SiteHeader'

export const LayoutFragment = gql`
  fragment LayoutFragment on RootQuery {
    ...TopNavigationFragment
  }
  ${TopNavigationFragment}
`

export function LayoutFrontPage({ data, children }) {
  const menuItems = data?.menuItems ?? []
  const navigation = menuItems?.nodes
    ? flatListToHierarchical(menuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  return (
    <>
      <SiteHeader navigation={navigation} data={data} />
      <>{children}</>
    </>
  )
}
