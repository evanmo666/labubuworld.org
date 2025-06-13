import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// 关于页面的元数据
export const metadata: Metadata = {
  title: 'About Labubu | The Story Behind the Magic | Labubu World',
  description: 'Discover the story of Labubu, created by artist Kasing Lung. Learn about the origins, inspiration, and cultural impact of these beloved collectible figures.',
  keywords: 'Labubu story, Kasing Lung, Pop Mart, collectible figures history, designer toys',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero 区域 */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Labubu
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              The Story Behind the Magic
            </p>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Discover the enchanting world of Labubu, from its artistic origins 
              to becoming a global cultural phenomenon in the collectible figure community.
            </p>
          </div>
        </div>
      </section>

      {/* Labubu 介绍区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Labubu 形象占位 */}
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧚</div>
                  <p className="text-gray-600">Labubu Character Image</p>
                </div>
              </div>
            </div>

            {/* Labubu 介绍文字 */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Labubu
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Labubu is a mischievous fairy character known for its distinctive 
                  pointed ears, sharp teeth, and playful personality. Originally created 
                  as part of <strong>The Monsters</strong> series, Labubu has grown to become 
                  one of the most beloved characters in the designer toy world.
                </p>
                
                <p>
                  With its signature green color and impish grin, Labubu represents 
                  the perfect balance between cute and edgy - a design philosophy that 
                  has resonated with collectors worldwide. Each figure captures the 
                  character's unique charm while exploring different themes and aesthetics.
                </p>
                
                <p>
                  From art-inspired series to food-themed collections, Labubu continues 
                  to evolve while maintaining its core identity as a lovable trickster 
                  that brings joy to collectors of all ages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kasing Lung 介绍区域 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 艺术家介绍文字 */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Artist: Kasing Lung
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  <strong>Kasing Lung (龙家升)</strong> is a Hong Kong-based artist and designer 
                  who created the Labubu character. Known for his distinctive artistic style 
                  that blends Eastern and Western influences, Kasing has become one of the 
                  most recognizable names in the designer toy industry.
                </p>
                
                <p>
                  His work often explores themes of fantasy, mythology, and pop culture, 
                  creating characters that are both familiar and fantastical. The success 
                  of Labubu has established Kasing Lung as a major force in contemporary 
                  collectible art.
                </p>
                
                <p>
                  Through his partnership with <strong>Pop Mart</strong>, Kasing has brought 
                  Labubu to a global audience, turning a simple character design into 
                  a cultural phenomenon that spans continents and generations.
                </p>
              </div>
            </div>

            {/* 艺术家形象占位 */}
            <div className="order-1 lg:order-2 relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-gray-600">Kasing Lung Portrait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pop Mart 合作区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Pop Mart Partnership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How a creative collaboration transformed Labubu into a global phenomenon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 创意合作 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Creative Vision</h3>
              <p className="text-gray-600">
                Pop Mart's platform allowed Kasing Lung's artistic vision to reach 
                millions of collectors worldwide, bringing designer art to the mainstream.
              </p>
            </div>

            {/* 生产质量 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Manufacturing</h3>
              <p className="text-gray-600">
                Pop Mart's expertise in collectible figure production ensures that 
                each Labubu figure meets the highest standards of quality and detail.
              </p>
            </div>

            {/* 全球发行 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Distribution</h3>
              <p className="text-gray-600">
                Through Pop Mart's international network, Labubu figures are now 
                available to collectors in over 20 countries and regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 文化影响区域 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Cultural Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How Labubu has influenced and shaped the modern collectible culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 收藏文化 */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Collector Community
              </h3>
              <p className="text-gray-700 mb-4">
                Labubu has fostered a vibrant global community of collectors who share 
                their passion through social media, trading events, and fan gatherings. 
                The character has become more than just a collectible - it's a cultural 
                touchstone that brings people together.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Active online communities and forums</li>
                <li>Regular collector meetups and events</li>
                <li>Secondary market trading and exchanges</li>
                <li>Custom modifications and art projects</li>
              </ul>
            </div>

            {/* 艺术影响 */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Artistic Influence
              </h3>
              <p className="text-gray-700 mb-4">
                The success of Labubu has paved the way for other designer toy artists 
                and has elevated the entire industry. It has shown that character-driven 
                collectibles can be both commercially successful and artistically meaningful.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Inspired new generations of toy designers</li>
                <li>Elevated designer toys to mainstream appeal</li>
                <li>Influenced fashion and lifestyle collaborations</li>
                <li>Created new appreciation for collectible art</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 行动召唤区域 */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Labubu Journey
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Ready to explore the magical world of Labubu? Discover all the series, 
              learn about authenticity, and join the global collector community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/series" 
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Explore All Series
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

      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Labubu",
            "description": "Learn about Labubu, the beloved collectible figure character created by artist Kasing Lung",
            "url": "https://labubuworld.org/about",
            "mainEntity": {
              "@type": "Person",
              "name": "Kasing Lung",
              "description": "Hong Kong-based artist and creator of Labubu",
              "nationality": "Hong Kong",
              "knowsAbout": ["Designer Toys", "Character Design", "Collectible Art"],
              "creator": {
                "@type": "CreativeWork",
                "name": "Labubu",
                "description": "Popular collectible figure character",
                "genre": "Designer Toy"
              }
            },
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