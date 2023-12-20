import { gql } from '@apollo/client'
import { flatListToHierarchical } from '@faustwp/core'

import { FooterNavigation } from './FooterNavigation'
import { SiteFooter } from './SiteFooter'

import { PrimaryNavigation } from '@/components/PrimaryNavigation'
import { SiteHeader } from '@/components/SiteHeader'
import { SitewideNotice } from '@/components/SitewideNotice'


LayoutFrontPage.fragment = gql`
  fragment LayoutFrontPageFragment on RootQuery {
    ...SitewideNoticeFragment
    ...PrimaryNavigationFragment
    ...FooterNavigationFragment
  }
  ${SitewideNotice.fragment}
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
      <SitewideNotice displayNotice={data.sitewideNotice.sitewideNoticeFields.displayNotice} message={data.sitewideNotice.sitewideNoticeFields.message} />
      <SiteHeader navigation={primaryNavigation} data={data} isNoticeVisible={data.sitewideNotice.sitewideNoticeFields.displayNotice} />
      <main className='content'>
        {children}
      </main>
      <SiteFooter navigation={footerNavigation} />
    </>
  )
}
