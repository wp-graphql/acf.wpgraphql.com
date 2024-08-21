import clsx from 'clsx'
import * as React from 'react'

import { gql } from '@apollo/client'
import Link from 'next/link'


import styles from '@/styles/footer-navigation.module.css';

export function FooterNavigation({ navigation }) {
  return (
    <>
     {navigation.map((item) => (
        <Link
          className={clsx(
            styles.socialIconLink,
            'gap-4',
          )}
          href={item.href}
          key={item.id}
          target={item.target}>
          {item.label}
        </Link>
      ))}
    </>
  )
}

FooterNavigation.fragment = gql`
  fragment FooterNavigationFragment on RootQuery {
    footerMenuItems: menuItems(first: 100, where: { location: FOOTER }) {
      nodes {
        id
        label
        title: label
        href: uri
        parentId
        target
      }
    }
  }
`
