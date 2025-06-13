import type { Metadata } from 'next'

// 真假鉴定指南页面的元数据
export const metadata: Metadata = {
  title: 'How to Spot Fake Labubu Figures | Authenticity Guide | Labubu World',
  description: 'Complete guide to identifying authentic Labubu figures. Learn to spot fake collectibles with our detailed authenticity verification steps.',
  keywords: 'Labubu authenticity, fake Labubu, how to spot fake, Pop Mart verification, Labubu guide',
}

export default function AuthenticityGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题区域 */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Labubu Authenticity Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn how to identify genuine Labubu figures and protect yourself from counterfeit products. 
              This comprehensive guide covers everything from packaging to figure details.
            </p>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* 包装盒部分 */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-0">The Box (包装盒)</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Seal Quality</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Authentic:</strong> One-time destructible seal that cannot be reopened without damage</li>
                    <li><strong>Fake:</strong> May use re-sealable designs or poor quality adhesive</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Print Quality</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Authentic:</strong> Rich, vibrant colors with sharp, clear fonts and graphics</li>
                    <li><strong>Fake:</strong> Blurry printing, color variations, or unclear text</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    💡 <strong>Pro Tip:</strong> Compare the box quality with official images from Pop Mart's website or social media.
                  </p>
                </div>
              </div>
            </div>

            {/* 防伪标签部分 */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-0">Anti-Counterfeit Sticker (防伪标签)</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Holographic Sticker</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Look for the "Double P" holographic security sticker on authentic boxes</li>
                    <li>The hologram should have clear color shifts when viewed from different angles</li>
                    <li>Fake stickers often appear dull or lack the proper holographic effect</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">QR Code Verification</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Newer authentic products include a QR code for verification</li>
                    <li>Scan with Pop Mart's official WeChat mini-program</li>
                    <li>This is the most reliable authentication method available</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    ✅ <strong>Most Reliable:</strong> QR code verification through official Pop Mart channels is your best bet for authentication.
                  </p>
                </div>
              </div>
            </div>

            {/* 公仔本身部分 */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-0">The Figure (公仔本身)</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Material & Weight</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Authentic:</strong> High-quality PVC with substantial weight and premium feel</li>
                    <li><strong>Fake:</strong> Usually lighter with a more plastic-like texture</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Paint Details</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Carefully examine teeth, eyes, and body paint application</li>
                    <li><strong>Authentic:</strong> Clean paint lines with sharp, precise edges</li>
                    <li><strong>Fake:</strong> Often shows paint bleeding, missing details, or asymmetrical features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Bottom Stamp</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Check the bottom of the figure for copyright stamps</li>
                    <li><strong>Authentic:</strong> Clear, well-defined "©Kasing Lung" and "POP MART" stamps</li>
                    <li><strong>Fake:</strong> Blurry, incorrect, or missing stamps</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">
                    ⚠️ <strong>Warning:</strong> Pay special attention to facial details - this is where most fakes fail to match authentic quality.
                  </p>
                </div>
              </div>
            </div>

            {/* 内部配件部分 */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-0">Accessories (内部配件)</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">ID Card</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Authentic:</strong> High-quality cardstock with vibrant, crisp printing</li>
                    <li><strong>Fake:</strong> Thin paper with poor print quality or color inconsistencies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Desiccant Pack</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Authentic packages include a desiccant packet with Pop Mart branding</li>
                    <li>Check for proper Pop Mart logo printing on the desiccant pack</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">
                    🔍 <strong>Detail Check:</strong> Even small accessories like desiccant packs should bear official branding on authentic products.
                  </p>
                </div>
              </div>
            </div>

            {/* 购买建议部分 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Purchase Recommendations</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">✅ Trusted Sources</h3>
                  <ul className="space-y-2">
                    <li>• Official Pop Mart stores and website</li>
                    <li>• Authorized retailers and distributors</li>
                    <li>• Verified sellers with authentication guarantees</li>
                    <li>• Established collectible toy stores</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">❌ Red Flags</h3>
                  <ul className="space-y-2">
                    <li>• Prices significantly below retail</li>
                    <li>• Unverified online marketplaces</li>
                    <li>• Sellers without authentication proof</li>
                    <li>• Bulk quantities of "rare" figures</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg">
                <p className="text-lg font-medium">
                  💎 Remember: If the deal seems too good to be true, it probably is. 
                  Authentic Labubu figures maintain their value due to their quality and limited availability.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
} 