import { gql } from '@apollo/client'

export function AcfFieldTypeSettingsBlock({fieldTypeSettingsBlockFields}) {
  const { fieldTypeSettings } = fieldTypeSettingsBlockFields

  return (
    <>
      {fieldTypeSettings?.nodes?.map((item) => {
        const { id, name, description, fieldTypeSettingsMeta } = item
        const { acfFieldName, impactOnWpgraphql } = fieldTypeSettingsMeta

        return (
          <div key={id} className="mb-4">
            <h3 className="mb-2">{name}</h3>
            <code className="whitespace-nowrap text-gray-400">{acfFieldName}</code>
            <ul>
              <li className={description ? '' : 'italic text-gray-400'}>
                {description || 'Description not yet documented'}
              </li>
              <li className={impactOnWpgraphql ? '' : 'italic text-gray-400'}>
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
