import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'
import Link from 'next/link'

const faqs = [
    [
      {
        question: 'Can I use ACF Free or Pro with WPGraphQL for ACF?',
        answer:
          'Yes! WPGraphQL for ACF works great with ACF Free and Pro. The Pro version of ACF has some additional features, such as Flexible Content Fields, Repeater Fields and Options Pages that are supported by WPGraphQL for ACF.',
      },
      {
        question: 'How much does WPGraphQL for ACF cost?',
        answer: 'WPGraphQL for ACF is a FREE open-source plugin. The development is sponsored by WPEngine.',
      },
      {
        question: 'Does this work with ACF Extended?',
        answer:
          'Yes! WPGraphQL for ACF allows you to query for (most) fields created with ACF Extended.',
      },
      {
        question: 'Do I have to use Faust.js to use WPGraphQL for ACF?',
        answer:
          'No! While this site is built using Fuast.js and Next.js, you can use WPGraphQL for ACF with any GraphQL client, including <a href="https://www.apollographql.com/docs/react/" target="_blank" rel="nofollow">Apollo</a>, <a href="https://relay.dev/" target="_blank" rel="nofollow">Relay</a>, <a href="https://formidable.com/open-source/urql/" target="_blank" rel="nofollow">Urql</a>, etc.',
      },
    ],
    [
      {
        question: 'Does WPGraphQL for ACF support GraphQL Mutations?',
        answer:
          'GraphQL Mutations are not yet supported. We are working on adding support for Mutations in the future. We are waiting for the GraphQL "@oneOf" directive to be merged into the GraphQL spec before we add support for Mutations.',
      },
      {
        question:
          'Can I filter and sort queries by ACF Fields using WPGraphQL for ACF?',
        answer:
          'At this time WPGraphQL for ACF does not support filtering or sorting queries by ACF Fields. "Meta Queries" are often very expensive to execute, so we currently do not support filtering by ACF fields out of the box, but are exploring options for supporting it without the performance penalty.',
      },
      {
        question:
          'I have an ACF Extension that adds a new field type, will it work with WPGraphQL for ACF?',
        answer:
          'WPGraphQL for ACF supports the field types that come with ACF (Free and PRO) as well as the field typs in ACF Extended (Free and PRO). Support for additional field types can be added by using the "register_graphql_acf_field_type" API.',
      },
    ],
    [
      {
        question: 'Does this work with Field Groups registered in PHP or JSON?',
        answer:
          'Yes! You can register ACF Field Groups and Fields using the Admin UI, PHP or JSON. WPGraphQL for ACF will detect the Field Groups and Fields and add them to the GraphQL Schema. If using PHP or JSON, you will need to set the "show_in_graphql" setting to "true" to expose the Field Group and Fields to the GraphQL Schema. There might be other settings that need attention at the field group or field level that might impact the schema or field resolution.',
      },
      {
        question: 'I think I found a bug, where do I report it?',
        answer: `If you think you found a bug, please <a href="https://github.com/wp-graphql/wpgraphql-acf/issues/new/choose" target="_blank" rel="nofollow">open an issue on GitHub</a>. The more details you provide in the issue, and the more clear your steps to reproduce are, the higher chances we will be able to help.`,
      },
      {
        question: 'Do I need WPGraphQL and ACF to be active to use this?',
        answer:
          'This plugin is a "bridge" plugin that brings functionality of ACF to WPGraphQL. Both WPGraphQL and ACF need to be installed and active in your WordPress installation for this plugin to work.',
      },
    ],
  ]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 py-20 sm:py-32"
    >
      
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0 prose dark:prose-invert">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight dark:text-slate-200 text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight dark:text-slate-300 text-slate-700">
            These are some common questions we get asked. If you have any other questions, please check out the <Link href="/introduction">documentation</Link> or <Link href="https://join.slack.com/t/wp-graphql/shared_invite/zt-3vloo60z-PpJV2PFIwEathWDOxCTTLA">join our Slack community</Link>.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 dark:text-slate-200 text-slate-900">
                      {faq.question}
                    </h3>
                    <div className="prose dark:prose-invert mt-4 text-sm dark:text-slate-300 text-slate-700" dangerouslySetInnerHTML={{__html: faq.answer }} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}