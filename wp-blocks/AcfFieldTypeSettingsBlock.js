import { gql } from '@apollo/client'
import Image from 'next/image'
import { Fragment } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { InfoIcon } from '@/components/icons/InfoIcon'

export function AcfFieldTypeSettingsBlock({ fieldTypeSettingsBlockFields }) {
  const { fieldTypeSettings } = fieldTypeSettingsBlockFields

  return (
    <>
      {fieldTypeSettings?.nodes?.map((item) => {
        const { id, name, description, fieldTypeSettingsMeta } = item
        const { impactOnWpgraphql, adminScreenshot } = fieldTypeSettingsMeta

        return (
          <Fragment key={id}>
            <div className="mb-2">
              <div className="flex">
                <h3 className="m-0 inline-flex">{name}</h3>
                <Popover className="ml-3">
                  <PopoverTrigger>
                    <div className="m-2 p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-800">
                      <InfoIcon />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-full">
                    <Image
                      src={adminScreenshot?.node?.mediaItemUrl}
                      alt={adminScreenshot?.node?.altText}
                      width={adminScreenshot?.node?.mediaDetails?.width}
                      height={adminScreenshot?.node?.mediaDetails?.height}
                    />
                    {description && <p className='sr-only'>{description}</p>}
                  </PopoverContent>
                </Popover>
              </div>
              {impactOnWpgraphql ? (
                <span dangerouslySetInnerHTML={{ __html: impactOnWpgraphql }} />
              ) : (
                <span className="italic">
                  Impact on WPGraphQL not yet documented
                </span>
              )}
            </div>
          </Fragment>
        )
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
                adminScreenshot {
                  node {
                    mediaItemUrl
                    altText
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
}
