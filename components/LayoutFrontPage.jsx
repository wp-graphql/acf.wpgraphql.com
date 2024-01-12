import { gql } from '@apollo/client'
import { flatListToHierarchical, useFaustQuery } from '@faustwp/core'

import { FooterNavigation } from './FooterNavigation'
import { SiteFooter } from './SiteFooter'

import { PrimaryNavigation } from '@/components/PrimaryNavigation'
import { SiteHeader } from '@/components/SiteHeader'
import { SitewideNotice } from '@/components/SitewideNotice'


export const LAYOUT_FRONT_PAGE_QUERY = gql`
  query LayoutFrontPageFragment {
    ...SitewideNoticeFragment
    ...PrimaryNavigationFragment
    ...FooterNavigationFragment
  }
  ${SitewideNotice.fragment}
  ${PrimaryNavigation.fragment}
  ${FooterNavigation.fragment}
`

export function LayoutFrontPage({ children }) {

  const { sitewideNotice, primaryMenuItems, footerMenuItems } = useFaustQuery(LAYOUT_FRONT_PAGE_QUERY);

  const primaryNavigation = primaryMenuItems?.nodes
    ? flatListToHierarchical(primaryMenuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  const footerNavigation = footerMenuItems?.nodes
    ? flatListToHierarchical(footerMenuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  return (
    <>
      <SitewideNotice displayNotice={sitewideNotice?.sitewideNoticeFields?.displayNotice} message={sitewideNotice?.sitewideNoticeFields?.message} />
      <SiteHeader navigation={primaryNavigation} isNoticeVisible={sitewideNotice?.sitewideNoticeFields?.displayNotice} />
      <main className='content'>
        {children}
      </main>
      <SiteFooter navigation={footerNavigation} />
    </>
  )
}
