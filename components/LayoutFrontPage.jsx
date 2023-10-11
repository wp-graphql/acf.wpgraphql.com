import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'


import { Logo } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { TopNavigation, TopNavigationFragment } from '@/components/TopNavigation'
import { Prose } from '@/components/Prose'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'
import { gql } from '@apollo/client'
import { flatListToHierarchical } from '@faustwp/core'
import { collectHeadings } from '@/lib/utils'
import { WordPressIcon } from '@/components/icons/WordPressIcon'
import { GitHubIcon } from '@/components/icons/GitHubIcon'

export const LayoutFragment = gql`
  fragment LayoutFragment on RootQuery {
    ...TopNavigationFragment
  }
  ${TopNavigationFragment}
`

function Header({ navigation, data }) {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center gap-4">
        <Link href="/" aria-label="Home page">
          <Logo className="h-5 lg:h-9 w-auto bg-slate-900/95 p-1 rounded-md fill-slate-700 dark:fill-sky-100 lg:block" />
        </Link>
        <TopNavigation navigation={navigation} />
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-4 sm:gap-8 md:flex-grow">
        <ThemeSelector className="relative z-10" />
        <Link href="https://github.com/wp-graphql/wpgraphql-acf" className="group" aria-label="GitHub">
          <GitHubIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
        <Link href="https://github.com/wp-graphql/wpgraphql-acf" className="group" aria-label="GitHub">
          <WordPressIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      </div>
    </header>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents?.[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {

    if ( ! tableOfContents.length ) return []

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

      if ( ! headings || ! headings.length ) return;

      let current = headings && headings.length > 0 ? headings[0].id : null;
      for (let heading of headings) {
        if (top >= heading.top) {
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

export function LayoutFrontPage({ data, children, toc, title }) {
  
  let tableOfContents = toc && toc.length
    ? collectHeadings( toc )
    : []

  const menuItems = data?.menuItems ?? [];
  const navigation = menuItems?.nodes ? flatListToHierarchical( menuItems.nodes, {
    idKey: 'id',
    childrenKey: 'links',
    parentKey: 'parentId'
  } ) : [];
  return (
    <>
      <Header navigation={navigation} data={data} />
      <>
        {children}    
      </>       
    </>
  )
}
