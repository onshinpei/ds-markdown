import type { AppProps } from 'next/app'
import '../styles/demos.css'
import 'ds-markdown-mermaid-plugin/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

