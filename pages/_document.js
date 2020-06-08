import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
            <Head>
                <link rel="icon" type="image/svg" href="/img/favicon.svg" sizes="32x32"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="yandex-verification" content="90821fb86ed59eeb" />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}