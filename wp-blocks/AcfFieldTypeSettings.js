import { gql } from "@apollo/client";

const AcfFieldTypeSettings = (props) => {
    // @todo: this component should render a table of settings for the field type, similar to what's seen on pages like: https://www.advancedcustomfields.com/resources/email/#settings
    return <pre>{JSON.stringify(props, null, 2 )}</pre>
}

export default AcfFieldTypeSettings;

AcfFieldTypeSettings.displayName = `AcfFieldTypeSettings`;
AcfFieldTypeSettings.config = {
    name: `AcfFieldTypeSettings`,
};
AcfFieldTypeSettings.fragments = {
        key: `AcfFieldTypeSettings`,
        // @todo: the fragment should be updated to fetch the fields for the field type, and return a list of the selected settings for the Field Type.
        entry: gql`fragment AcfFieldTypeSettings on AcfFieldTypeSettings { test: renderedHtml }`,
};