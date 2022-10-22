import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../components/header';

function CedhBanner() {
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

      <ol className="h-80 list-inside list-decimal space-y-2 pt-4 text-2xl font-bold">
        <li>All strategies are accepted.</li>
        <li>Decks majorly affect the game as early as Turn 1.</li>
        <li>Players only make plays that help them win.</li>
        <li>Proxies are encouraged.</li>
      </ol>
    </div>
  );
}

function YouTubeEmbed({ src }: { src: string }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function calculateParentWidth() {
      const parentRect =
        iframeRef.current?.parentElement?.getBoundingClientRect();

      if (parentRect) {
        const { width: parentWidth } = parentRect;
        setWidth(Math.min(560, parentWidth - 20));
      }
    }

    calculateParentWidth();
    window.addEventListener('resize', calculateParentWidth);
    return () => {
      window.removeEventListener('resize', calculateParentWidth);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      width={`${width}`}
      height={`${width * 0.5625}`}
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
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
          <Link href="/philosophy">
            <a className="underline">Read up</a>
          </Link>{' '}
          on the cEDH mindset and meta.
        </li>
        <li>
          <Link href="/decks">
            <a className="underline">Browse some decklists</a>
          </Link>{' '}
          for intriguing and proven strategies.
        </li>
        <li>
          <Link href="/stats">
            <a className="underline">Study the statistics</a>
          </Link>{' '}
          to learn patterns and common cards.
        </li>
        <li>
          <Link href="/articles">
            <a className="underline">Read evergreen articles</a>
          </Link>{' '}
          about cEDH.
        </li>
        <li>
          <Link href="/watch">
            <a className="underline">Watch videos</a>
          </Link>{' '}
          for stack wars, combat steps, and combos.
        </li>
        <li>
          <Link href="/play">
            <a className="underline">Play webcam games</a>
          </Link>{' '}
          in inclusive Discord communities.
        </li>
        <li>
          <Link href="/track">
            <a className="underline">Track your games</a>
          </Link>{' '}
          to help our community adapt and grow.
        </li>
      </ol>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>What is cEDH?</title>
      </Head>
      <PageHeader />
      <CedhBanner />
      <Explanation />
      <ExampleGames />
      <LearnMore />
    </>
  );
}
