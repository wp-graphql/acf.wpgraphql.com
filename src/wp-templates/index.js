import SingleAcfFieldType from "@/wp-templates/SingleAcfFieldType";
import {HeroPattern} from "@/components/HeroPattern";
import ArchiveGuides from "@/wp-templates/archive-guides";
import ArchiveAcfFieldType from "@/wp-templates/ArchiveAcfFieldType";
import {gql} from "@apollo/client";
import { Layout, LayoutFragment } from "@/components/Layout";
import IndexTemplate from "./IndexTemplate";

const FrontPage = ({ data }) => {
    return (
        <Layout>
            <HeroPattern />
            <h2>Hello.</h2>
            <>
                { data.__schema.types.map( type => {
                    if ( ! type.fields ) {
                        return null;
                    }

                    let fieldsWithConnection = type.fields.filter( field => {
                        if ( ! field?.type?.interfaces?.length > 0 ) {
                            return false;
                        }

                        let withConnection = field.type.interfaces.filter( interfaceType => {
                            if ( interfaceType.name === 'Connection' ) {
                                return interfaceType;
                            }
                        })

                        if ( ! withConnection.length > 0 ) {
                            return false;
                        }

                        return field;

                    } );

                    if ( ! fieldsWithConnection || ! fieldsWithConnection.length > 0 ) {
                        return null;
                    }

                    return (
                        <>
                        <h2>Type: ${type.name}</h2>
                            <ul>
                            {
                                fieldsWithConnection.map( field => {
                                    return (
                                        <li>{field.name}</li>
                                    )
                                })
                            }
                            </ul>

                        </>
                    );

                })}
            </>

        </Layout>

    )
};

FrontPage.query = gql`
{
 ...LayoutFragment
  __schema {
    types {
      name
      kind
      fields {
        name
        type {
          kind
          interfaces {
            name
          }
        }
      }
    }
  }
}
${LayoutFragment}
`

const templates = {
    "archive-guides": ArchiveGuides,
    "index": IndexTemplate,
    "archive-field_type": ArchiveAcfFieldType,
    "single-field_type": SingleAcfFieldType,
}

export default templates;
