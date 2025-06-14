import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSeriesBySlug, getFiguresBySeriesId } from '@/lib/db'

// 生成动态元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const series = await getSeriesBySlug(params.slug)
  
  if (!series) {
    return {
      title: 'Series Not Found | Labubu World',
      description: 'The requested Labubu series could not be found.',
    }
  }

  return {
    title: `${series.name} Series | Labubu World`,
    description: `Explore the ${series.name} Labubu series. ${series.description || 'Discover all figures in this collection including regular and secret variants.'}`,
    keywords: `Labubu ${series.name}, ${series.name} series, Labubu collection, Pop Mart`,
    openGraph: {
      title: `${series.name} Series | Labubu World`,
      description: series.description || `Explore the ${series.name} Labubu series collection`,
      images: series.coverImageUrl ? [{ url: series.coverImageUrl }] : [],
    },
  }
}

export default async function SeriesDetailPage({ params }: { params: { slug: string } }) {
  // 获取系列信息
  const series = await getSeriesBySlug(params.slug)
  
  if (!series) {
    notFound()
  }

  // 获取该系列的所有玩偶
  const figures = await getFiguresBySeriesId(series.id)
  
  // 分离常规款和隐藏款
  const regularFigures = figures.filter(figure => !figure.isSecret)
  const secretFigures = figures.filter(figure => figure.isSecret)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 系列标题区域 */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 系列封面图片 */}
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src={series.coverImageUrl || '/images/placeholder-series.jpg'}
                alt={`${series.name} series cover`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 系列信息 */}
            <div>
              <div className="mb-6">
                <Link 
                  href="/series" 
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium mb-4"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to All Series
                </Link>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {series.name}
                </h1>
                
                {series.releaseDate && (
                  <p className="text-lg text-gray-600 mb-6">
                    Released: {new Date(series.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>

              {series.description && (
                <div className="mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {series.description}
                  </p>
                </div>
              )}

              {/* 系列统计 */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {regularFigures.length}
                  </div>
                  <div className="text-sm font-medium text-purple-700">
                    Regular Figures
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {secretFigures.length}
                  </div>
                  <div className="text-sm font-medium text-yellow-700">
                    Secret Figures
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 玩偶展示区域 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 常规款玩偶 */}
          {regularFigures.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Regular Collection
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {regularFigures.map((figure) => (
                  <div key={figure.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                      {/* 玩偶图片 */}
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={figure.imageUrl || '/images/placeholder-figure.jpg'}
                          alt={figure.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* 玩偶信息 */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-sm text-center group-hover:text-purple-600 transition-colors">
                          {figure.name}
                        </h3>
                        {figure.description && (
                          <p className="text-xs text-gray-600 mt-2 text-center line-clamp-2">
                            {figure.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 隐藏款玩偶 */}
          {secretFigures.length > 0 && (
            <div>
              <div className="flex items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Secret Collection
                </h2>
                <div className="ml-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  RARE
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {secretFigures.map((figure) => (
                  <div key={figure.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift relative">
                      {/* 隐藏款徽章 */}
                      <div className="secret-badge z-10">
                        SECRET
                      </div>
                      
                      {/* 玩偶图片 */}
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={figure.imageUrl || '/images/placeholder-figure.jpg'}
                          alt={figure.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* 金色边框效果 */}
                        <div className="absolute inset-0 border-2 border-yellow-400 opacity-50"></div>
                      </div>
                      
                      {/* 玩偶信息 */}
                      <div className="p-4 bg-gradient-to-t from-yellow-50 to-white">
                        <h3 className="font-semibold text-gray-900 text-sm text-center group-hover:text-yellow-600 transition-colors">
                          {figure.name}
                        </h3>
                        {figure.description && (
                          <p className="text-xs text-gray-600 mt-2 text-center line-clamp-2">
                            {figure.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 空状态 */}
          {figures.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Figures Available</h3>
              <p className="text-gray-600">
                Figure information for this series is currently being updated. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 相关内容区域 */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Learn More About Labubu
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              New to collecting Labubu figures? Check out our authenticity guide to ensure you're getting genuine products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/guides/how-to-spot-fake" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Authenticity Guide
              </Link>
              <Link 
                href="/series" 
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
              >
                Explore Other Series
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${series.name} Series`,
            "description": series.description,
            "url": `https://labubuworld.org/series/${series.slug}`,
            "image": series.coverImageUrl,
            "datePublished": series.releaseDate,
            "publisher": {
              "@type": "Organization",
              "name": "Labubu World",
              "url": "https://labubuworld.org"
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": figures.length,
              "itemListElement": figures.map((figure, index) => ({
                "@type": "Product",
                "position": index + 1,
                "name": figure.name,
                "description": figure.description,
                "image": figure.imageUrl,
                "category": figure.isSecret ? "Secret Figure" : "Regular Figure"
              }))
            }
          })
        }}
      />
    </div>
  )
} 