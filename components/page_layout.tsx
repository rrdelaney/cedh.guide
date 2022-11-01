import cn from 'classnames';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { PageHeader } from './header';

interface PageLayoutProps {
  title?: string;
  prose?: string;
}

export function PageLayout({
  title,
  prose = 'lg:prose-xl',
  children,
}: PropsWithChildren<PageLayoutProps>) {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
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
