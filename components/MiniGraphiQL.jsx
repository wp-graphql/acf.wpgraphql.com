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

  const fetcher = async (graphQLParams) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw to make sure GraphiQL displays the error
    }
  };

  let parsedVariables = initialVariables;
  if (typeof initialVariables === 'string') {
    try {
      parsedVariables = JSON.parse(initialVariables);
    } catch (e) {
      console.error('Failed to parse variables as JSON:', e);
    }
  }

  const containerStyles = {
    height: '80vh',
    maxHeight: 'auto',
    borderRadius: '4px',
    padding: '0.5rem',
    display: 'flex',
    flex: '1 1 0%',
  };

  const graphiqlStyles = `
    :root {
      color-scheme: ${theme};
    }
    .graphiql-container {
      background-color: transparent !important;
      font-size: 14px;
    }
    .graphiql-container * {
      box-shadow: none !important;
    }
    .graphiql-container .graphiql-editor-tools button:nth-child(2) {
      display: none;
    }
    .graphiql-container .graphiql-editors {
      border-radius: 2px;
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
    .graphiql-container .graphiql-session-header {
      display: none;
    }
    .graphiql-container .graphiql-sessions {
      border-radius: 2px;
    }
    .graphiql-container .graphiql-sidebar {
      display: none;
    }
    .graphiql-toolbar button:nth-child(2) {
      display: none; /* prettify */
    }
    .graphiql-toolbar button:nth-child(3) {
      display: none; /* merge */
    }
  `;

  return (
    <div style={containerStyles} className={resolvedTheme}>
      <style dangerouslySetInnerHTML={{ __html: graphiqlStyles }} />
      {GraphiQL ? (
        <GraphiQL
          fetcher={fetcher}
          shouldPersistHeaders={false}
          query={initialQuery}
          variables={parsedVariables}
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