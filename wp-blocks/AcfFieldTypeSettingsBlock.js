import React, { useState } from 'react';
import { gql } from '@apollo/client';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent } from "@/components/ui/card";

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-300">
    <Button
      onClick={onClick}
      className="py-2 px-4 w-full text-left text-black bg-white hover:bg-gray-100 flex justify-between items-center"
    >
      {title}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 transform transition duration-300" 
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </Button>
    {isOpen && (
      <div className="p-4 bg-white">
        {content}
      </div>
    )}
  </div>
);

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
            const { impactOnWpgraphql, adminScreenshot } = fieldTypeSettingsMeta;

            return (
              <AccordionItem
                key={id}
                title={name}
                content={
                  <>
                    {adminScreenshot?.node && (
                      <Image
                        src={adminScreenshot?.node?.mediaItemUrl}
                        alt={adminScreenshot?.node?.altText}
                        width={adminScreenshot?.node?.mediaDetails?.width}
                        height={adminScreenshot?.node?.mediaDetails?.height}
                      />
                    )}
                    {description && <p>{description}</p>}
                    {impactOnWpgraphql && (
                      <div className="mt-2 p-2 bg-yellow-300">
                        <span dangerouslySetInnerHTML={{ __html: impactOnWpgraphql }} />
                      </div>
                    )}
                  </>
                }
                isOpen={openItems.includes(index)}
                onClick={() => toggleItem(index)}
              />
            );
          })}
      </Card>
      <div className="text-center mt-4">
        <button
          onClick={toggleAll}
          className="text-blue-500 hover:text-blue-600 underline"
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
