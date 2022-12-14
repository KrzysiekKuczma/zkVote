import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import { BaseLayout } from '@components/layout/BaseLayout';
import { HotToastConfig } from '@components/layout/HotToastConfig';
import { PolkadotProvider } from '@components/web3/PolkadotProvider';
import { defaultChain } from '@deployments/chains';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { env } from '@shared/environment';
import GlobalStyles from '@styles/GlobalStyles';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/global.css';

// Router Loading Animation with @tanem/react-nprogress
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* TODO SEO */}
      <DefaultSeo
        dangerouslySetAllPagesToNoFollow={!env.isProduction}
        dangerouslySetAllPagesToNoIndex={!env.isProduction}
        defaultTitle="zkVote"
        titleTemplate="zkVote"
        description="zkVote"
        openGraph={{
          type: 'website',
          locale: 'en',
          url: env.url,
          site_name: 'zkVote', // TODO
          images: [
            {
              url: `${env.url}/images/cover.jpg`, // TODO
              width: 1200,
              height: 670,
            },
          ],
        }}
      />

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <CacheProvider value={cache}>
        <ChakraProvider>
          <DarkMode>
            <GlobalStyles />

            <PolkadotProvider connectOnInit={true} defaultChain={defaultChain}>
              <BaseLayout>
                <Component {...pageProps} />
              </BaseLayout>
            </PolkadotProvider>

            <HotToastConfig />
          </DarkMode>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
