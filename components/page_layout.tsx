import cn from 'classnames';
import { NextSeo } from 'next-seo';
import { PropsWithChildren } from 'react';
import { PageHeader } from './header';

interface PageLayoutProps {
  title?: string;
  prose?: string;
  description?: string;
  ogImage?: string;
}

export function PageLayout({
  title,
  description,
  ogImage = 'https://cedh.guide/cedh-guide_card-banner_v2.png',
  prose = 'lg:prose-xl',
  children,
}: PropsWithChildren<PageLayoutProps>) {
  return (
    <>
      {title && (
        <NextSeo
          title={title}
          openGraph={{
            description: description,
            images: [{ url: ogImage }],
          }}
        />
      )}

      <PageHeader />
      <main
        className={cn(
          prose,
          'prose prose-invert mx-auto prose-h1:text-center prose-h1:underline prose-hr:border-gray-300 py-6 px-4'
        )}
      >
        {children}
      </main>
    </>
  );
}

export function makePageLayout(props: PageLayoutProps) {
  return function PageLayoutWithProps({ children }: PropsWithChildren<{}>) {
    return <PageLayout {...props}>{children}</PageLayout>;
  };
}
