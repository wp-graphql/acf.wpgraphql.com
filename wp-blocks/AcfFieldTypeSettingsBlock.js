import { gql } from '@apollo/client';
import clsx from 'clsx'
import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  const buttonStyles = {
    closed:
      'py-2 px-4 w-full text-left bg-white hover:bg-muted flex justify-between items-center text-black dark:bg-gray-800 dark:text-white',
    open:
      'py-2 px-4 w-full text-left bg-muted hover:bg-muted flex justify-between items-center text-black dark:text-white',
  }
 
  return (
    <div className="dark:border-dark-gray-300 border-b border-gray-300">
      <Button onClick={onClick} className={clsx(isOpen ? buttonStyles.open : buttonStyles.closed)}>
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
        <div className="dark:bg-dark-muted bg-muted px-4 py-2">
          {content}
        </div>
      )}
    </div>
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

  return (
    <div>
      <Card>
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
      </Card>
      <div className="mt-4 text-center">
        <button
          onClick={toggleAll}
          className="text-blue-500 underline hover:text-blue-600"
        >
          {openItems.length === fieldTypeSettings.nodes.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
    </div>
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
