import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { gql } from '@apollo/client'

const FeatureTabsLeft = (layout) => {
  console.log( { layout })
  const { features } = layout;
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="Features of WPGraphQL for ACF"
      className="relative overflow-hidden bg-slate-100  dark:bg-slate-800 pb-28 pt-20 sm:py-32"
    >
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-gray dark:text-white sm:text-4xl md:text-5xl">
            Model Your Data with Advanced Custom Fields. <br/>Query it with GraphQL.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-gray dark:text-white">
            Use ACF to create Custom Post Types, Custom Taxonomies, Field Groups and fields using the ACF admin UIs, PHP or JSON. <br/> Access the data using GraphQL.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.name}
                      className={clsx(
                        'group relative rounded-full px-4 my-2  py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-slate-600 dark:bg-slate-800 lg:dark:bg-slate-700 lg:ring-1 lg:ring-inset lg:ring-white/10 group-hover:text-white '
                          : 'hover:bg-slate-600 dark:hover:bg-slate-800 lg:dark:hover:bg-slate-700 bg-gray-100 group-hover:text-white'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-white dark:text-slate-200 hover:text-white group-hover:text-white dark:hover:text-slate-300 lg:dark:hover:text-slate-200'
                              : 'text-slate-800 hover:text-white group-hover:text-white dark:hover:text-slate-200'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.name}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block group-hover:text-white  dark:group-hover:text-slate-200',
                          selectedIndex === featureIndex
                            ? 'text-slate-800 lg:text-white dark:text-slate-200'
                            : 'text-slate-800'
                        )}
                      >
                        {feature.featureDescription}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.name} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-slate-200 dark:bg-slate-700 lg:bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-slate-800 dark:text-white sm:text-center">
                        {feature.featureDescription}
                      </p>
                    </div>
                    <div className="mt-20 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={feature.featureImage.node.sourceUrl}
                        alt={feature.featureImage.node.altText}
                        width={feature?.featureImage?.node?.mediaDetails?.width || '1087'}
                        height={feature?.featureImage?.node?.mediaDetails?.height || '732'}
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  )
}

FeatureTabsLeft.fragment = gql`
fragment FeatureTabsLeft on LayoutFeatureTabs_Fields {
  layout
  name
  description
  features {
    name
    featureDescription
    featureImage {
      node {
        altText
        sourceUrl
        mediaDetails {
          width
          height
        }
      }
    }
  }
}
`;

export default FeatureTabsLeft;