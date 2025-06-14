import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getLatestSeries, getLatestNewsPosts } from '@/lib/db'

// 主页的元数据
export const metadata: Metadata = {
  title: 'Labubu World | Your Ultimate Collection Guide',
  description: 'Discover the magical world of Labubu collectible figures, series guides, authenticity tips, and latest news from the official fan community.',
}

export default async function HomePage() {
  // 获取最新系列和新闻数据（服务器端获取）
  const latestSeries = await getLatestSeries(4)
  const latestNews = await getLatestNewsPosts(3)

  return (
    <div className="min-h-screen">
      {/* Hero 区域 */}
      <section className="relative bg-gradient-to-br from-pink-400 via-purple-500 to-cute-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        {/* 可爱的装饰元素 */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full float-animation"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300/30 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300/30 rounded-full float-animation" style={{animationDelay: '2s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-comfortaa">
              ✨ Labubu World ✨
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-quicksand">
              Your Ultimate Collection Guide 💕
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
              Discover the magical world of Labubu collectible figures! 🌟 
              Explore series guides, learn authenticity tips, and stay updated with the latest news! 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/series" 
                className="btn-cute"
              >
                📚 Explore Series
              </Link>
              <Link 
                href="/guides/how-to-spot-fake" 
                className="border-2 border-white text-white px-8 py-4 rounded-cute font-semibold hover:bg-white hover:text-cute-600 transition-all duration-300 hover:scale-105"
              >
                🔍 Real VS Fake Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 精选系列区域 */}
      <section className="py-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold title-cute mb-4 font-comfortaa">
              ✨ Featured Series ✨
            </h2>
            <p className="text-lg text-cute-600 max-w-2xl mx-auto">
              Explore the latest and most popular Labubu series collections! 💖
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestSeries.map((series) => (
              <Link 
                key={series.id} 
                href={`/series/${series.slug}`}
                className="group"
              >
                <div className="card-cute hover-lift">
                  <div className="aspect-square relative">
                    <Image
                      src={series.coverImageUrl || '/images/placeholder-series.jpg'}
                      alt={series.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-cute-700 mb-2 group-hover:text-cute-500 transition-colors font-comfortaa">
                      {series.name}
                    </h3>
                    {series.releaseDate && (
                      <p className="text-sm text-cute-500 mb-3">
                        📅 Released: {new Date(series.releaseDate).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-cute-600 text-sm line-clamp-3">
                      {series.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/series" 
              className="btn-cute inline-flex items-center"
            >
              📚 View All Series
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 最新资讯区域 */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold title-cute mb-4 font-comfortaa">
              📰 Latest News 📰
            </h2>
            <p className="text-lg text-cute-600 max-w-2xl mx-auto">
              Stay updated with the latest Labubu news, releases, and community updates! 🌟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Link 
                key={news.id} 
                href={`/news/${news.slug}`}
                className="group"
              >
                <article className="card-cute hover-lift">
                  <div className="aspect-video relative">
                    <Image
                      src={news.imageUrl || '/images/placeholder-news.jpg'}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
                    />
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-cute-500 mb-2 block">
                      📅 {new Date(news.publishedAt).toLocaleDateString()}
                    </time>
                    <h3 className="text-xl font-semibold text-cute-700 mb-3 group-hover:text-cute-500 transition-colors font-comfortaa">
                      {news.title}
                    </h3>
                    <p className="text-cute-600 text-sm line-clamp-3">
                      {news.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/news" 
              className="btn-cute inline-flex items-center"
            >
              📰 Read All News
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Decoding Labubu Craze 解码 Labubu 狂热现象 */}
      <section className="py-16 md:py-24 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold title-cute mb-4 font-comfortaa">
              🔍 Decoding Labubu Craze 🔍
            </h2>
            <p className="text-lg text-cute-600 max-w-2xl mx-auto mb-4">
              From niche toy to global phenomenon, Labubu's rise is no accident. ✨
            </p>
            <p className="text-cute-700 max-w-4xl mx-auto">
              This section reveals the key factors behind Labubu's transformation into Pop Mart's "money tree" 💰 
              through interactive charts and crucial data. The chart shows Pop Mart's 2024 IP revenue breakdown, 
              highlighting Labubu's massive contribution alongside the driving forces behind this craze! 📊
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="group relative">
              <div className="card-cute text-center hover-lift h-full flex flex-col justify-between p-8 min-h-[280px]">
                <div className="flex-shrink-0">
                  <div className="text-5xl mb-6 sparkle group-hover:scale-110 transition-transform duration-300">🛍️</div>
                  <h4 className="font-bold text-xl text-cute-700 mb-4 font-comfortaa leading-tight">Fashion Accessory</h4>
                </div>
                <p className="text-sm text-cute-600 leading-relaxed flex-grow flex items-center">
                  Plush keychains transformed Labubu from collectibles to wearable fashion items, 
                  becoming the breakthrough point! ✨
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="card-cute text-center hover-lift h-full flex flex-col justify-between p-8 min-h-[280px]">
                <div className="flex-shrink-0">
                  <div className="text-5xl mb-6 sparkle group-hover:scale-110 transition-transform duration-300">📱</div>
                  <h4 className="font-bold text-xl text-cute-700 mb-4 font-comfortaa leading-tight">Social Media Viral</h4>
                </div>
                <p className="text-sm text-cute-600 leading-relaxed flex-grow flex items-center">
                  User-generated content on TikTok and other platforms created powerful word-of-mouth, 
                  attracting massive new fans! 🌟
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="card-cute text-center hover-lift h-full flex flex-col justify-between p-8 min-h-[280px]">
                <div className="flex-shrink-0">
                  <div className="text-5xl mb-6 sparkle group-hover:scale-110 transition-transform duration-300">⭐</div>
                  <h4 className="font-bold text-xl text-cute-700 mb-4 font-comfortaa leading-tight">Celebrity Effect</h4>
                </div>
                <p className="text-sm text-cute-600 leading-relaxed flex-grow flex items-center">
                  International stars like BLACKPINK's Lisa greatly boosted global recognition 
                  and popularity! 💫
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="card-cute text-center hover-lift h-full flex flex-col justify-between p-8 min-h-[280px]">
                <div className="flex-shrink-0">
                  <div className="text-5xl mb-6 sparkle group-hover:scale-110 transition-transform duration-300">🎁</div>
                  <h4 className="font-bold text-xl text-cute-700 mb-4 font-comfortaa leading-tight">Blind Box Magic</h4>
                </div>
                <p className="text-sm text-cute-600 leading-relaxed flex-grow flex items-center">
                  The thrill of unknown surprises drives purchase desire and repeat buying, 
                  fueling collection passion! 💕
                </p>
              </div>
            </div>
          </div>

          <div className="card-cute mb-12 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 title-cute font-comfortaa">
              📊 Pop Mart 2024 Major IP Revenue Contribution (USD Billions) 📊
            </h3>
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-20 text-sm font-medium text-cute-700">Labubu</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-8 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <div className="w-16 text-sm font-bold text-cute-700">$8.5B</div>
                </div>
                <div className="flex items-center">
                  <div className="w-20 text-sm font-medium text-cute-700">Molly</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gradient-to-r from-orange-300 to-yellow-400 h-6 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <div className="w-16 text-sm font-bold text-cute-700">$3.5B</div>
                </div>
                <div className="flex items-center">
                  <div className="w-20 text-sm font-medium text-cute-700">SKULLPANDA</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gradient-to-r from-purple-300 to-pink-300 h-6 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <div className="w-16 text-sm font-bold text-cute-700">$3.0B</div>
                </div>
                <div className="flex items-center">
                  <div className="w-20 text-sm font-medium text-cute-700">Others</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-10 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <div className="w-16 text-sm font-bold text-cute-700">$9.5B</div>
                </div>
              </div>
              <div className="text-center mt-4 text-xs text-cute-600">
                💡 Revenue in USD Billions
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="card-cute p-8 hover-lift">
              <p className="text-5xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                $150,000+
              </p>
              <p className="text-lg text-cute-700 font-semibold mb-2 font-comfortaa">🎨 Art Auction Record</p>
              <p className="text-sm text-cute-600">
                June 2025: A four-foot-tall Labubu sculpture sold at Beijing auction for this record price! 💰
              </p>
            </div>
            <div className="card-cute p-8 hover-lift">
              <p className="text-5xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                +12%
              </p>
              <p className="text-lg text-cute-700 font-semibold mb-2 font-comfortaa">📈 "Kidult" Market Growth</p>
              <p className="text-sm text-cute-600">
                Q1 2025: US adult toy sales (18+) year-over-year growth rate shows the expanding market! 🚀
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 特色功能区域 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real VS Fake Labubu</h3>
              <p className="text-gray-600">
                Learn how to identify genuine Labubu figures with our comprehensive authenticity guide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Series Guide</h3>
              <p className="text-gray-600">
                Explore every Labubu series with detailed information about each figure and secret variants.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Latest Updates</h3>
              <p className="text-gray-600">
                Stay informed with the latest news, releases, and updates from the Labubu world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 