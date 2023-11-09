import hljs from 'highlight.js/lib/core'
import graphql from 'highlight.js/lib/languages/graphql'
import json from 'highlight.js/lib/languages/json'
import React, { useState, useEffect, useRef } from 'react'

import 'highlight.js/styles/atom-one-dark.css'
import DraggablePaneContainer from './DraggablePaneContainer'

// Register GraphQL and JSON for syntax highlighting
hljs.registerLanguage('graphql', graphql)
hljs.registerLanguage('json', json)

export function MiniGraphQL({ initialQuery, initialVariables, endpoint }) {
  const [query, setQuery] = useState(initialQuery || '')
  const [variables, setVariables] = useState(initialVariables || {})
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const queryRef = useRef(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(highlightQuery, []) // Highlight query on mount

  function highlightQuery() {
    if (query && queryRef.current) {
      queryRef.current.innerHTML = hljs.highlight(query, {
        language: 'graphql',
      }).value
    }
  }

  function resetForm() {
    setQuery(initialQuery || '') // Reset query to initial
    setVariables(initialVariables || {}) // Reset variables to initial
    setData(null) // Clear fetched data
    setError(null) // Clear any errors
  }

  async function fetchData() {
    if (loading) return // Prevent fetching if already loading

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      })

      const result = await response.json()
      if (response.ok && result.data) {
        setData(result.data)
      } else {
        setError(
          new Error(
            result.errors?.map((e) => e.message).join('\n') ||
              'Error fetching data',
          ),
        )
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  function handleQueryChange() {
    if (queryRef.current) {
      setQuery(queryRef.current.textContent)
      resetForm() // Reset the form when query changes
    }
  }

  function handleBlur() {
    highlightQuery() // Re-highlight the query on blur
  }

  function handleRunQuery() {
    if (data) {
      resetForm() // Act as reset if data is present
    } else {
      fetchData() // Fetch data if no data present
    }
  }

  return (
    <div className="mini-graphql flex w-full flex-col">
      <DraggablePaneContainer>
        <div className="query-panel h-full flex-1 overflow-auto">
          <pre
            ref={queryRef}
            className="not-prose graphql-query content-editable overflow-auto p-1 dark:bg-gray-800 dark:text-white text-sm"
            contentEditable={!loading}
            onInput={handleQueryChange}
            onBlur={handleBlur}
            suppressContentEditableWarning={true}
          />
        </div>
        <div className="response-panel h-full flex-1 overflow-auto">
          <div className="data-panel h-full">
            {error && (
              <pre className="not-prose p-1 text-red-500 text-sm">{error.message}</pre>
            )}
            {data && (
              <pre className="not-prose json-data h-full overflow-auto p-1 dark:bg-gray-800 dark:text-white text-sm">
                <code className="whitespace-pre-wrap">
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            )}
          </div>
        </div>
      </DraggablePaneContainer>
      <div className="button-panel flex py-4">
        <button
          onClick={handleRunQuery}
          disabled={loading}
          className="run-query-button rounded bg-blue-500 px-4 py-2 text-sm text-white font-semibold hover:bg-blue-700 disabled:bg-blue-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:disabled:bg-gray-500 lg:text-base"
        >
          {loading ? 'Loading...' : data ? 'Reset' : 'Run Query'}
        </button>
      </div>
    </div>
  )
}
