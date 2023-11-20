import React from 'react';
import { gql } from '@apollo/client'
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const tabData = [
  {
    key: 'acf_ui',
    name: 'ACF UI',
    content: AcfUiTabContent
  },
  {
    key: 'php',
    name: 'PHP',
    content: () => <p>PHP Content</p>
  },
  {
    key: 'json',
    name: 'JSON',
    content: () => <p>JSON Content</p>
  },
];

function AcfUiTabContent({ fieldLabel, uiScreenshot }) {
  return (
    <>
      <p>Field Label: {fieldLabel}</p>
      <Image
        src={uiScreenshot?.node?.mediaItemUrl}
        alt={uiScreenshot?.node?.altText}
        width={uiScreenshot?.node?.mediaDetails?.width}
        height={uiScreenshot?.node?.mediaDetails?.height}
      />
    </>
  );
} 

export function AcfFieldTypeConfigurationBlock({ fieldTypeConfigurationBlockFields }) {
  const { fieldLabel, uiScreenshot } = fieldTypeConfigurationBlockFields;

  return (
    <Tabs defaultValue={tabData[0].key}>
      <TabsList aria-label="Dynamic Tabs">
        {tabData.map(tab => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabData.map(tab => (
        <TabsContent key={tab.key} value={tab.key}>
          <div className="p-4">
            {tab.key === 'acf_ui' ? tab.content({ fieldLabel, uiScreenshot }) : tab.content()}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

AcfFieldTypeConfigurationBlock.displayName = `AcfFieldTypeConfigurationBlock`
AcfFieldTypeConfigurationBlock.config = {
  name: `AcfFieldTypeConfigurationBlock`,
}
AcfFieldTypeConfigurationBlock.fragments = {
  key: `AcfFieldTypeConfigurationBlockFragment`,
  entry: gql`
    fragment AcfFieldTypeConfigurationBlockFragment on AcfFieldTypeConfigurationBlock {
      fieldTypeConfigurationBlockFields {
        fieldLabel
        uiScreenshot {
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
  `,
}
