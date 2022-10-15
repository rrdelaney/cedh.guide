import { PageHeader } from '../components/header';

function CedhBanner() {
  return (
    <div
      className="md:pt-18 mx-auto flex max-w-screen-2xl flex-col items-start px-12 pt-12 md:mt-8 lg:mt-12 lg:pt-24"
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

export default function Home() {
  return (
    <>
      <PageHeader />
      <CedhBanner />
    </>
  );
}
