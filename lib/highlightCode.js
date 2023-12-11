import Highlight, { defaultProps } from 'prism-react-renderer';
import clsx from 'clsx';

export const highlightCode = (code, language, highlightLines = []) => {
  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={clsx(className, 'code-highlight')} style={{ display: 'flex' }}>
          <pre className="flex-1 overflow-x-auto" style={style}>
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
