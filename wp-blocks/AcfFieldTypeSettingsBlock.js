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


  if ( fieldTypeSettings?.nodes?.length === 0 ) {
    return (
      <Card>
        <CardHeader className="grid grid-cols-[1fr_110px] items-start space-y-2">
          Field Type Settings not yet configured for this field type
        </CardHeader>
      </Card>
    );
  }

  // copy the nodes so we can sort them before returning
  const settings = [...fieldTypeSettings.nodes];

  // sort by name
  settings.sort((a, b) => {
    let nameA = a.name.toUpperCase(); // ignore upper and lowercase
    let nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1; //nameA comes first
    }
    if (nameA > nameB) {
      return 1; // nameB comes first
    }
    return 0;  // names must be equal
  });

  return (
    <>
    <p>Below you will find information about how various ACF field settings can impact how the field will map to the GraphQL Schema and/or modify resolution of the field when queried.</p>
      <Card>
        <CardHeader className="grid grid-cols-[1fr_110px] items-start space-y-2">
          {settings?.map((item, index) => {
            const { id, name, description, fieldTypeSettingsMeta } = item;
            const { impactOnWpgraphql, acfFieldName } = fieldTypeSettingsMeta;

            return (
              <AccordionItem
                key={id}
                title={`${name}`}
                content={
                  <>
                    {acfFieldName && <><p><code className='mb-10'>{acfFieldName}</code></p></>}
                    {description && <><p>{description}</p></>}
                    {impactOnWpgraphql && (
                      <><strong>Impact on the GraphQL</strong><span dangerouslySetInnerHTML={{ __html: impactOnWpgraphql }} /></>
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
