import { gql } from '@apollo/client';
import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const AccordionItem = ({ title, content, isOpen, onClick }) => { 
  return (
    <>
      <Button onClick={onClick} variant="primary" className="flex w-full items-center justify-between py-2 text-left">
        {title}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 transition duration-300" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      {isOpen && (
        <div className="dark:bg-dark-muted bg-muted p-4">
          {content}
        </div>
      )}
    </>
  )
}

export function AcfFieldTypeSettingsBlock({ fieldTypeSettingsBlockFields }) {
  const { fieldTypeSettings } = fieldTypeSettingsBlockFields;
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems(current => current.includes(index) 
      ? current.filter(item => item !== index) 
      : [...current, index]);
  };

  const toggleAll = () => {
    if (openItems.length === fieldTypeSettings.nodes.length) {
      setOpenItems([]);
    } else {
      setOpenItems(fieldTypeSettings.nodes.map((_, index) => index));
    }
  };


  if ( ! fieldTypeSettings?.nodes?.length ) {
    return (
      <Card>
        <CardHeader className="grid grid-cols-[1fr_110px] items-start space-y-2">
          Field Type Settings not yet configured for this field type
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="grid grid-cols-[1fr_110px] items-start space-y-2">
          {fieldTypeSettings?.nodes?.map((item, index) => {
            const { id, name, description, fieldTypeSettingsMeta } = item;
            const { impactOnWpgraphql } = fieldTypeSettingsMeta;

            return (
              <AccordionItem
                key={id}
                title={name}
                content={
                  <>
                    {description && <p>{description}</p>}
                    {impactOnWpgraphql && (
                      <span dangerouslySetInnerHTML={{ __html: impactOnWpgraphql }} />
                    )}
                  </>
                }
                isOpen={openItems.includes(index)}
                onClick={() => toggleItem(index)}
              />
            );
          })}
        </CardHeader>
        <CardFooter>
          <div className="flex w-full items-center justify-center space-x-4">
            <Button variant="ghost" onClick={toggleAll} className="w-full">
              {openItems.length === fieldTypeSettings?.nodes?.length ? 'Collapse All' : 'Expand All'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

AcfFieldTypeSettingsBlock.displayName = `AcfFieldTypeSettingsBlock`;
AcfFieldTypeSettingsBlock.config = {
  name: `AcfFieldTypeSettingsBlock`,
};
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
                acfFieldName
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
};

export default AcfFieldTypeSettingsBlock;
