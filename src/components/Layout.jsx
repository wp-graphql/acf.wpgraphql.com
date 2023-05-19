import Link from 'next/link'
import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation, NavigationFragment } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { SectionProvider } from '@/components/SectionProvider'
import { gql } from '@apollo/client'
import { HeroPattern } from './HeroPattern'

export const LayoutFragment = gql`
  fragment LayoutFragment on RootQuery {
    ...NavigationFragment
  }
  ${NavigationFragment}
`

export const Layout = ({ children, sections = [], data }) => {
 
  return (
    <SectionProvider sections={sections}>
      <div className="lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 lg:dark:border-white/10 xl:w-80">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className="h-8" />
              </Link>
            </div>
            <Header />
            <Navigation 
              className="hidden lg:mt-10 lg:block" 
              data={data} 
            />
          </div>
        </motion.header>
        <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
          <main className="py-16">
            <Prose as="article">
              <HeroPattern />
              {children}
            </Prose>
          </main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
