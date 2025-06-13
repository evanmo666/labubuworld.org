import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Labubu World | Your Ultimate Collection Guide',
  description: 'Discover the magical world of Labubu collectible figures, series guides, authenticity tips, and latest news.',
  keywords: 'Labubu, collectible figures, Pop Mart, Kasing Lung, toy collection',
  authors: [{ name: 'Labubu World' }],
  creator: 'Labubu World',
  publisher: 'Labubu World',
  openGraph: {
    title: 'Labubu World | Your Ultimate Collection Guide',
    description: 'Discover the magical world of Labubu collectible figures',
    url: 'https://labubuworld.org',
    siteName: 'Labubu World',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labubu World | Your Ultimate Collection Guide',
    description: 'Discover the magical world of Labubu collectible figures',
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
        <AuthProvider>
        {/* 导航栏 */}
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-primary-600">Labubu World</span>
                </a>
              </div>
              
              {/* 主导航菜单 */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="/series" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  Series
                </a>
                <a href="/guides/how-to-spot-fake" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  Authenticity Guide
                </a>
                <a href="/news" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  News
                </a>
                <a href="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  About
                </a>
              </div>

              {/* 移动端菜单按钮 */}
              <div className="md:hidden flex items-center">
                <button className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600">
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
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Labubu World</h3>
                <p className="text-gray-400 text-sm">
                  Your ultimate guide to the magical world of Labubu collectible figures.
                  Discover series, authenticity tips, and latest news.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/series" className="text-gray-400 hover:text-white transition-colors">All Series</a></li>
                  <li><a href="/guides/how-to-spot-fake" className="text-gray-400 hover:text-white transition-colors">Authenticity Guide</a></li>
                  <li><a href="/news" className="text-gray-400 hover:text-white transition-colors">Latest News</a></li>
                  <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="text-gray-400">Privacy Policy</span></li>
                  <li><span className="text-gray-400">Terms of Service</span></li>
                  <li><span className="text-gray-400">Disclaimer</span></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 Labubu World. This is an unofficial fan site. 
                Labubu is a trademark of POP MART and Kasing Lung.
              </p>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  )
} 