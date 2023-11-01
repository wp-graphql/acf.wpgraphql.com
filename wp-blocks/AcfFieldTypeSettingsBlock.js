import { gql } from '@apollo/client'
import { Fragment } from 'react'

export function AcfFieldTypeSettingsBlock({fieldTypeSettingsBlockFields}) {
  const { fieldTypeSettings } = fieldTypeSettingsBlockFields

  return (
    <>
      {fieldTypeSettings?.nodes?.map((item) => {
        const { id, name, description, fieldTypeSettingsMeta } = item
        const { acfFieldName, impactOnWpgraphql } = fieldTypeSettingsMeta

        return (
          <Fragment key={id}>
            <h3 key={'h3' + id} className="mt-2">{name}</h3>
            {acfFieldName && <code>{acfFieldName}</code>}
            <ul key={'ul' + id}>
              <li>
                {description || <span className='italic'>Description not yet documented</span>}
              </li>
              <li>
                {impactOnWpgraphql ? <span dangerouslySetInnerHTML={{ __html: impactOnWpgraphql }} /> : <span className='italic'>Impact on WPGraphQL not yet documented</span>}
              </li>
            </ul>
          </Fragment>
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
