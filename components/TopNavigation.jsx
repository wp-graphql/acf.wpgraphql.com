import * as React from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const TopNavigationFragment = gql`
  fragment TopNavigationFragment on RootQuery {
    menuItems(first: 100 where: { location: TOP }) {
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

export function TopNavigation({ navigation }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigation.map((item) => (
          <NavigationMenuItem key={item.id}>
            <Link href={item.href} passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = (({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
