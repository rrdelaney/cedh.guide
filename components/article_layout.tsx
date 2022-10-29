import { PropsWithChildren } from 'react';
import { PageLayout } from './page_layout';

interface ArticleMeta {
  title: string;
  publishDate: Date;
  description: string;
  imageUrl: string;
}

function ArticleLayout({
  meta,
  children,
}: PropsWithChildren<{ meta: ArticleMeta }>) {
  return <PageLayout title={meta.title}>{children}</PageLayout>;
}

export function makeArticleLayout(meta: ArticleMeta) {
  return function ArticleLayoutWithMeta({ children }: PropsWithChildren<{}>) {
    return (
      <ArticleLayout meta={meta}>
        <article>
          <span>{meta.publishDate.toDateString()}</span>
          <h1
            style={{
              textAlign: 'left',
              textDecoration: 'none',
              lineHeight: '1.5em',
              maxWidth: '80%',
            }}
          >
            {meta.title}
          </h1>

          {children}
        </article>
      </ArticleLayout>
    );
  };
}
