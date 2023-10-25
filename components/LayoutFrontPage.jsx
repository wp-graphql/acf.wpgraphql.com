import { gql } from '@apollo/client'
import { flatListToHierarchical } from '@faustwp/core'

import { FooterNavigation } from './FooterNavigation'
import { SiteFooter } from './SiteFooter'

import { PrimaryNavigation } from '@/components/PrimaryNavigation'
import { SiteHeader } from '@/components/SiteHeader'


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
      <main className='content'>
        {children}
      </main>
      <SiteFooter navigation={footerNavigation} />
    </>
  )
}
