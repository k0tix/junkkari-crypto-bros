import 'rsuite/dist/rsuite.min.css';
import type { AppProps } from 'next/app'
import { CustomProvider } from 'rsuite'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider theme="dark">
      <Component {...pageProps} />
    </CustomProvider>)
}
