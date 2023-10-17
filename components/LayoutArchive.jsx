import { gql } from '@apollo/client'
import { flatListToHierarchical } from '@faustwp/core'

import { PrimaryNavigation } from './PrimaryNavigation'

import { DocsSidebarNavigation } from '@/components/DocsSidebarNavigation'
import { Prose } from '@/components/Prose'
import { SiteHeader } from '@/components/SiteHeader'


LayoutArchive.fragment = gql`
  fragment LayoutArchiveFragment on RootQuery {
    ...PrimaryNavigationFragment
    ...DocsSidebarNavigationFragment
  }
  ${PrimaryNavigation.fragment}
  ${DocsSidebarNavigation.fragment}
`

export function LayoutArchive({ data, children, title }) {
  const primaryMenuItems = data?.primaryMenuItems ?? []
  const primaryNavigation = primaryMenuItems?.nodes
    ? flatListToHierarchical(primaryMenuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  const docsSidebarMenuItems = data?.docsSidebarMenuItems ?? []
  const docsSidebarNavigation = docsSidebarMenuItems?.nodes
    ? flatListToHierarchical(docsSidebarMenuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  let docsSidebarAllLinks =
    docsSidebarNavigation?.flatMap((section) => section.links) ?? []
  let section = docsSidebarAllLinks.find((section) =>
    section.links.find((link) => link.href === data?.node?.uri),
  )

  return (
    <>
      <SiteHeader navigation={primaryNavigation} />
      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
            <DocsSidebarNavigation
              data={data}
              navigation={docsSidebarNavigation}
            />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
        </div>
      </div>
    </>
  )
}
