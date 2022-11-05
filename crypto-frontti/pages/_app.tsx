import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { createTheme } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';


const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {}
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {}, // override dark theme colors
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider >
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider >
  )
}
