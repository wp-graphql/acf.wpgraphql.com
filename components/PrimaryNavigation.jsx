import { gql } from '@apollo/client'
import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

PrimaryNavigation.fragment = gql`
  fragment PrimaryNavigationFragment on RootQuery {
    primaryMenuItems: menuItems(first: 100, where: { location: PRIMARY }) {
      nodes {
        id
        label
        title: label
        href: uri
        parentId
        target
        menuItemMeta {
          isFeatured
          description
        }
      }
    }
  }
`

export function PrimaryNavigation({ navigation }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigation.map((item) => {
          if (item.links.length == 0) {
            return (
              <NavigationMenuItem key={item?.id}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    target={item?.target ?? null}
                  >
                    {item?.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger>{item?.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {item.links.map((sublink) => {
                    if (sublink.menuItemMeta?.isFeatured) {
                      return (
                        <li className="row-span-3" key={sublink.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md text-accent-foreground"
                              href={sublink.href}
                              target={sublink?.target ?? null}
                            >
                              {/* <Icons.logo className="h-6 w-6" /> */}
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {sublink?.label}
                              </div>
                              <p className="text-sm leading-tight text-popover-foreground">
                                {sublink.menuItemMeta?.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )
                    } else {
                      return (
                        <NavigationMenuLink asChild key={sublink.id}>
                          <ListItem
                            key={sublink.id}
                            href={sublink.href}
                            target={sublink?.target ?? null}
                            title={sublink.label}
                            className="text-accent-foreground"
                          >
                            {sublink.menuItemMeta?.description}
                          </ListItem>
                        </NavigationMenuLink>
                      )
                    }
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
