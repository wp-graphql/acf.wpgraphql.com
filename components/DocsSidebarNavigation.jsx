import { gql } from '@apollo/client';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

DocsSidebarNavigation.fragment = gql`
  fragment DocsSidebarNavigationFragment on RootQuery {
    docsSidebarMenuItems: menuItems(
      first: 100
      where: { location: DOCS_SIDEBAR }
    ) {
      nodes {
        id
        label
        title: label
        href: uri
        parentId
      }
    }
  }
`;

export function DocsSidebarNavigation({ className, data, navigation }) {
  const isActiveSection = (section, currentNode) => {
    if (!currentNode) {
      return false;
    }
  
    return section.links.some(link => link.href.includes(currentNode.uri));
  };

  const [expandedSections, setExpandedSections] = useState(() => {
    const initialExpandedSections = {};
    navigation.forEach(section => {
      initialExpandedSections[section.title] = isActiveSection(section, data?.node);
    });
    return initialExpandedSections;
  });

  const toggleSection = (sectionTitle) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionTitle]: !prevState[sectionTitle],
    }));
  };

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            <div className="flex items-center">
              <Link href={section.href} passHref>
                <h2 className="cursor-pointer font-display font-medium text-slate-900 hover:text-slate-600 dark:text-white dark:hover:text-gray-300 block w-full">
                  {section.title}
                </h2>
              </Link>
              <button
                onClick={() => toggleSection(section.title)}
                className="ml-auto p-2 text-slate-900 transition-transform duration-300 dark:text-white"
              >
                <svg
                  className={clsx(
                    'h-4 w-4 transform transition-transform',
                    expandedSections[section.title] && 'rotate-180'
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <ul
              role="list"
              className={clsx(
                'mt-2 space-y-2 border-l-2 transition-all duration-300',
                expandedSections[section.title]
                  ? 'border-slate-100 dark:border-slate-800'
                  : 'hidden border-transparent',
                'lg:mt-4 lg:space-y-4 lg:border-slate-200'
              )}
            >
              {section.links.map((link) => (
                <li key={link.href} className="relative pl-3.5">
                  <Link href={link.href}                       className={clsx(
                        'block',
                        link.href === data?.node?.uri ? 'font-semibold text-sky-500' : 'text-slate-500 hover:text-slate-600 dark:text-slate-400'
                      )}>
                      {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
