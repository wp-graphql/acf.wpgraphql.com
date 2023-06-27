import Image from 'next/image'
import Link from 'next/link'

export function FieldTypesList({ data }) {

    const { node: { contentNodes } } = data;

    if ( ! contentNodes.nodes || ! contentNodes.nodes.length ) {
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
  

  return (
    <section
      id="field-types"
      aria-label="Field Types"
      className=""
    >
        <div className="">
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">
            WPGraphQL for ACF exposes ACF Fields to the GraphQL Schema allowing you to query for the data managed by ACF.
          </p>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">
            Below you will find a list of the Field Types that are supported by WPGraphQL for ACF and documentation for how to query for them.
          </p>
        </div>
        <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
          {contentNodes.nodes.map((fieldType) => (
            <div
            key={fieldType.uri}
            className="group relative flex rounded-2xl bg-zinc-50 dark:bg-gray-800 dark:hover:bg-gray-900 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
          >
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
                <div className="relative rounded-2xl px-4 pt-16 pb-4">
                { fieldType?.featuredImage?.node && 
                    <Image 
                        src={fieldType?.featuredImage?.node.sourceUrl} 
                        width={400}
                        height={400}
                        alt={fieldType?.featuredImage?.node.altText ?? 'screenshot of the field type'}
                    /> 
                }
                <h3 className="mt-6 font-semibold text-gray-900 dark:text-gray-100">
                    <Link href={fieldType.uri}>
                        <span className="absolute inset-0 rounded-2xl" />
                        {fieldType.title}
                    </Link>
                </h3>
                </div>
            </div>
          ))}
        </div>
    </section>
  )
}
