import React from 'react';
import { gql } from '@apollo/client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { snakeToPascalCase } from '@/lib/snakeToPascalCase';

const tabData = [
  {
    key: 'php',
    name: 'PHP',
    component: PHPTabContent
  },
  {
    key: 'json',
    name: 'JSON',
    component: JSONTabContent
  },
];

function PHPTabContent({fieldTypeConfigurationBlockFields}) {
  const { acfFieldType } = fieldTypeConfigurationBlockFields;
  const phpGuts = `array(
      'key'                   => 'group_{unique_key_1}',
      'title'                 => 'My Field Group with ${acfFieldType}',
      'show_in_graphql'       => 1,
      'graphql_field_name'    => 'myFieldGroupWith${snakeToPascalCase(acfFieldType)}',
      'map_graphql_types_from_location_rules' => 0,
      'graphql_types'         => array( 'Page' ),
      'fields'                => array(
        array(
          'key'                => 'field_{unique_key_2}',
          'label'              => 'My Field',
          'name'               => 'my_field',
          'type'               => '${acfFieldType}',
          'show_in_graphql'    => 1,
          'graphql_field_name' => 'myField',
        ),
      ),
      'location'              => array(
        array(
          array(
            'param'    => 'post_type',
            'operator' => '==',
            'value'    => 'page',
          ),
        ),
      )
    )`
  
  let phpString = `<?php
add_action( 'acf/include_fields', function() {
  // Check if the ACF function exists
  if ( ! function_exists( 'acf_add_local_field_group' ) ) {
      return;
  }

  // Add local field group
  acf_add_local_field_group(
    ${phpGuts}
  );
});
`;

  return(
    <pre>
      {phpString}
    </pre>
  )
}

function JSONTabContent({fieldTypeConfigurationBlockFields}) {
  const { acfFieldType } = fieldTypeConfigurationBlockFields;
  
  // const result = JSON.parse(acfFieldType);
  // const prettyResult = JSON.stringify(result, null, 2);

  return(
    <pre>
      JSON
    </pre>
  )
}

export function AcfFieldTypeConfigurationBlock({ fieldTypeConfigurationBlockFields }) {
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
            {tab.component({ fieldTypeConfigurationBlockFields })}
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
        acfFieldType
      }
    }
  `,
}