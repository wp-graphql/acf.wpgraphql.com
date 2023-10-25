import { gql } from '@apollo/client'

import { Container } from '@/components/Container'

const getColumns = (questions, numberOfColumns) => {
  let columns = []
  // start with the middle column to keep things centered
  let currentColumn = 1
  questions &&
    questions.map((question) => {
      if (currentColumn >= numberOfColumns) {
        currentColumn = 0
      }
      if (!columns[currentColumn]) {
        columns[currentColumn] = []
      }
      columns[currentColumn].push(question)
      currentColumn++
    })

  return columns
}

const HomepageLayoutsLayoutsFaqs = ({ title, description, questions }) => {
  const columns = getColumns(questions, 3)

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-100 py-20 dark:bg-slate-800 sm:py-32"
    >
      <Container className="relative">
        <div className="prose mx-auto max-w-2xl dark:prose-invert lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-200 sm:text-4xl"
          >
            {title}
          </h2>
          <div
            className="mt-4 text-lg tracking-tight text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {columns.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900 dark:text-slate-200">
                      {faq.question}
                    </h3>
                    <div
                      className="prose mt-4 text-sm text-slate-700 dark:prose-invert dark:text-slate-300"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
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

HomepageLayoutsLayoutsFaqs.fragment = gql`
  fragment HomepageLayoutsLayoutsFaqs on LayoutFaqs_Fields {
    title
    description
    questions {
      question
      answer
    }
  }
`

export default HomepageLayoutsLayoutsFaqs
