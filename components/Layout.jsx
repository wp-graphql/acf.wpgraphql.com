import { gql } from '@apollo/client'
import { flatListToHierarchical, useFaustQuery } from '@faustwp/core'
import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import EditPost from './EditPost'

import { DocsSidebarNavigation } from '@/components/DocsSidebarNavigation'
import { FooterNavigation } from '@/components/FooterNavigation'
import { PrimaryNavigation } from '@/components/PrimaryNavigation'
import { Prose } from '@/components/Prose'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { SitewideNotice } from '@/components/SitewideNotice'
import { collectHeadings } from '@/lib/utils'

export const LAYOUT_QUERY = gql`
  query LayoutFragment {
    ...SitewideNoticeFragment
    ...PrimaryNavigationFragment
    ...DocsSidebarNavigationFragment
    ...FooterNavigationFragment
  }
  ${SitewideNotice.fragment}
  ${PrimaryNavigation.fragment}
  ${DocsSidebarNavigation.fragment}
  ${FooterNavigation.fragment}
`

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents?.[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    if (!tableOfContents.length) return []

    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (!tableOfContents || tableOfContents?.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY

      if (!headings || !headings.length) return

      let current =
        headings && headings.length > 0 ? headings[0]?.id ?? null : null
      for (let heading of headings) {
        if (top >= heading?.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function Layout({ node, children, toc, title }) {
  const { sitewideNotice, primaryMenuItems, footerMenuItems, docsSidebarMenuItems } = useFaustQuery(LAYOUT_QUERY);
  let tableOfContents = toc && toc.length ? collectHeadings(toc) : []

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
  const docsSidebarNavigation = docsSidebarMenuItems?.nodes
    ? flatListToHierarchical(docsSidebarMenuItems.nodes, {
        idKey: 'id',
        childrenKey: 'links',
        parentKey: 'parentId',
      })
    : []
  let docsSidebarAllLinks =
    docsSidebarNavigation?.flatMap((section) => section.links) ?? []
  let linkIndex = docsSidebarAllLinks.findIndex((link) => {
    return link.href === node?.uri
  })
  let previousPage = docsSidebarAllLinks[linkIndex - 1]

  let nextPage = docsSidebarAllLinks[linkIndex + 1]
  let section = docsSidebarAllLinks.find((section) =>
    section.links.find((link) => link.href === node?.uri),
  )
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <>
      <SitewideNotice displayNotice={sitewideNotice.sitewideNoticeFields.displayNotice} message={sitewideNotice.sitewideNoticeFields.message} />
      <SiteHeader navigation={primaryNavigation} isNoticeVisible={sitewideNotice.sitewideNoticeFields.displayNotice} />

      <main className='content'>
        <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:bg-gray-800/25" />
            <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
            <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
            <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
              <DocsSidebarNavigation
                data={{
                  node
                }}
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
                     <EditPost post={node}>
                      <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                        {title}
                      </h1>
                    </EditPost>
                  )}
                </header>
              )}
              <Prose>{children}</Prose>
            </article>
            <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
              {previousPage && (
                <div>
                  <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                    Previous
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href={previousPage.href}
                      className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      <span aria-hidden="true">&larr;</span> {previousPage.title}
                    </Link>
                  </dd>
                </div>
              )}
              {nextPage && (
                <div className="ml-auto text-right">
                  <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                    Next
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href={nextPage.href}
                      className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      {nextPage.title} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
            <nav aria-labelledby="on-this-page-title" className="w-56">
              {tableOfContents && tableOfContents?.length > 0 && (
                <>
                  <h2
                    id="on-this-page-title"
                    className="font-display text-sm font-medium text-slate-900 dark:text-white"
                  >
                    On this page
                  </h2>
                  <ol role="list" className="mt-4 space-y-3 text-sm">
                    {tableOfContents.map((section) => (
                      <li key={section.id}>
                        <h3>
                          <Link
                            href={`#${section.id}`}
                            className={clsx(
                              isActive(section)
                                ? 'text-sky-500'
                                : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300',
                            )}
                          >
                            {section.title}
                          </Link>
                        </h3>
                        {section.children.length > 0 && (
                          <ol
                            role="list"
                            className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                          >
                            {section.children.map((subSection) => (
                              <li key={subSection.id}>
                                <Link
                                  href={`#${subSection.id}`}
                                  className={
                                    isActive(subSection)
                                      ? 'text-sky-500'
                                      : 'hover:text-slate-600 dark:hover:text-slate-300'
                                  }
                                >
                                  {subSection.title}
                                </Link>
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </nav>
          </div>
        </div>
      </main>

      <SiteFooter navigation={footerNavigation} />
    </>
  )
}
