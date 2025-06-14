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

      {/* 解码 Labubu 狂热现象 */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold title-cute mb-4 font-comfortaa">
              🔍 解码 Labubu 狂热现象 🔍
            </h2>
            <p className="text-lg text-cute-600 max-w-2xl mx-auto mb-4">
              从小众玩具到全球风尚，Labubu的崛起并非偶然。
            </p>
            <p className="max-w-3xl mx-auto text-cute-700">
              这部分将通过互动图表和关键数据，为您揭示Labubu如何成为Pop Mart的"摇钱树"。图表展示了Pop Mart在2024年的IP收入构成，您可以直观地看到Labubu的巨大贡献。同时，我们还列出了推动这场热潮的关键因素和令人瞩目的市场数据。
            </p>
          </div>
          
          {/* 四个关键因素 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card-cute text-center hover-lift">
              <div className="text-4xl mb-4">🛍️</div>
              <h4 className="font-bold text-lg text-cute-700 mb-3 font-comfortaa">时尚配饰</h4>
              <p className="text-sm text-cute-600">
                毛绒挂件将Labubu从收藏品变为可随身携带的时尚单品，成为引爆点。
              </p>
            </div>
            <div className="card-cute text-center hover-lift">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="font-bold text-lg text-cute-700 mb-3 font-comfortaa">社媒病毒</h4>
              <p className="text-sm text-cute-600">
                TikTok等平台上的用户自发内容形成强大口碑，吸引大量新粉丝。
              </p>
            </div>
            <div className="card-cute text-center hover-lift">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="font-bold text-lg text-cute-700 mb-3 font-comfortaa">明星效应</h4>
              <p className="text-sm text-cute-600">
                BLACKPINK Lisa等国际明星的喜爱，极大提升了其全球知名度。
              </p>
            </div>
            <div className="card-cute text-center hover-lift">
              <div className="text-4xl mb-4">🎁</div>
              <h4 className="font-bold text-lg text-cute-700 mb-3 font-comfortaa">盲盒魔力</h4>
              <p className="text-sm text-cute-600">
                未知的惊喜感激发了消费者的购买欲和复购行为，驱动收藏热情。
              </p>
            </div>
          </div>

          {/* 收入图表区域 */}
          <div className="card-cute mb-12 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-cute-700 font-comfortaa">
              📊 Pop Mart 2024年主要IP收入贡献（单位：亿美元）
            </h3>
            <div className="space-y-4">
              {/* Labubu */}
              <div className="flex items-center">
                <div className="w-20 text-sm text-cute-600 font-medium">Labubu</div>
                <div className="flex-1 bg-cute-100 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-purple-500 h-full rounded-full flex items-center justify-end pr-4 text-white font-bold text-sm"
                    style={{width: '75%'}}
                  >
                    7.5
                  </div>
                </div>
              </div>
              
              {/* Molly */}
              <div className="flex items-center">
                <div className="w-20 text-sm text-cute-600 font-medium">Molly</div>
                <div className="flex-1 bg-cute-100 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-pink-300 to-purple-400 h-full rounded-full flex items-center justify-end pr-4 text-white font-bold text-sm"
                    style={{width: '35%'}}
                  >
                    3.5
                  </div>
                </div>
              </div>
              
              {/* SKULLPANDA */}
              <div className="flex items-center">
                <div className="w-20 text-sm text-cute-600 font-medium">SKULLPANDA</div>
                <div className="flex-1 bg-cute-100 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-pink-300 to-purple-400 h-full rounded-full flex items-center justify-end pr-4 text-white font-bold text-sm"
                    style={{width: '27%'}}
                  >
                    2.7
                  </div>
                </div>
              </div>
              
              {/* 其他IP合计 */}
              <div className="flex items-center">
                <div className="w-20 text-sm text-cute-600 font-medium">其他IP合计</div>
                <div className="flex-1 bg-cute-100 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-pink-200 to-purple-300 h-full rounded-full flex items-center justify-end pr-4 text-white font-bold text-sm"
                    style={{width: '63%'}}
                  >
                    6.3
                  </div>
                </div>
              </div>
            </div>
            
            {/* 图表说明 */}
            <div className="mt-6 text-center">
              <div className="flex justify-center items-center space-x-8 text-sm text-cute-600">
                <span>0</span>
                <span>2.5</span>
                <span>5.0</span>
                <span>7.5</span>
                <span>10.0</span>
              </div>
              <p className="text-xs text-cute-500 mt-2">收入（亿美元）</p>
            </div>
          </div>

          {/* 关键数据统计 */}
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="card-cute p-8 hover-lift">
              <p className="text-5xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                $150,000+
              </p>
              <p className="text-lg text-cute-700 font-semibold mb-2 font-comfortaa">艺术拍卖纪录</p>
              <p className="text-sm text-cute-500">
                2025年6月，一座四英尺高的Labubu雕塑在北京的拍卖成交价。
              </p>
            </div>
            <div className="card-cute p-8 hover-lift">
              <p className="text-5xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                +12%
              </p>
              <p className="text-lg text-cute-700 font-semibold mb-2 font-comfortaa">"Kidult"市场增长</p>
              <p className="text-sm text-cute-500">
                2025年Q1，美国18岁以上成人玩具销售额同比增长。
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