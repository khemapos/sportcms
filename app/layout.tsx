import { Battambang, Dangrek, Noto_Sans_Khmer, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontDongrek = Dangrek({
  weight: '400',
  subsets: ['khmer'],
  variable: '--font-dongrek',
})

const fontBattambang = Battambang({
  weight: ['400', '700'],
  subsets: ['khmer'],
  variable: '--font-battambang',
})

const fontNotoKhmer = Noto_Sans_Khmer({
  weight: ['400', '600', '700', '800'],
  subsets: ['khmer'],
  variable: '--font-noto-khmer',
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        fontDongrek.variable,
        fontBattambang.variable,
        fontNotoKhmer.variable
      )}
    >
      <body>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
