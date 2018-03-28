import App from '../src/App'
import Head from 'next/head'
export default () => (
  <React.Fragment>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      body,
      #__next {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `}</style>
    <App />
  </React.Fragment>
)
