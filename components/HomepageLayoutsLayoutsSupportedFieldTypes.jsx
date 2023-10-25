import { gql } from '@apollo/client'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Container } from '@/components/Container'


function FieldType({ title, uri, featuredImage, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Link href={uri}>
        <div className="text-gray-900">
          {featuredImage?.node?.sourceUrl && (
            <Image
              src={featuredImage?.node?.sourceUrl}
              alt={featuredImage?.node?.altText || title}
              width={200}
              height={200}
              className="mx-auto"
            />
          )}
          <p className="mt-4 text-lg font-semibold leading-6">{title}</p>
        </div>
      </Link>
    </figure>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function FieldTypeColumn({
  className,
  fieldTypes,
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef()
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current.offsetHeight)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {fieldTypes.concat(fieldTypes).map((fieldType, fieldTypeIndex) => (
        <FieldType
          key={fieldTypeIndex}
          aria-hidden={fieldTypeIndex >= fieldTypes.length}
          className={reviewClassName(fieldTypeIndex % fieldTypes.length)}
          {...fieldType}
        />
      ))}
    </div>
  )
}

function FieldTypeGrid({ fieldTypes }) {
  let containerRef = useRef()
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns =
    fieldTypes && fieldTypes.length > 0 ? splitArray(fieldTypes, 3) : null

  if (!columns) {
    return null
  }

  columns = [columns[0], columns[1], splitArray(columns[2], 2)]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 "
    >
      {isInView && (
        <>
          <FieldTypeColumn
            fieldTypes={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  'md:hidden',
                reviewIndex >= columns[0].length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <FieldTypeColumn
            fieldTypes={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && 'lg:hidden'
            }
            msPerPixel={15}
          />
          <FieldTypeColumn
            fieldTypes={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50 dark:from-slate-700" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 dark:from-slate-700" />
    </div>
  )
}

const HomepageLayoutsLayoutsSupportedFieldTypes = (data) => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 dark:bg-slate-700 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="mb-5 text-3xl font-medium tracking-tight text-gray-900 dark:text-gray-100 sm:text-center"
        >
          {data.title}
        </h2>
        <div
          className="mt-2 text-lg text-gray-600 dark:text-gray-200 sm:text-center"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        <FieldTypeGrid fieldTypes={data?.fieldTypes?.nodes} />
      </Container>
    </section>
  )
}

HomepageLayoutsLayoutsSupportedFieldTypes.fragment = gql`
  fragment HomepageLayoutsLayoutsSupportedFieldTypes on LayoutSupportedFieldTypes_Fields {
    title
    description
    fieldTypes(first: 100) {
      nodes {
        __typename
        ... on FieldType {
          title
          uri
          featuredImage {
            node {
              id
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`

export default HomepageLayoutsLayoutsSupportedFieldTypes
