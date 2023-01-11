import { LazyMotion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FindMyDeckButton } from '../components/deck_finder';
import { YouTubeEmbed } from '../components/embed';
import { PageHeader } from '../components/header';
import { translationProps } from '../lib/translations';

function CedhBanner() {
  const router = useRouter();

  return (
    <div
      className="md:pt-18 mx-auto mb-12 md:mb-20 flex max-w-screen-2xl flex-col items-start px-4 md:px-12 pt-12 md:mt-8 lg:mt-12 lg:pt-24"
      style={{
        backgroundImage: `url(/cedh-guide_card-banner_v2.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="mb-12 max-w-xl text-6xl font-bold leading-tight lg:text-7xl">
        cEDH is Commander, but <em>very</em> spicy.
      </h1>

      <p className="text-2xl font-bold leading-relaxed">
        cEDH is a <em>metagame</em> and <em>mindset</em> where:
      </p>

      <ol className="list-inside list-decimal space-y-2 pt-4 text-2xl font-bold">
        <li>All strategies are accepted.</li>
        <li>Decks majorly affect the game as early as Turn 1.</li>
        <li>Players only make plays that help them win.</li>
        <li>Proxies are encouraged.</li>
      </ol>

      <div className="h-64 mt-8">
        <FindMyDeckButton />
      </div>
    </div>
  );
}

function Explanation() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center mb-12 md:mb-20">
      <h1 className="text-4xl font-bold mb-8 text-center">
        A Longer Explanation:
      </h1>
      <YouTubeEmbed src="https://www.youtube.com/embed/zH_ERuiwJWw" />
    </div>
  );
}

function ExampleGames() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center mb-12 md:mb-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Example Games:</h1>
      <div className="w-full grid xl:grid-cols-2 gap-8 justify-center">
        <YouTubeEmbed src="https://www.youtube.com/embed/zpnY5FpAlbY" />
        <YouTubeEmbed src="https://www.youtube.com/embed/rqjYgspEaCk" />
      </div>
    </div>
  );
}

function LearnMore() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center mb-12 md:mb-20 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Want to learn more and start playing?
      </h1>

      <ol className="list-inside list-decimal space-y-2 pt-4 text-2xl">
        <li>
          <Link href="/philosophy" className="underline">
            Read up
          </Link>{' '}
          on the cEDH mindset and meta.
        </li>
        <li>
          <Link href="/decks" className="underline">
            Browse some decklists
          </Link>{' '}
          for intriguing and proven strategies.
        </li>
        <li>
          <Link href="/stats" className="underline">
            Study the statistics
          </Link>{' '}
          to learn patterns and common cards.
        </li>
        <li>
          <Link href="/articles" className="underline">
            Read evergreen articles
          </Link>{' '}
          about cEDH.
        </li>
        <li>
          <Link href="/watch" className="underline">
            Watch videos
          </Link>{' '}
          for stack wars, combat steps, and combos.
        </li>
        <li>
          <Link href="/play" className="underline">
            Play webcam games
          </Link>{' '}
          in inclusive Discord communities.
        </li>
        <li>
          <Link href="/track" className="underline">
            Track your games
          </Link>{' '}
          to help our community adapt and grow.
        </li>
      </ol>
    </div>
  );
}

const loadFeatures = () =>
  import('../lib/framer_motion_features').then((f) => f.domAnimation);

export default function Home() {
  const { t } = useTranslation();

  return (
    <LazyMotion features={loadFeatures} strict>
      <NextSeo
        title={t('what is cedh') ?? 'What is cEDH?'}
        description="cEDH is Commander, but very spicy"
        openGraph={{
          url: 'https://cedh.guide',
          images: [{ url: 'https://cedh.guide/cedh-guide_card-banner_v2.png' }],
        }}
      />

      <PageHeader />
      <CedhBanner />
      <Explanation />
      <ExampleGames />
      <LearnMore />
    </LazyMotion>
  );
}

export const getStaticProps = translationProps(['common']);
