import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { snakeToPascalCase } from '@/lib/snakeToPascalCase';
import { stringToHash } from '@/lib/stringToHash';
import { highlightCode } from '@/lib/highlightCode';

function generateData(uniqueId, acfFieldType) {
  return {
    key: `my_field_group_${uniqueId}`,
    title: `My Field Group with ${acfFieldType}`,
    show_in_graphql: 1,
    graphql_field_name: `myFieldGroupWith${snakeToPascalCase(acfFieldType)}`,
    map_graphql_types_from_location_rules: 0,
    graphql_types: ['Page'],
    fields: [{
      key: `my_field_${uniqueId}`,
      label: 'My Field',
      name: 'my_field',
      type: `${acfFieldType}`,
      show_in_graphql: 1,
      graphql_field_name: `myFieldWith${snakeToPascalCase(acfFieldType)}`,
    }],
    location: [[{
      param: 'post_type',
      operator: '==',
      value: 'page',
    }]],
  };
}

function generatePHPTabContent(data) {
  const phpString = `<?php
add_action( 'acf/include_fields', function() {
  if ( ! function_exists( 'acf_add_local_field_group' ) ) {
      return;
  }
  acf_add_local_field_group(
    [
      ${JSON.stringify(data, null, 2).replace(/\n/g, "\n      ") /* Fix rendered indentation */}
    ]
  );
});`;
  return highlightCode(phpString, "php", [3, 4, 5]);
}

function generateJSONTabContent(data) {
  const jsonString = JSON.stringify(data, null, 2);
  return highlightCode(jsonString, "json", [3, 4, 5]);
}

function TabContent({ fieldTypeConfigurationBlockFields, uniqueId, format }) {
  const { acfFieldType } = fieldTypeConfigurationBlockFields;
  const data = generateData(uniqueId, acfFieldType);

  return format === 'php' ? generatePHPTabContent(data) : generateJSONTabContent(data);
}

export function AcfFieldTypeConfigurationBlock({ fieldTypeConfigurationBlockFields }) {
  const { acfFieldType } = fieldTypeConfigurationBlockFields;
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    setUniqueId(stringToHash(acfFieldType));
  }, [acfFieldType]);

  const tabData = [
    { key: 'php', name: 'PHP' },
    { key: 'json', name: 'JSON' },
  ];

  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
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
              <TabContent fieldTypeConfigurationBlockFields={fieldTypeConfigurationBlockFields} uniqueId={uniqueId} format={tab.key} />
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>
    </Card>
  );
}

AcfFieldTypeConfigurationBlock.displayName = `AcfFieldTypeConfigurationBlock`
AcfFieldTypeConfigurationBlock.config = {
  name: `AcfFieldTypeConfigurationBlock`,
}
AcfFieldTypeConfigurationBlock.fragments = {
  key: `AcfFieldTypeConfigurationBlockFragment`,
  entry: gql`
    fragment AcfFieldTypeConfigurationBlockFragment on AcfFieldTypeConfigurationBlock {
      fieldTypeConfigurationBlockFields {
        acfFieldType
      }
    }
  `,
}