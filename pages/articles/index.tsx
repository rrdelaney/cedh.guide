import { GetStaticProps } from 'next';
import { ArticleMeta } from '../../components/article_layout';
import { PageLayout } from '../../components/page_layout';

interface ArticlesIndexProps {
  articles: ArticleMeta[];
}

export default function ArticlesIndex(props: ArticlesIndexProps) {
  return (
    <PageLayout title="Articles">
      <h1>Articles</h1>
      <div className="grid xl:grid-cols-2">
        {props.articles.map((article) => {
          return (
            <div key={article.title} className="flex flex-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`${article.title} thumbnail`}
                src={article.imageUrl}
                style={{ margin: '0' }}
              />

              <span className="text-sm pt-4">
                {new Date(article.publishDate).toDateString()}
              </span>

              <h2 style={{ margin: '0' }}>{article.title}</h2>
              <p className="text-sm pt-4">{article.description}</p>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<ArticlesIndexProps> = async () => {
  const articles = await Promise.all([import('./wheels-in-cedh.mdx')]);

  return {
    props: {
      articles: articles.map(
        (a) => (a as unknown as { meta: ArticleMeta }).meta
      ),
    },
  };
};
