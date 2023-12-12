import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import clsx from 'clsx';
import Prism from 'prism-react-renderer/prism';
import { useTheme } from 'next-themes';

(typeof global !== "undefined" ? global : window).Prism = Prism;
require('prismjs/components/prism-php');

import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import darkTheme from 'prism-react-renderer/themes/nightOwl';

export const highlightCode = (code, language, highlightLines = []) => {
  const { theme, systemTheme, resolvedTheme } = useTheme();

  // Determine the appropriate theme
  const getTheme = () => {
    if (!resolvedTheme) return lightTheme; // Default or loading theme
    return theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? darkTheme : lightTheme;
  };

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={getTheme()}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={clsx(className, 'code-highlight', 'not-prose')} style={{ display: 'flex' }}>
          <pre className="flex-1 overflow-x-auto p-2 text-sm" style={style}>
            <code>
              {tokens.map((line, i) => {
                const lineNumber = i + 1;
                const isHighlighted = highlightLines.includes(lineNumber);
                const lineProps = getLineProps({ line, key: i });

                return (
                  <div
                    key={i}
                    {...lineProps}
                    style={{ ...lineProps.style, display: 'flex' }}
                    className={clsx({ 'highlighted-line': isHighlighted })}
                  >
                    <span className="line-content">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  );
};
