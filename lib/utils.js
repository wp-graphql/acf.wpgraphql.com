import { slugifyWithCounter } from '@sindresorhus/slugify'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merges classes using clsx and tailwind-merge.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Recursively retrieve text from a node or its children.
export function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (child.type === 'text') {
      return child.value
    }
    return getNodeText(child)
  }

  return text
}

// Collects and processes heading nodes (h2, h3) from a list of nodes.
export function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.tagName === 'h2' || node.tagName === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes = {}
        node.attributes.id = id
        if (node.tagName === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`',
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}
