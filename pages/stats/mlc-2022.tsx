import { Tab } from '@headlessui/react';
import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { IframeEmbed } from '../../components/embed';
import { PageHeader } from '../../components/header';

function Explainer() {
  return (
    <div className="prose prose-invert mx-auto xl:prose-xl pt-8 px-4">
      <h1>What is the cEDH metagame for MLC 2022?</h1>
      <p>
        The following lists and charts show the same analyses as{' '}
        <Link href="/stats">Stats</Link>, but for the decks drafted during the
        2022 season of the{' '}
        <Link href="https://www.mlcedh.com/">
          Major League Commander tournament
        </Link>
        .
      </p>
    </div>
  );
}

const STAT_GROUPS = [
  {
    title: 'Cards Data',
    src: 'https://cedhstats.com:3000/public/dashboard/49e9e60e-ff0f-4b57-8465-a8400c754817#theme=night&titled=true&bordered=true',
  },
  {
    title: 'Deck Data',
    src: 'https://cedhstats.com:3000/public/dashboard/18901df3-1fd7-43b0-bb65-e416b3a2159c#theme=night&titled=true&bordered=true',
  },
];

function StatsTabs() {
  return (
    <div className="mx-auto max-w-[1200px] pt-16 px-4">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-300/20 p-1">
          {STAT_GROUPS.map((group) => (
            <Tab
              key={group.title}
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-200 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {group.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {STAT_GROUPS.map((group, idx) => (
            <Tab.Panel key={idx}>
              <IframeEmbed src={group.src} maxWidth={1200} height={1600} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>What is the cEDH metagame?</title>
      </Head>
      <PageHeader />
      <Explainer />
      <StatsTabs />
    </>
  );
}
