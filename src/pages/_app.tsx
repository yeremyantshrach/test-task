import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { Container, MantineProvider } from '@mantine/core';
import { AppShell } from '@mantine/core';

import { wrapper } from '@/store/configureStore';
import HeaderComponent from '@/components/Header';

export default function App(props: AppProps) {
  const { Component, pageProps, ...otherProps } = props;
  const { store } = wrapper.useWrappedStore(otherProps);
  return (
    <>
      <Head>
        <title>Game stats</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
          }}
        >
          <AppShell
            padding="md"
            header={<HeaderComponent />}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
          >
            <Container>
              <Component {...pageProps} />
            </Container>
          </AppShell>
        </MantineProvider>
      </Provider>
    </>
  );
}
