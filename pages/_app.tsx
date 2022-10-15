import type { AppProps } from 'next/app';
import '../styles/globals.css';

function CedhGuideApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default CedhGuideApp;
