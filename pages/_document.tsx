import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
}                           from 'next/document';
import { ServerStyleSheet } from 'styled-components';


function CustomDocument() {
  return (
    <Html lang="en">
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

CustomDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [initialProps.styles, sheet.getStyleElement()],
    };
  } finally {
    sheet.seal();
  }
};

export default CustomDocument;
