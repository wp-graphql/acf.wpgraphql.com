import Link from 'next/link'
import clsx from 'clsx'
import { gql } from '@apollo/client'

export const NavigationFragment = gql`
fragment NavigationFragment on RootQuery {
  menuItems(first: 100 where: {location: PRIMARY}) {
    nodes {
      id
      label
      title: label
      href: uri
      parentId
    }
  }
}
`

const linkPath = (href) => {
  let url = new URL(href);
  return url.pathname ?? '';
}

const isActiveSection = (section, currentNode ) => {
  if ( ! currentNode ) {
    return false;
  }

  let isActive = false;

  section.links.forEach((link) => {
    const _linkPath = linkPath(link.href);
    if ( _linkPath.includes(currentNode?.uri ) ) {
      isActive = true;
    }
  });

  return isActive;

}

export function Navigation({ className, data, navigation }) {
 
  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            <Link href={section.href}>
              <h2 className={clsx("font-display font-medium ", isActiveSection(section, data?.node) ? 'text-sky-500' : 'text-slate-900 dark:text-white' )}>
                {section.title}
              </h2>
            </Link>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
            >
              { isActiveSection(section, data?.node) ? section.links.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={clsx(
                      'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                     linkPath(link.href) === data?.node?.uri
                        ? 'font-semibold text-sky-500 before:bg-sky-500'
                        : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              )) : null }
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
