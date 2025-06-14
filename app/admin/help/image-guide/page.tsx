import Link from 'next/link'

export default function ImageGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                📸 图片URL使用指南
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          {/* ImgBB 使用指南 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              🌟 ImgBB 图床使用指南（推荐）
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">✅ 正确的链接格式</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border">
                    <strong>直接图片链接：</strong><br/>
                    <code className="text-green-600">https://i.ibb.co/xxxxxx/image.jpg</code>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <strong>系统自动转换：</strong><br/>
                    <code className="text-blue-600">https://ibb.co/Q7dVLbBz</code> → 自动转换为直接链接
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900 mb-2">❌ 错误的链接格式</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border">
                    <strong>分享页面链接（无法直接显示图片）：</strong><br/>
                    <code className="text-red-600">https://ibb.co/Q7dVLbBz</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 使用步骤 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📋 使用步骤
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">上传图片到 ImgBB</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    访问 <a href="https://imgbb.com" target="_blank" className="text-blue-600 hover:underline">imgbb.com</a>，
                    点击"Start uploading"上传您的图片
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">获取直接链接</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    上传完成后，右键点击图片选择"复制图片地址"，或者复制分享链接让系统自动转换
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">粘贴到表单</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    将链接粘贴到后台管理的图片URL输入框中，系统会自动验证和转换格式
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 其他图床选择 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🔗 其他图床选择
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Imgur</h3>
                <p className="text-gray-600 text-sm mb-2">
                  免费图床，支持匿名上传
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  https://i.imgur.com/xxxxxx.jpg
                </code>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Cloudinary</h3>
                <p className="text-gray-600 text-sm mb-2">
                  专业图片CDN服务
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  https://res.cloudinary.com/...
                </code>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">GitHub</h3>
                <p className="text-gray-600 text-sm mb-2">
                  使用GitHub仓库存储图片
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  https://raw.githubusercontent.com/...
                </code>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">自建CDN</h3>
                <p className="text-gray-600 text-sm mb-2">
                  使用自己的服务器或CDN
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  https://your-domain.com/images/...
                </code>
              </div>
            </div>
          </div>

          {/* 注意事项 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ⚠️ 注意事项
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-yellow-500">⚠️</span>
                <p className="text-gray-700 text-sm">
                  <strong>图片尺寸：</strong>建议上传高质量图片，系统会自动优化显示尺寸
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <span className="text-yellow-500">⚠️</span>
                <p className="text-gray-700 text-sm">
                  <strong>图片格式：</strong>支持 JPG、PNG、WebP 等常见格式
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <span className="text-yellow-500">⚠️</span>
                <p className="text-gray-700 text-sm">
                  <strong>链接稳定性：</strong>确保使用的图床服务稳定可靠，避免图片失效
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <span className="text-yellow-500">⚠️</span>
                <p className="text-gray-700 text-sm">
                  <strong>版权问题：</strong>请确保您有权使用上传的图片，避免版权纠纷
                </p>
              </div>
            </div>
          </div>

          {/* 快速测试 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🧪 快速测试
            </h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 text-sm mb-3">
                您可以使用以下测试链接来验证图片显示功能：
              </p>
              
              <div className="space-y-2">
                <div className="bg-white p-2 rounded border">
                  <strong className="text-xs text-gray-600">测试链接 1：</strong><br/>
                  <code className="text-xs text-blue-600">https://i.ibb.co/2M7hjjQ/sample.jpg</code>
                </div>
                
                <div className="bg-white p-2 rounded border">
                  <strong className="text-xs text-gray-600">测试链接 2：</strong><br/>
                  <code className="text-xs text-blue-600">https://i.ibb.co/QDy7L5Q/labubu-sample.png</code>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
} 