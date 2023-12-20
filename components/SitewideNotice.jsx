import { gql } from '@apollo/client'

SitewideNotice.fragment = gql`
  fragment SitewideNoticeFragment on RootQuery {
    sitewideNotice {
      sitewideNoticeFields {
        displayNotice
        message
      }
    }
  }
`

export function SitewideNotice({ displayNotice = false, message = '' }) {
  if (displayNotice) {
    return (
      <div className="fixed inset-x-0 top-0 z-50 inline h-12 bg-sky-100 p-3 text-sky-900 dark:bg-sky-800 dark:text-sky-200">
        <p className="text-center text-sm font-medium">{message}</p>
      </div>
    )
  }
}
