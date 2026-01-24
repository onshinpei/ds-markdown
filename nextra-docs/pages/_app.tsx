import type { AppProps } from 'next/app'
import '../styles/demos.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

