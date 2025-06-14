'use client'

export default function ImageUrlHelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-cute">
          <div className="p-8">
            <h1 className="text-3xl font-bold title-cute mb-6 font-comfortaa">
              📸 图片链接使用指南
            </h1>
            
            <div className="space-y-8">
              {/* ImgBB 使用说明 */}
              <section>
                <h2 className="text-2xl font-semibold text-cute-700 mb-4 font-comfortaa">
                  🌟 ImgBB 图床使用方法
                </h2>
                
                <div className="bg-pink-50 rounded-cute p-6 mb-4">
                  <h3 className="text-lg font-semibold text-cute-600 mb-3 font-quicksand">
                    ❌ 错误的链接格式：
                  </h3>
                  <code className="bg-red-100 text-red-700 px-3 py-2 rounded-cute block font-mono text-sm">
                    https://ibb.co/Q7dVLbBz
                  </code>
                  <p className="text-cute-600 mt-2 text-sm">
                    这是分享页面链接，不是直接图片链接，无法在网站中显示图片。
                  </p>
                </div>

                <div className="bg-green-50 rounded-cute p-6 mb-4">
                  <h3 className="text-lg font-semibold text-cute-600 mb-3 font-quicksand">
                    ✅ 正确的链接格式：
                  </h3>
                  <code className="bg-green-100 text-green-700 px-3 py-2 rounded-cute block font-mono text-sm">
                    https://i.ibb.co/Q7dVLbBz/image-name.jpg
                  </code>
                  <p className="text-cute-600 mt-2 text-sm">
                    这是直接图片链接，可以在网站中正常显示图片。
                  </p>
                </div>
              </section>

              {/* 获取正确链接的步骤 */}
              <section>
                <h2 className="text-2xl font-semibold text-cute-700 mb-4 font-comfortaa">
                  📋 获取正确链接的步骤
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-cute-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-cute-700 font-quicksand">上传图片到 ImgBB</h3>
                      <p className="text-cute-600 text-sm">访问 https://imgbb.com 并上传您的图片</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-cute-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-cute-700 font-quicksand">找到 "Direct links" 部分</h3>
                      <p className="text-cute-600 text-sm">在上传完成页面中，找到 "Direct links" 或"直接链接"部分</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-cute-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-cute-700 font-quicksand">复制 "Image link" 或 "BBCode"</h3>
                      <p className="text-cute-600 text-sm">复制以 https://i.ibb.co/ 开头的链接</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-cute-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-cute-700 font-quicksand">粘贴到表单中</h3>
                      <p className="text-cute-600 text-sm">将正确的直接链接粘贴到 "Featured Image URL" 字段中</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 其他图床选择 */}
              <section>
                <h2 className="text-2xl font-semibold text-cute-700 mb-4 font-comfortaa">
                  🔗 其他推荐图床
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-cute p-4 border border-pink-200">
                    <h3 className="font-semibold text-cute-700 mb-2 font-quicksand">Imgur</h3>
                    <p className="text-cute-600 text-sm">https://imgur.com</p>
                    <p className="text-cute-500 text-xs mt-1">免费，稳定，支持直接链接</p>
                  </div>

                  <div className="bg-white rounded-cute p-4 border border-pink-200">
                    <h3 className="font-semibold text-cute-700 mb-2 font-quicksand">Cloudinary</h3>
                    <p className="text-cute-600 text-sm">https://cloudinary.com</p>
                    <p className="text-cute-500 text-xs mt-1">专业图片服务，有免费额度</p>
                  </div>

                  <div className="bg-white rounded-cute p-4 border border-pink-200">
                    <h3 className="font-semibold text-cute-700 mb-2 font-quicksand">GitHub</h3>
                    <p className="text-cute-600 text-sm">上传到 GitHub 仓库</p>
                    <p className="text-cute-500 text-xs mt-1">使用 raw.githubusercontent.com 链接</p>
                  </div>

                  <div className="bg-white rounded-cute p-4 border border-pink-200">
                    <h3 className="font-semibold text-cute-700 mb-2 font-quicksand">本地上传</h3>
                    <p className="text-cute-600 text-sm">上传到 /public/images/ 目录</p>
                    <p className="text-cute-500 text-xs mt-1">使用相对路径如 /images/my-image.jpg</p>
                  </div>
                </div>
              </section>

              {/* 注意事项 */}
              <section>
                <h2 className="text-2xl font-semibold text-cute-700 mb-4 font-comfortaa">
                  ⚠️ 注意事项
                </h2>
                
                <div className="bg-yellow-50 rounded-cute p-6">
                  <ul className="space-y-2 text-cute-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-500">•</span>
                      <span className="text-sm">确保图片链接以 .jpg、.png、.gif、.webp 等图片格式结尾</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-500">•</span>
                      <span className="text-sm">避免使用过大的图片文件（建议小于 2MB）</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-500">•</span>
                      <span className="text-sm">建议使用 HTTPS 链接以确保安全性</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-500">•</span>
                      <span className="text-sm">测试链接是否可以在浏览器中直接打开并显示图片</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 返回按钮 */}
              <div className="text-center pt-6">
                <button
                  onClick={() => window.history.back()}
                  className="btn-cute"
                >
                  ← 返回管理页面
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 