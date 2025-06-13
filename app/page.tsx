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
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Labubu World
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your Ultimate Collection Guide
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
              Discover the magical world of Labubu collectible figures, explore series guides, 
              learn authenticity tips, and stay updated with the latest news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/series" 
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Explore Series
              </Link>
              <Link 
                href="/guides/how-to-spot-fake" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
              >
                Authenticity Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 精选系列区域 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Series
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the latest and most popular Labubu series collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestSeries.map((series) => (
              <Link 
                key={series.id} 
                href={`/series/${series.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover-lift">
                  <div className="aspect-square relative">
                    <Image
                      src={series.coverImageUrl || '/images/placeholder-series.jpg'}
                      alt={series.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {series.name}
                    </h3>
                    {series.releaseDate && (
                      <p className="text-sm text-gray-500 mb-3">
                        Released: {new Date(series.releaseDate).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm line-clamp-3">
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
              className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
            >
              View All Series
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 最新资讯区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest News
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest Labubu news, releases, and community updates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Link 
                key={news.id} 
                href={`/news/${news.slug}`}
                className="group"
              >
                <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <Image
                      src={news.imageUrl || '/images/placeholder-news.jpg'}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-gray-500 mb-2 block">
                      {new Date(news.publishedAt).toLocaleDateString()}
                    </time>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
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
              className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
            >
              Read All News
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Authenticity Guide</h3>
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