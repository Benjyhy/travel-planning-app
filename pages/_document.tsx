import Document, { Html, Head, Main, NextScript } from "next/document";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Document {
    render() {
        return (
            <Html lang="fr">
                <Head>
                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=utf-8"
                    />
                    <meta name="application-name" content="App" />
                    <script
                        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY_GOOGLE}&libraries=places&v=weekly`}
                        async
                    ></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
