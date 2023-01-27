import 'antd/dist/reset.css';
import { AppProps } from 'next/app';
import {
  ThemeProvider,
  DefaultTheme,
}                   from 'styled-components';
import { Layout }   from '../src/components/layout/Layout';

const theme: DefaultTheme = {};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
