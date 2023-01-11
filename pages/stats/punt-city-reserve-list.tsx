import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { PageHeader } from '../../components/header';
import { PageLayout } from '../../components/page_layout';
import { prisma } from '../../lib/prisma';

interface PuntCityReserveListProps {
  cards: (string | null)[];
}

export default function PuntCityReserveList({
  cards,
}: PuntCityReserveListProps) {
  return (
    <PageLayout title="Top 100 Reserve List Cards">
      <h1>Top 100 Reserve List Cards</h1>
      <ul>
        {cards.map((card) =>
          card == null ? null : <li key={card}>{card}</li>
        )}
      </ul>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<PuntCityReserveListProps> = async (
  ctx
) => {
  const translations = await serverSideTranslations(ctx.locale ?? 'en-us', [
    'common',
  ]);

  const cards = await prisma.punt_city_cards.findMany({
    where: { reserve_list: true },
    take: 100,
    orderBy: { amount: 'desc' },
    select: { card_name: true },
  });

  return {
    props: {
      ...translations,
      cards: cards.map((card) => card.card_name),
    },
  };
};
