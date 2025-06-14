import type { Metadata } from 'next'
import { Inter, Nunito, Poppins } from 'next/font/google'
import Image from 'next/image'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Labubu World | Your Ultimate Collection Guide',
  description: 'Discover the magical world of Labubu collectible figures, series guides, authenticity tips, and latest news.',
  keywords: 'Labubu, collectible figures, Pop Mart, Kasing Lung, toy collection',
  authors: [{ name: 'Labubu World' }],
  creator: 'Labubu World',
  publisher: 'Labubu World',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Labubu World | Your Ultimate Collection Guide',
    description: 'Discover the magical world of Labubu collectible figures',
    url: 'https://labubuworld.org',
    siteName: 'Labubu World',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/labubu-logo.png',
        width: 1200,
        height: 630,
        alt: 'Labubu World Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labubu World | Your Ultimate Collection Guide',
    description: 'Discover the magical world of Labubu collectible figures',
    images: ['/labubu-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 导航栏 */}
        <nav className="bg-gradient-to-r from-pink-50 to-purple-50 shadow-cute border-b border-pink-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex-shrink-0 flex items-center space-x-3">
                  <Image
                    src="/labubu-logo.png"
                    alt="Labubu Logo"
                    width={40}
                    height={40}
                    className="rounded-cute hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-2xl font-bold text-cute-600 font-round">Labubu World ✨</span>
                </a>
              </div>
              
              {/* 主导航菜单 */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="/" className="text-cute-700 hover:text-cute-500 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-cute hover:bg-pink-100">
                  🏠 Home
                </a>
                <a href="/series" className="text-cute-700 hover:text-cute-500 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-cute hover:bg-pink-100">
                  📚 Series
                </a>
                <a href="/guides/how-to-spot-fake" className="text-cute-700 hover:text-cute-500 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-cute hover:bg-pink-100">
                  🔍 Real VS Fake
                </a>
                <a href="/news" className="text-cute-700 hover:text-cute-500 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-cute hover:bg-pink-100">
                  📰 News
                </a>
                <a href="/about" className="text-cute-700 hover:text-cute-500 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-cute hover:bg-pink-100">
                  💖 About
                </a>
              </div>

              {/* 移动端菜单按钮 */}
              <div className="md:hidden flex items-center">
                <button className="text-cute-700 hover:text-cute-500 focus:outline-none focus:text-cute-500 p-2 rounded-cute hover:bg-pink-100 transition-all duration-300">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 主要内容区域 */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* 页脚 */}
        <footer className="bg-gradient-to-r from-pink-100 to-purple-100 text-cute-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/labubu-logo.png"
                    alt="Labubu Logo"
                    width={32}
                    height={32}
                    className="rounded-cute hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold font-round">Labubu World ✨</h3>
                </div>
                <p className="text-cute-600 text-sm">
                  Your ultimate guide to the magical world of Labubu collectible figures! 💕
                  Discover series, authenticity tips, and latest news.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 font-round">🔗 Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/series" className="text-cute-600 hover:text-cute-500 transition-colors hover:underline">📚 All Series</a></li>
                  <li><a href="/guides/how-to-spot-fake" className="text-cute-600 hover:text-cute-500 transition-colors hover:underline">🔍 Real VS Fake Guide</a></li>
                  <li><a href="/news" className="text-cute-600 hover:text-cute-500 transition-colors hover:underline">📰 Latest News</a></li>
                  <li><a href="/about" className="text-cute-600 hover:text-cute-500 transition-colors hover:underline">💖 About Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 font-round">📋 Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li><span className="text-cute-600">🔒 Privacy Policy</span></li>
                  <li><span className="text-cute-600">📜 Terms of Service</span></li>
                  <li><span className="text-cute-600">⚠️ Disclaimer</span></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-pink-200 text-center">
              <p className="text-cute-600 text-sm">
                © 2024 Labubu World ✨ This is an unofficial fan site made with 💕
                <br />
                Labubu is a trademark of POP MART and Kasing Lung 🎨
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 