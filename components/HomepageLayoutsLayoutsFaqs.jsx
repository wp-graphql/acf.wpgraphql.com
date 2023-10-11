import { Container } from '@/components/Container'
import { gql } from '@apollo/client'

const getColumns = (questions, numberOfColumns) => {
  
  let columns = [];
  // start with the middle column to keep things centered
  let currentColumn = 1;
  questions && questions.map(question => {
    if (currentColumn >= numberOfColumns) {
      currentColumn = 0;
    }
    if ( !columns[currentColumn] ) {
      columns[currentColumn] = [];
    }
    columns[currentColumn].push(question);
    currentColumn++;
  })

  return columns;
};

const HomepageLayoutsLayoutsFaqs = ({ title, description, questions }) => {

  const columns = getColumns(questions, 3);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-100 dark:bg-slate-800 py-20 sm:py-32"
    >
      
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0 prose dark:prose-invert">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight dark:text-slate-200 text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg tracking-tight dark:text-slate-300 text-slate-700" dangerouslySetInnerHTML={{__html: description}} />
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

HomepageLayoutsLayoutsFaqs.fragment = gql`
fragment HomepageLayoutsLayoutsFaqs on LayoutFaqs_Fields {
  title
  description
  questions {
    question
    answer
  }
}
`;

export default HomepageLayoutsLayoutsFaqs;