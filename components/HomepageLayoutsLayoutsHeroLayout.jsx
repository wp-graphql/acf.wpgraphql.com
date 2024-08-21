import clsx from 'clsx'
import { Fragment } from 'react'

import { gql } from '@apollo/client'
import Highlight, { defaultProps } from 'prism-react-renderer'


import { Button } from '@/components/Button'


function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

const HomepageLayoutsLayoutsHeroLayout = (hero) => {
  return (
    <div className="overflow-hidden bg-white dark:-mb-32 dark:-mt-18 dark:bg-navy dark:pb-32 dark:pt-18 dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <div
                className="inline font-display text-5xl tracking-tight text-slate-900 dark:text-slate-200"
                dangerouslySetInnerHTML={{ __html: hero.title }}
              />
              <div
                className="mt-3 text-2xl tracking-tight text-gray-600 dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: hero.description }}
              />
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button href={hero.getStartedLink.contentNode.uri}>
                  {hero.getStartedLink.linkText}
                </Button>
                <Button href={hero.githubLink.url} variant="secondary">
                  {hero.githubLink.linkText}
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-300 via-orange-300/70 to-orange-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-300 via-orange-300/70 to-orange-300 opacity-10" />
              <div className="relative rounded-2xl bg-slate-900 ring-1 ring-white/10 backdrop-blur dark:bg-[#0A101F]/80">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-orange-300/0 via-orange-300/70 to-orange-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0" />
                <div className="pl-4 pt-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  <div className="mt-4 flex space-x-2 text-xs">
                    <div
                      key={hero?.codeFileName || 'query-acf-fields.gql'}
                      className="flex h-6 rounded-full bg-gradient-to-r from-orange-400/30 via-orange-400 to-orange-400/30 p-px font-medium text-orange-300"
                    >
                      <div className="flex items-center rounded-full bg-slate-800 px-2.5">
                        {hero?.codeFileName || null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm">
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length:
                          hero?.codeSample &&
                          hero.codeSample.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={hero?.codeSample || null}
                      language={`graphql`}
                      theme={undefined}
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={clsx(
                            className,
                            'flex overflow-x-auto pb-6',
                          )}
                          style={style}
                        >
                          <code className="px-4">
                            {tokens.map((line, lineIndex) => {

                                const lineProps = getLineProps({ line }) || {};
                                const linePropsKey = lineProps.key || lineIndex;
                                delete lineProps.key; // delete key to prevent React warning
                                return  (
                                <div {...lineProps} key={linePropsKey}>
                                  {line.map((token, tokenIndex) => {

                                    const tokenProps = getTokenProps({ token }) || {};
                                    const tokenPropsKey = tokenProps.key || tokenIndex;
                                    delete tokenProps.key; // delete key to prevent React warning

                                    return (
                                      <span
                                          key={tokenPropsKey}
                                          {...tokenProps}
                                      />
                                    )
                                  })}
                                </div>
                              )}
                            )}
                          </code>
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ACFE_AdvancedLink = gql`
  fragment AcfeAdvancedLink on ACFE_AdvancedLink {
    linkText
    shouldOpenInNewWindow
    ... on ACFE_AdvancedLink_Url {
      url
    }
    ... on ACFE_AdvancedLink_ContentNode {
      contentNode {
        uri
      }
    }
  }
`

HomepageLayoutsLayoutsHeroLayout.fragment = gql`
  fragment HomepageLayoutsLayoutsHeroLayout on LayoutHero_Fields {
    title
    description
    getStartedLink {
      ...AcfeAdvancedLink
    }
    githubLink {
      ...AcfeAdvancedLink
    }
    codeSample
    codeFileName
  }
  ${ACFE_AdvancedLink}
`

export default HomepageLayoutsLayoutsHeroLayout
