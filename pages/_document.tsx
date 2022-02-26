import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>ROaufgaben</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content="Verwalte deine Schulaufgaben ganz einfach" />
                    <meta name="theme-color" content="#0f2027"></meta>
                    <link rel="apple-touch-icon" href="/icon-192x192"></link>
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;