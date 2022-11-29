import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import { PropsWithChildren } from 'react';
import { PageHeader } from '../components/header';
import { translationProps } from '../lib/translations';
import kenHeadshot from '../public/team/03-12-2022_500w_circle.png';
import minoHeadshot from '../public/team/cedh-guide_team_mino.jpg';
import mordHeadshot from '../public/team/cedh-guide_team_mord.jpg';
import spleenfaceHeadshot from '../public/team/cedh-guide_team_spleenface.jpg';
import ryanHeadshot from '../public/team/ryan.jpeg';
import squirrelmobHeadshot from '../public/team/squirrelmob.jpg';

function TeamMember({
  img,
  children,
}: PropsWithChildren<{ img: StaticImageData }>) {
  return (
    <div className="flex flex-col items-center prose prose-sm prose-invert mx-auto">
      <div className="relative h-64 w-64 md:h-48 md:w-48">
        <Image
          src={img}
          alt="headshot"
          fill
          className="rounded-full object-cover"
        />
      </div>

      {children}
    </div>
  );
}

function TeamMembers() {
  return (
    <div className="grid gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 pb-12">
      <TeamMember img={kenHeadshot}>
        <h2>Ken Baumann</h2>
        <p>
          <a href="https://kenbaumann.com/">Ken</a> is cedh.guide&apos;s
          publisher. He runs Stacked EDH—and when his brain isn&apos;t eaten by
          Magic, he writes books.
        </p>
      </TeamMember>

      <TeamMember img={minoHeadshot}>
        <h2>Mino</h2>
        <p>
          <a href="https://twitter.com/its_mino_">Mino</a> is the backend
          developer for the Stats page and data imports.
        </p>
      </TeamMember>

      <TeamMember img={mordHeadshot}>
        <h2>Mord</h2>
        <p>
          <a href="https://linktr.ee/mordamen">Yehuda</a>, aka Mord, is a
          digital alterist as well as a co-author and admin for the cEDH Elsha
          primer list, a moderator for the Estrid cEDH discord and a Senior
          Marketing Specialist for Monarch Media.
        </p>
      </TeamMember>

      <TeamMember img={ryanHeadshot}>
        <h2>Ryan Delaney</h2>
        <p>
          <a href="https://rdel.dev)">Ryan</a> is cedh.guide&apos;s frontend
          developer. Software engineer at a startup by day and EDH enthusiast
          all the time, he&apos;s having a lot of fun with this site.
        </p>
      </TeamMember>

      <TeamMember img={spleenfaceHeadshot}>
        <h2>Spleenface</h2>
        <p>
          <a href="https://twitter.com/Spleenface">Morgan</a>, aka Spleenface,
          is a cEDH tournament grinder, cohost of the Into the North podcast,
          member of The Mind Sculptors and moderator of both the CompetitiveEDH
          subreddit and cEDH Nexus Discord.
        </p>
      </TeamMember>

      <TeamMember img={squirrelmobHeadshot}>
        <h2>Squirrelmob</h2>
        <p>
          <a href="https://twitter.com/SquirrelmobMTG">Squirrelmob</a>, aka
          James, is the curator of the cEDH Metagame Project, a Manager on the
          cEDH Decklist Database, and on-screen caster for Monarch Events. That
          is, when he&apos;s not scraping together a paycheck teaching.
        </p>
      </TeamMember>
    </div>
  );
}

export default function TeamsPage() {
  return (
    <>
      <Head>
        <title>What is the cEDH metagame?</title>
      </Head>

      <PageHeader />
      <div className="prose lg:prose-xl prose-invert mx-auto prose-h1:text-center prose-h1:underline mb-12 xl:mb-24">
        <h1>Who makes cedh.guide?</h1>
      </div>
      <TeamMembers />
    </>
  );
}

export const getStaticProps = translationProps(['common']);
