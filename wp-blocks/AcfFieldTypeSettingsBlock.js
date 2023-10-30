import { gql } from '@apollo/client'

export function AcfFieldTypeSettingsBlock(props) {
  const { fieldTypeSettings } = props?.fieldTypeSettingsBlockFields

  return (
    <>
      {fieldTypeSettings?.nodes?.map((item, index) => {
        const { id, name, description, fieldTypeSettingsMeta } = item;
        const { acfFieldName, impactOnWpgraphql } = fieldTypeSettingsMeta;

        return (
          <div key={id} className="mb-4">
            <h3 className="mb-2">{name}</h3>
            <code className="text-gray-400 whitespace-nowrap">{acfFieldName}</code>
            <ul>
              <li className={description ? '' : 'text-gray-400 italic'}>
                {description || 'Description not yet documented'}
              </li>
              <li className={impactOnWpgraphql ? '' : 'text-gray-400 italic'}>
                {impactOnWpgraphql ? <span dangerouslySetInnerHTML={{ __html: impactOnWpgraphql }} /> : 'Impact on WPGraphQL not yet documented'}
              </li>
            </ul>
          </div>
        );
      })}
    </>
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
                acfFieldName
              }
            }
          }
        }
      }
    }
  `,
}
