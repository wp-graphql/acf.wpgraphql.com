import clsx from 'clsx';
import { useTheme } from 'next-themes';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Prism from 'prism-react-renderer/prism';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';

(typeof global !== "undefined" ? global : window).Prism = Prism;
require('prismjs/components/prism-php');

export const HighlightCode = (code, language, highlightLines = []) => {
  const { theme, systemTheme, resolvedTheme } = useTheme();

  const getTheme = () => {
    if (!resolvedTheme) return darkTheme; // Default or loading theme
    return theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? darkTheme : lightTheme;
  };

  // Based on the primary color for the ACF site #00e4bc.
  const highlightedLineStyle = {
    backgroundColor: theme === 'dark'
      ? 'rgba(0, 228, 188, 0.2)'  // dark
      : 'rgba(0, 228, 188, 0.1)', // light
    boxShadow: theme === 'dark'
      ? '-10px 0 0 rgba(0, 228, 188, 0.4), 10px 0 0 rgba(0, 228, 188, 0.2)'  // dark
      : '-10px 0 0 rgba(0, 228, 188, 0.2), 10px 0 0 rgba(0, 228, 188, 0.1)', // light
    display: 'block',
  };

  const lineContentStyle = {
    display: 'inline-block',
    width: '100%',
    paddingLeft: '10px',
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
                    style={isHighlighted ? {...lineProps.style, ...highlightedLineStyle} : lineProps.style}
                    className={clsx({ 'highlighted-line': isHighlighted })}
                  >
                    <span className="line-content" style={lineContentStyle}>
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