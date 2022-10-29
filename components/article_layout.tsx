import { PropsWithChildren } from 'react';
import { PageLayout } from './page_layout';

export interface ArticleMeta {
  title: string;
  publishDate: string;
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
          <span>{new Date(meta.publishDate).toDateString()}</span>
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
