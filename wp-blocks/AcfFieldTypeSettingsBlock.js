import { gql } from '@apollo/client'

const Component = (props) => {
  // @todo: this component should render a table of settings for the field type, similar to what's seen on pages like: https://www.advancedcustomfields.com/resources/email/#settings
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

export default Component

Component.displayName = `AcfFieldTypeSettingsBlock`
Component.config = {
  name: `AcfFieldTypeSettingsBlock`,
}
Component.fragments = {
  key: `AcfFieldTypeSettingsBlockFragment`,
  // @todo: the fragment should be updated to fetch the fields for the field type, and return a list of the selected settings for the Field Type.
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
