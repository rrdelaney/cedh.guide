import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export function translationProps(namespacesRequired: string[]): GetStaticProps {
  return async ({ locale = 'en-us' }) => {
    const translations = await serverSideTranslations(
      locale,
      namespacesRequired
    );

    return { props: translations };
  };
}
