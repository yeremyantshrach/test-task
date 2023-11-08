import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { AppShell, Container, MantineProvider, Navbar, NavLink } from '@mantine/core';
import { IconArticle, IconHome } from '@tabler/icons-react';
import Link from 'next/link';

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
            navbar={
              <Navbar width={{ base: 300 }} height="100vh" p="xs">
                <Navbar.Section>
                  <NavLink
                    active={!otherProps.router.pathname.includes('post')}
                    component={Link}
                    href={{ pathname: '/' }}
                    label="Home"
                    icon={<IconHome size="1rem" stroke={1.5} />}
                  />
                </Navbar.Section>
                <Navbar.Section>
                  <NavLink
                    active={otherProps.router.pathname.includes('post')}
                    component={Link}
                    href={{ pathname: '/post' }}
                    label="Posts"
                    icon={<IconArticle size="1rem" stroke={1.5} />}
                  />
                </Navbar.Section>
              </Navbar>
            }
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
