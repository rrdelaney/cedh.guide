import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { PageHeader } from './header';

interface PageLayoutProps {
  title?: string;
}

export function PageLayout({
  title,
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
      <main className="prose prose-invert lg:prose-xl mx-auto prose-h1:text-center prose-h1:underline py-6 px-4">
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
