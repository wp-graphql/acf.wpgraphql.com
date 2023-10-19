import { gql } from '@apollo/client'
import { flatListToHierarchical } from '@faustwp/core'

import { PrimaryNavigation } from '@/components/PrimaryNavigation'
import { FooterNavigation } from './FooterNavigation'

import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from './SiteFooter'

LayoutFrontPage.fragment = gql`
  fragment LayoutFrontPageFragment on RootQuery {
    ...PrimaryNavigationFragment
    ...FooterNavigationFragment
  }
  ${PrimaryNavigation.fragment}
  ${FooterNavigation.fragment}
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
  const footerMenuItems = data?.footerMenuItems ?? []
  const footerNavigation = footerMenuItems?.nodes
    ? flatListToHierarchical(footerMenuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  return (
    <>
      <SiteHeader navigation={primaryNavigation} data={data} />
      {children}
      <SiteFooter navigation={footerNavigation} />
    </>
  )
}
