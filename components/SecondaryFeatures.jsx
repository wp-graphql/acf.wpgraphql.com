import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import screenshotContacts from '@/images/placeholder.svg'
import screenshotInventory from '@/images/placeholder.svg'
import screenshotProfitLoss from '@/images/placeholder.svg'

const features = [
  {
    name: 'Model your data',
    summary: 'Create ACF Field Groups',
    description:
      'Each ACF Field Group that is set to "show_in_graphql" will be added to the GraphQL Schema and will have a corresponding GraphQL Object type and will implement the "AcfFieldGroup" interface.',
    image: screenshotProfitLoss,
  },
  {
    name: 'Fetch your data',
    summary:
      'Use GraphQL Queries and Fragments',
    description:
      'WPGraphQL for ACF adds GraphQL Object Types and Interfaces for each field group. This enables each Component to specify the exact data it needs using GraphQL Queries and Fragments.',
    image: screenshotInventory,
  },
  {
    name: 'Render your data',
    summary:
      'Use the data from GraphQL in your front-end',
    description:
      'Components can use the data from GraphQL to render the data in the front-end. You can use any front-end framework you like, or no framework at all.',
    image: screenshotContacts,
  },
]

function Feature({ feature, isActive, className, ...props }) {
  return (
    <div
      className={clsx(className, 'p-5 rounded-lg', !isActive ? 'opacity-75 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-gray-800' : 'bg-slate-100 dark:bg-slate-800')}
      {...props}
    >
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-orange-500' : 'text-gray-500'
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900 dark:text-slate-50">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-200">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  return (
    <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.name}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="relative mt-20 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.name}
                  className={clsx(
                    'px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none',
                    featureIndex !== selectedIndex && 'opacity-60'
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <Image
                      className="w-full"
                      src={feature.image}
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Couple your data needs with your components
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700 dark:text-slate-100">
            Each ACF Field Group is represented by a GraphQL Type. And each "Location" where a field group is assigned implements a "WithAcf*" Interface. 
            This allows ACF Field Groups to be easily coupled with components and re-used.
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
