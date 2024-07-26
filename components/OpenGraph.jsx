import { gql } from '@apollo/client';
import Head from 'next/head';

const OpenGraph = ({ seo }) => {
  if (!seo) return null;

  const {
    metaDesc = '',
    opengraphDescription = '',
    opengraphImage = { sourceUrl: '/default-og-image.jpg' },
    opengraphTitle = '',
    opengraphType = 'website',
    opengraphUrl = '',
    title = '',
    twitterDescription = '',
    twitterTitle = '',
  } = seo;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:url" content={opengraphUrl} />
      <meta property="og:type" content={opengraphType} />
      <meta property="og:title" content={opengraphTitle} />
      <meta property="og:description" content={opengraphDescription} />
      <meta property="og:image" content={opengraphImage?.sourceUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={opengraphUrl} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={opengraphImage?.sourceUrl} />
    </Head>
  );
};

OpenGraph.fragments = {
  contentNode: gql`
    fragment OpenGraph on ContentNode {
      seo {
        metaDesc
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
        opengraphTitle
        opengraphType
        opengraphUrl
        title
        twitterDescription
        twitterTitle
      }
    }
  `
};

export default OpenGraph;
