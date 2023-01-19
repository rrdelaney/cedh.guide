import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { ArticleMeta } from '../../components/article_layout';
import { PageLayout } from '../../components/page_layout';

interface ArticlesIndexProps {
  articles: (ArticleMeta & { slug: string })[];
}

export default function ArticlesIndex(props: ArticlesIndexProps) {
  return (
    <PageLayout title="Articles">
      <h1>Articles</h1>
      <div className="grid gap-4 xl:grid-cols-2">
        {props.articles.map((article) => {
          return (
            <div key={article.title} className="flex flex-col">
              {article.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={`${article.title} thumbnail`}
                  src={article.imageUrl}
                  style={{ margin: '0' }}
                />
              )}

              <span className="text-sm pt-4">
                {new Date(article.publishDate).toDateString()}
              </span>

              <h2 style={{ margin: '0' }}>
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-sm pt-4">{article.description}</p>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<ArticlesIndexProps> = async (
  ctx
) => {
  const articles = new Map([
    ['wheels-in-cedh', import('./wheels-in-cedh.mdx')],
    ['variance-in-commander', import('./variance-in-commander.mdx')],
  ]);

  const translations = await serverSideTranslations(ctx.locale ?? 'en-us', [
    'common',
  ]);

  return {
    props: {
      ...translations,
      articles: await Promise.all(
        Array.from(articles.entries()).map(async ([slug, importMeta]) => {
          const { meta } = (await importMeta) as unknown as {
            meta: ArticleMeta;
          };

          return { ...meta, slug };
        })
      ),
    },
  };
};
