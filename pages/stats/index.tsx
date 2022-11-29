import { Tab } from '@headlessui/react';
import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { IframeEmbed } from '../../components/embed';
import { PageHeader } from '../../components/header';
import { translationProps } from '../../lib/translations';

function Explainer() {
  return (
    <div className="prose prose-invert mx-auto xl:prose-xl pt-8 px-4">
      <h1>What is the cEDH metagame?</h1>
      <p>
        The analyses below are automatically updated from the{' '}
        <Link
          href="https://cedh.guide/ddb"
          target="_blank"
          rel="noopener noreferrer"
        >
          cEDH Decklist Database
        </Link>
        ,{' '}
        <Link
          href="https://budgetbrews.club/deck-lists/#finals"
          target="_blank"
          rel="noopener noreferrer"
        >
          budgetbrews.club
        </Link>
        , and{' '}
        <Link
          href="https://www.commanderspellbook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Commander Spellbook
        </Link>
        . You can browse these lists and charts to learn more about cEDH deck
        construction, card choices, patterns, and prices. Data collection and
        analysis by the <Link href="/team">cedh.guide team</Link>.
      </p>
      <p>
        <Link href="/stats/mlc-2022">
          See these stats for the 2022 season of the Major League Commander →
        </Link>
      </p>
    </div>
  );
}

const STAT_GROUPS = [
  {
    title: 'What kind of cards are played in cEDH?',
    src: 'https://cedhstats.com:3000/public/dashboard/7b9160e2-025d-4f74-9a6c-9963ac90ee0a#theme=night&titled=true&bordered=true',
  },
  {
    title: 'What kind of decks are played in cEDH?',
    src: 'https://cedhstats.com:3000/public/dashboard/dfebd1ee-7f14-4742-a219-b7000485737d#theme=night&titled=true&bordered=true',
  },
  {
    title: 'Without proxies, how much does cEDH cost?',
    src: 'https://cedhstats.com:3000/public/dashboard/7b4f4e83-9242-4305-99cd-afa95edafa19#theme=night&titled=true&bordered=true',
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

export const getStaticProps = translationProps(['common']);
