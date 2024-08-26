import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { useTheme } from 'next-themes';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';


const MiniGraphiQLClient = ({ initialQuery, initialVariables, endpoint, readOnly }) => {
  const [GraphiQL, setGraphiQL] = useState(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (typeof window !== 'undefined') {
        try {
          const GraphiQLModule = await import('graphiql');
          await import('graphiql/graphiql.min.css');
          if (isMounted) {
            setGraphiQL(() => GraphiQLModule.default);
          }
        } catch (error) {
          console.error('Failed to load GraphiQL module:', error);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('graphiql:tabState');
      localStorage.setItem('graphiql:theme', theme);

      // Check for the theme and update the body class
      const bodyClassList = document.body.classList;
      if (theme === 'dark') {
        bodyClassList.add('graphiql-dark');
      } else {
        bodyClassList.remove('graphiql-dark');
      }
    }
  }, [theme]);

  // Create a fetcher that only uses GET requests
  const fetcher = createGraphiQLFetcher({
    url: endpoint,
    fetch: async (url, options) => {
      const parsedBody = JSON.parse(options?.body);
      
      const params = new URLSearchParams();
      params.append('query', parsedBody.query);
      if (options.body.variables) {
        params.append('variables', JSON.stringify(parsedBody.variables));
      }
      const getUrl = `${url}&${params.toString()}`;

      // Make the GET request
      const res = await fetch(getUrl, { 
        method: 'GET', 
        headers: options?.headers,
      });

       // Clone the response to modify it
       const clonedResponse = res.clone();

       // Read and modify the response
      const responseData = await clonedResponse.json();
      if (responseData.extensions) {
        delete responseData.extensions;
      }

      // Create a new response with the modified data
      const newResponse = new Response(JSON.stringify(responseData), {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
      });

      return newResponse;
    }
  });

  const graphiqlStyles = `
    .graphiql-container {
      height: fit-content;
      background-color: transparent !important;
      font-size: 14px;
      border-radius: 4px;
      padding: 0.5rem;
      display: flex;
      min-height: 600px; 
    }
    .graphiql-container .graphiql-editors.full-height {
      margin-top: 8px;
    }
    .graphiql-container .graphiql-query-editor {
      border-bottom: 0;
      padding: 6px;
      column-gap: 6px;
    }
    .graphiql-container .graphiql-response .result-window {
      padding-top: 8px;
    }
    .graphiql-container .graphiql-sessions {
      border-radius: 2px;
    }
    .graphiql-container .graphiql-editors {
      border-radius: 2px;
    }
    .graphiql-container * {
      box-shadow: none !important;
    }
    .graphiql-container .graphiql-session-header {
      display: none;
    }
    .graphiql-container .graphiql-sidebar {
      display: none;
    }
    .graphiql-container .graphiql-editor-tools button:nth-child(2) {
      display: none; /* headers tab */
    }
    .graphiql-toolbar button:nth-child(2) {
      display: none; /* prettify button */
    }
    .graphiql-toolbar button:nth-child(3) {
      display: none; /* merge fragment button */
    }
  `;

  return (
    <div className={resolvedTheme}>
      <style dangerouslySetInnerHTML={{ __html: graphiqlStyles }} />
      {GraphiQL ? (
        <GraphiQL
          fetcher={fetcher}
          shouldPersistHeaders={false}
          query={initialQuery}
          variables={initialVariables}
          readOnly={readOnly}
        />
      ) : (
        <div>Loading GraphiQL...</div>
      )}
    </div>
  );
};

MiniGraphiQLClient.propTypes = {
  initialQuery: PropTypes.string,
  initialVariables: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

MiniGraphiQLClient.defaultProps = {
  initialQuery: '# Type a GraphQL query here',
  initialVariables: '{}',
  readOnly: false,
};

export default MiniGraphiQLClient;
