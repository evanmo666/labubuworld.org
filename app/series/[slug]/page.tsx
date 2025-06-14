import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSeriesBySlug } from '@/lib/db'

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
    description: `Explore the ${series.name} Labubu series. ${series.description || 'Discover this amazing Labubu collection with detailed information and beautiful imagery.'}`,
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

  return (
    <div className="min-h-screen gradient-bg">
      {/* 返回导航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/series" 
          className="inline-flex items-center text-cute-600 hover:text-cute-700 text-sm font-medium mb-6 transition-colors font-quicksand"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ← Back to All Series
        </Link>
      </div>

      {/* 系列详情内容 */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* 系列封面图片 */}
            <div className="order-2 lg:order-1">
              <div className="card-cute overflow-hidden hover-lift">
                <div className="aspect-square relative">
                  <Image
                    src={series.coverImageUrl || '/images/placeholder-series.jpg'}
                    alt={`${series.name} series cover`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* 系列信息 */}
            <div className="order-1 lg:order-2">
              <div className="card-cute p-8 md:p-10">
                <h1 className="text-4xl md:text-5xl font-bold title-cute mb-6 font-comfortaa">
                  ✨ {series.name} ✨
                </h1>
                
                {series.releaseDate && (
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 py-2">
                      <p className="text-cute-600 font-medium text-sm font-quicksand">
                        📅 Released: {new Date(series.releaseDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {/* 系列描述内容 */}
                <div className="prose prose-cute max-w-none">
                  {series.description ? (
                    <div 
                      className="text-cute-700 leading-relaxed font-quicksand"
                      dangerouslySetInnerHTML={{ 
                        __html: series.description.replace(/\n/g, '<br />') 
                      }}
                    />
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4 sparkle">🎭</div>
                      <p className="text-cute-600 font-quicksand">
                        This series information is being updated. Please check back soon for detailed content! 💕
                      </p>
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link 
                    href="/guides/how-to-spot-fake" 
                    className="btn-cute flex-1 text-center"
                  >
                    🔍 Authenticity Guide
                  </Link>
                  <Link 
                    href="/series" 
                    className="border-2 border-cute-400 text-cute-600 px-6 py-3 rounded-cute font-semibold hover:bg-cute-400 hover:text-white transition-all duration-300 hover:scale-105 flex-1 text-center font-quicksand"
                  >
                    📚 More Series
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 相关推荐区域 */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold title-cute mb-6 font-comfortaa">
              💖 Discover More Labubu Magic 💖
            </h2>
            <p className="text-cute-600 mb-8 max-w-2xl mx-auto font-quicksand">
              Dive deeper into the wonderful world of Labubu! Learn about authenticity, 
              explore other series, and stay updated with the latest news! ✨
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/guides/how-to-spot-fake" 
                className="card-cute p-6 hover-lift text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔍</div>
                <h3 className="font-bold text-cute-700 mb-2 font-comfortaa">Real VS Fake Guide</h3>
                <p className="text-sm text-cute-600 font-quicksand">
                  Learn to identify authentic Labubu figures
                </p>
              </Link>
              
              <Link 
                href="/series" 
                className="card-cute p-6 hover-lift text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</div>
                <h3 className="font-bold text-cute-700 mb-2 font-comfortaa">All Series</h3>
                <p className="text-sm text-cute-600 font-quicksand">
                  Explore every Labubu series collection
                </p>
              </Link>
              
              <Link 
                href="/news" 
                className="card-cute p-6 hover-lift text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📰</div>
                <h3 className="font-bold text-cute-700 mb-2 font-comfortaa">Latest News</h3>
                <p className="text-sm text-cute-600 font-quicksand">
                  Stay updated with Labubu world news
                </p>
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
            }
          })
        }}
      />
    </div>
  )
} 