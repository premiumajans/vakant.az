import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
      <Html lang="en" >
      <Head>
          <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
      </Head>
      <body>
        <noscript>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
