import { gql } from '@apollo/client'

function Component(props) {
  // @todo: this component should render a table of settings for the field type, similar to what's seen on pages like: https://www.advancedcustomfields.com/resources/email/#settings
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

Component.displayName = `AcfFieldTypeSettingsBlock`
Component.config = {
  name: `AcfFieldTypeSettingsBlock`,
}
Component.fragments = {
  key: `AcfFieldTypeSettingsBlockFragment`,
  entry: gql`
    fragment AcfFieldTypeSettingsBlockFragment on AcfFieldTypeSettingsBlock {
      fieldTypeSettingsBlockFields {
        fieldTypeSettings(first: 100) {
          nodes {
            __typename
            id
            ...on ACFFieldTypeSetting {
              name
              description
              fieldTypeSettingsMeta {
                impactOnWpgraphql
              }
            }
          }
        }
      }
    }
  `,
}

export default Component