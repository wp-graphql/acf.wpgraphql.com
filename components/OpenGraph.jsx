import Head from 'next/head'
import gql from 'graphql-tag'

const OpenGraph = ({ seo } ) => {

    const {
        breadcrumbs = [],
        canonical = '',
        cornerstone  = false,
        focuskw  = '',
        fullHead = '',
        metaDesc = '',
        metaKeywords = '',
        metaRobotsNoindex = false,
        metaRobotsNofollow   = false,
        opengraphAuthor  = '',
        opengraphDescription = '',
        opengraphImage       = null,
        opengraphModifiedTime    = '',
        opengraphPublishedTime   = '',
        opengraphPublisher   = '',
        opengraphSiteName    = '',
        opengraphTitle    = '',
        opengraphType    = '',
        opengraphUrl   = '',
        readingTime  = '',
        schema   = '',
        title    = '',
        twitterDescription   = '',
        twitterImage   = null,
        twitterTitle  = '',
    } = seo

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={metaDesc} />

                <meta property="og:url" content={opengraphUrl} />
                <meta property="og:type" content={opengraphType} />
                <meta property="og:title" content={opengraphTitle} />
                <meta property="og:description" content={opengraphDescription} />
                <meta property="og:image" content={opengraphImage?.sourceUrl || '/default-og-image.jpg'} />

                {/*<meta name="twitter:card" content={} />*/}
                {/*<meta property="twitter:domain" content={} />*/}
                <meta property="twitter:url" content={opengraphUrl} />
                <meta name="twitter:title" content={twitterTitle} />
                <meta name="twitter:description" content={twitterDescription} />
                <meta name="twitter:image" content={opengraphImage?.sourceUrl || '/default-og-image.jpg'} />

            </Head>
        </>
    )
}

OpenGraph.fragments = {
    contentNode: gql`
        fragment OpenGraph on ContentNode {
          seo {
            breadcrumbs {
              __typename
              url
            }
            canonical
            cornerstone
            focuskw
            fullHead
            metaDesc
            metaKeywords
            metaRobotsNoindex
            metaRobotsNofollow
            opengraphAuthor
            opengraphDescription
            opengraphImage {
              sourceUrl
            }
            opengraphModifiedTime
            opengraphPublishedTime
            opengraphPublisher
            opengraphSiteName
            opengraphTitle
            opengraphType
            opengraphUrl
            readingTime
            schema {
              articleType
              pageType
              raw
            }
            title
            twitterDescription
            twitterImage {
              sourceUrl
            }
            twitterTitle
          }
        }
    `
}

export default OpenGraph

