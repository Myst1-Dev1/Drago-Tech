import Document, { Html, Head ,Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-br">
                <Head>
                    <link rel="icon" href="/images/icon.webp" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto&family=Ultra&display=swap" rel="stylesheet"/>
                    <meta name="description" content="Loja de equipamentos eletrônicos" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    };
}