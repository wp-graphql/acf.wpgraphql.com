import Image from 'next/image'
import Link from 'next/link'

export function FieldTypesList({ data }) {
  const {
    node: { contentNodes },
  } = data

  if (!contentNodes.nodes || !contentNodes.nodes.length) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>
  }

  return (
    <section id="field-types" aria-label="Field Types" className="">
      <div className="">
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">
          WPGraphQL for ACF exposes ACF Fields to the GraphQL Schema allowing
          you to query for the data managed by ACF.
        </p>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">
          Below you will find a list of the Field Types that are supported by
          WPGraphQL for ACF and documentation for how to query for them.
        </p>
      </div>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {contentNodes.nodes.map((fieldType) => (
          <div
            key={fieldType.uri}
            className="dark:bg-white/2.5 group relative flex flex-col rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-gray-800 dark:hover:bg-gray-900 dark:hover:shadow-black/5"
          >
            <Link
              href={fieldType.uri}
              tabIndex={0}
              className="absolute inset-0 z-20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900/75 focus:ring-offset-2"
              aria-label={`${fieldType.title} field type`}
            />
            <div className="ring-zinc-900/7.5 absolute inset-0 rounded-2xl ring-1 ring-inset group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
            <div className="relative z-10 flex h-full flex-col rounded-2xl px-4 pb-4 pt-16">
              {fieldType?.featuredImage?.node && (
                <Image
                  src={fieldType?.featuredImage?.node.sourceUrl}
                  width={400}
                  height={400}
                  alt={
                    fieldType?.featuredImage?.node.altText ??
                    'screenshot of the field type'
                  }
                  layout="responsive"
                  className="shrink-0"
                />
              )}
              <div className="mt-auto">
                <h3 className="pb-4 pt-6 text-center font-semibold text-gray-900 dark:text-gray-100">
                  {fieldType.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
