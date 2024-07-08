import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { WordPressIcon } from '@/components/icons/WordPressIcon'
import { Logo } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { PrimaryNavigation } from '@/components/PrimaryNavigation'
import { Search } from '@/components/Search'
import { ModeToggle } from '@/components/ThemeSelector'

export function SiteHeader({ navigation, isNoticeVisible = false }) {
  let [isScrolled, setIsScrolled] = useState(false)

  const headerTopPosition = isNoticeVisible ? 'top-12' : 'top-0';

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
        'sticky',
        headerTopPosition,
        'z-40 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-navy/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-navy/75'
          : 'dark:bg-navy',
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex grow basis-0 items-center gap-4">
        <Link href="/" aria-label="Home page" className='shrink-0'>
          <Logo className="h-5 w-auto rounded-md bg-gradient-power dark:bg-none fill-slate-700 p-1 dark:fill-sky-100 md:block lg:block lg:h-9" />
        </Link>
        <div className="hidden lg:block">
          <PrimaryNavigation navigation={navigation} />
        </div>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-4 sm:gap-8 md:grow">
        <ModeToggle className="relative z-10" />
        <Link
          href="https://github.com/wp-graphql/wpgraphql-acf"
          className="group"
          aria-label="GitHub"
        >
          <GitHubIcon className="size-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
        <Link
          href="https://github.com/wp-graphql/wpgraphql-acf"
          className="group"
          aria-label="GitHub"
        >
          <WordPressIcon className="size-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      </div>
    </header>
  )
}
