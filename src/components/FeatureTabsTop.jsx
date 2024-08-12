import { gql } from '@apollo/client';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';

import { Container } from '@/components/Container';
import { preventOrphans } from '@/lib/utils';

function Feature({ feature, isActive, className, ...props }) {
  return (
    <div
      className={clsx(
        className,
        'rounded-lg p-5',
        !isActive
          ? 'opacity-75 hover:bg-slate-50 hover:opacity-100 dark:hover:bg-slate-900'
          : 'bg-slate-100 dark:bg-slate-900',
      )}
      {...props}
    >
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-blue-500' : 'text-gray-500',
        )}
      >
        {feature.featureSubtitle}
      </h3>
      <p className="mt-2 text-left font-display text-xl text-slate-900 dark:text-slate-50">
        {feature.name}
      </p>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-200">
        {feature.featureDescription}
      </p>
    </div>
  );
}

function FeaturesMobile({ features }) {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8  sm:-inset-x-6" />
            <div className="relative mx-auto w-[30.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              {feature.featureImage && (
                <Image
                  className="w-full"
                  src={feature.featureImage.node.sourceUrl}
                  alt={feature.featureImage.node.altText}
                  width={feature.featureImage.node.mediaDetails.width}
                  height={feature.featureImage.node.mediaDetails.height}
                  sizes="30.75rem"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop({ features }) {
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
                    <Tab className="text-left [&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {preventOrphans(feature.name)}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="relative mt-20 overflow-hidden rounded-xl bg-slate-200 px-14 py-16 dark:bg-slate-900 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.name}
                  className={clsx(
                    'px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none',
                    featureIndex !== selectedIndex && 'opacity-60',
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    {feature.featureImage && (
                      <Image
                        className="w-full"
                        src={feature.featureImage.node.sourceUrl}
                        alt={feature.featureImage.node.altText}
                        width={feature.featureImage.node.mediaDetails.width}
                        height={feature.featureImage.node.mediaDetails.height}
                        sizes="52.75rem"
                      />
                    )}
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className="rounded-4xl pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/10" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
}

const FeatureTabsTop = (feature) => {
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            {feature.name}
          </h2>
          <div className="mt-4 text-lg tracking-tight text-slate-700 dark:text-slate-100" dangerouslySetInnerHTML={{__html: feature.description }} />
        </div>
        <FeaturesMobile features={feature.features} />
        <FeaturesDesktop features={feature.features} />
      </Container>
    </section>
  );
}

FeatureTabsTop.fragment = gql`
  fragment FeatureTabsTop on LayoutFeatureTabs_Fields {
    layout
    name
    description
    features {
      name
      featureSubtitle
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

export default FeatureTabsTop;
