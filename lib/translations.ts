import { GetStaticProps, GetStaticPropsContext } from 'next';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export function translationProps(
  namespacesRequired: string[]
): GetStaticProps<SSRConfig> {
  return async ({ locale = 'en-us' }) => {
    const translations = await serverSideTranslations(
      locale,
      namespacesRequired
    );

    return { props: translations };
  };
}
