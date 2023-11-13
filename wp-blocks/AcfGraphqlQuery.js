import { gql } from '@apollo/client';
import { getGraphqlEndpoint } from '@faustwp/core';
import dynamic from 'next/dynamic';
import React from 'react';

const MiniGraphiQL = dynamic(
  () => import('@/components/MiniGraphiQL'),
  { ssr: false }
);

export function AcfGraphqlQuery({ graphqlQueryBlockMeta }) {
  const { query, variables } = graphqlQueryBlockMeta;

  return (
    <MiniGraphiQL
      endpoint={getGraphqlEndpoint()}
      initialQuery={query}
      initialVariables={variables}
    />
  );
}

AcfGraphqlQuery.displayName = 'AcfGraphqlQuery';
AcfGraphqlQuery.config = {
  name: 'AcfGraphqlQuery',
};
AcfGraphqlQuery.fragments = {
  key: 'AcfGraphqlQueryFragment',
  entry: gql`
    fragment AcfGraphqlQueryFragment on AcfGraphqlQuery {
      graphqlQueryBlockMeta {
        query
        variables
      }
    }
  `,
};
