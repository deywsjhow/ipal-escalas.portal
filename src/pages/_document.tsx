import { Html, Head, Main, NextScript } from 'next/document'
import a from '../../public/assets/logo_azul.ico'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" type="image/x-icon" href="/assets/logo_azul.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
