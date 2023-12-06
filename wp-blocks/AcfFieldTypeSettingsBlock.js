import { useState } from 'react'
import { gql } from '@apollo/client'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function AcfFieldTypeSettingsBlock({ fieldTypeSettingsBlockFields }) {
  const { fieldTypeSettings } = fieldTypeSettingsBlockFields
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (value) => {
    setOpenItems(currentItems => {
      if (currentItems.includes(value)) {
        // Remove item from array if it's already there
        return currentItems.filter(item => item !== value);
      } else {
        // Add item to array
        return [...currentItems, value];
      }
    });
  };

  const expandAll = () => {
    const allItemValues = fieldTypeSettings.nodes.map((_, index) => `item-${index + 1}`);
    setOpenItems(allItemValues);
  };

  return (
    <div>
      <Accordion 
        className="w-full space-y-1" 
        collapsible="collapsible" 
        type="multiple" 
        value={openItems} 
        onChange={(value) => toggleItem(value)}
      >
        {fieldTypeSettings?.nodes?.map((item, index) => {
          const { id, name, description, fieldTypeSettingsMeta } = item
          const { impactOnWpgraphql, adminScreenshot } = fieldTypeSettingsMeta

          return (
            <AccordionItem key={id} value={`item-${index + 1}`}>
              <AccordionTrigger className="flex items-center p-4 bg-gray-200 dark:bg-gray-700">
                {name}
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={adminScreenshot?.node?.mediaItemUrl}
                  alt={adminScreenshot?.node?.altText}
                  width={adminScreenshot?.node?.mediaDetails?.width}
                  height={adminScreenshot?.node?.mediaDetails?.height}
                />
                {description && <p>{description}</p>}
                {impactOnWpgraphql && (
                  <div className="mt-2 p-2 bg-yellow-300 dark:bg-yellow-500">
                    <span dangerouslySetInnerHTML={{ __html: impactOnWpgraphql }} />
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <div className="mt-4">
        <Button className="w-full" variant="outline" onClick={expandAll}>
          Expand All Field Settings
        </Button>
      </div>
    </div>
  )
}

AcfFieldTypeSettingsBlock.displayName = `AcfFieldTypeSettingsBlock`
AcfFieldTypeSettingsBlock.config = {
  name: `AcfFieldTypeSettingsBlock`,
}
AcfFieldTypeSettingsBlock.fragments = {
  key: `AcfFieldTypeSettingsBlockFragment`,
  entry: gql`
    fragment AcfFieldTypeSettingsBlockFragment on AcfFieldTypeSettingsBlock {
      fieldTypeSettingsBlockFields {
        fieldTypeSettings(first: 100) {
          nodes {
            __typename
            id
            ... on ACFFieldTypeSetting {
              name
              description
              fieldTypeSettingsMeta {
                impactOnWpgraphql
                adminScreenshot {
                  node {
                    mediaItemUrl
                    altText
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
}
