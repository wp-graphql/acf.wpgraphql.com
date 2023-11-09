import { gql } from '@apollo/client';
import { getGraphqlEndpoint } from '@faustwp/core';
import React from 'react';

import { MiniGraphQL } from '@/components/MiniGraphQL';

export function AcfGraphqlQuery({ graphqlQueryBlockMeta }) {
  const { query, variables } = graphqlQueryBlockMeta;

  return (
    <MiniGraphQL
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
