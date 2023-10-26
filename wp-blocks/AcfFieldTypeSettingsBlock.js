import { gql } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function AcfFieldTypeSettingsBlock(props) {
  const { fieldTypeSettings } = props?.fieldTypeSettingsBlockFields;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          {/* <TableHead className="text-right whitespace-nowrap">Impact on WPGraphQL</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {fieldTypeSettings?.nodes?.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            {/* <TableCell>{item.impactOnWpgraphql}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

AcfFieldTypeSettingsBlock.displayName = `AcfFieldTypeSettingsBlock`;
AcfFieldTypeSettingsBlock.config = {
  name: `AcfFieldTypeSettingsBlock`,
};
AcfFieldTypeSettingsBlock.fragments = {
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
};