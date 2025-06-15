import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllSeries } from '@/lib/db'
import { SidebarAd, ContentAd } from '@/components/AdSense'

// 系列页面的元数据
export const metadata: Metadata = {
  title: 'All Labubu Series | Labubu World',
  description: 'Explore all Labubu collectible figure series. Find detailed information about each series including release dates, figures, and special variants.',
  keywords: 'Labubu series, collectible figures, Pop Mart series, Labubu collection',
}

export default async function SeriesPage() {
  // 获取所有系列数据
  const allSeries = await getAllSeries()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题区域 */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              All Labubu Series
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover every Labubu series collection. From classic releases to special collaborations, 
              explore the complete universe of these magical collectible figures.
            </p>
          </div>
        </div>
      </section>

      {/* 系列网格 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allSeries.length === 0 ? (
            // 空状态显示
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Series Found</h3>
              <p className="text-gray-600">
                Series data is currently being loaded. Please check back later or contact support if this issue persists.
              </p>
            </div>
          ) : (
            <>
              {/* 系列统计 */}
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {allSeries.length} series collection{allSeries.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* 系列卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {allSeries.map((series) => (
                  <Link 
                    key={series.id} 
                    href={`/series/${series.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                      {/* 系列封面图片 */}
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={series.coverImageUrl || '/images/placeholder-series.jpg'}
                          alt={`${series.name} cover`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* 发售日期徽章 */}
                        {series.releaseDate && (
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-xs font-medium text-gray-700">
                              {new Date(series.releaseDate).getFullYear()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 系列信息 */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                          {series.name}
                        </h3>
                        
                        {series.releaseDate && (
                          <p className="text-sm text-gray-500 mb-3">
                            Released: {new Date(series.releaseDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        )}

                        {series.description && (
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {series.description}
                          </p>
                        )}

                        {/* 查看详情按钮 */}
                        <div className="flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700">
                          <span>View Collection</span>
                          <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 底部信息区域 */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our collection is constantly growing. If you're looking for information about a specific series 
              or have questions about Labubu figures, feel free to explore our guides or contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/guides/how-to-spot-fake" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Authenticity Guide
              </Link>
              <Link 
                href="/about" 
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 