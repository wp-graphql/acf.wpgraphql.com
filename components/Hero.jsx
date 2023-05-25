import { Fragment } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

import { Button } from '@/components/Button'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'

const codeLanguage = 'graphql'
const code = `
query GetPostWithAcfFields($id: ID!) {
  nodeByUri(uri: $id) {
    __typename
    uri
    ...on NodeWithTitle {
      title
    }
    ...on WithAcfMyFieldGroup {
      myFieldGroup {
        textField
        numberField
      }
    }
}`

const tabs = [
  { name: 'query-acf-fields.gql', isActive: true }
]

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            
            <div className="relative">
              <p className="inline bg-gradient-to-r from-orange-300 via-orange-600 to-orange-300 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                WPGraphQL for <br/> Advanced Custom Fields
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-300">
                WPGraphQL for ACF allows you to use ACF to create post types, taxonomies, field groups and fields and exposes them to the WPGraphQL Schema for use in decoupled front ends.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button href="/introduction/">Get started</Button>
                <Button href="https://github.com/wp-graphql/wpgraphql-acf" variant="secondary">
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="relative">
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-300 via-orange-300/70 to-orange-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-300 via-orange-300/70 to-orange-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-orange-300/0 via-orange-300/70 to-orange-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0" />
                <div className="pl-4 pt-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx(
                          'flex h-6 rounded-full',
                          tab.isActive
                            ? 'bg-gradient-to-r from-orange-400/30 via-orange-400 to-orange-400/30 p-px font-medium text-orange-300'
                            : 'text-slate-500'
                        )}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            tab.isActive && 'bg-slate-800'
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm">
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={code}
                      language={codeLanguage}
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
                            'flex overflow-x-auto pb-6'
                          )}
                          style={style}
                        >
                          <code className="px-4">
                            {tokens.map((line, lineIndex) => (
                              <div key={lineIndex} {...getLineProps({ line })}>
                                {line.map((token, tokenIndex) => (
                                  <span
                                    key={tokenIndex}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))}
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
