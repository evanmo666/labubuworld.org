"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// 定义NewsPost类型
interface NewsPost {
  id: number
  title: string
  slug: string
  content: string
  publishedAt: string
  imageUrl: string
}

export function NewsManagement() {
  const router = useRouter()
  const [news, setNews] = useState<NewsPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null)

  // 检查认证状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin/login')
      return
    }
    loadNews()
  }, [router])

  const loadNews = async () => {
    try {
      const response = await fetch('/api/admin/news')
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      } else {
        console.error('加载新闻失败:', response.statusText)
      }
    } catch (error) {
      console.error('加载新闻失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (newsItem: NewsPost) => {
    setEditingNews(newsItem)
    setShowAddForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这篇新闻吗？')) {
      try {
        const response = await fetch(`/api/admin/news/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setNews(news.filter(n => n.id !== id))
        } else {
          console.error('删除新闻失败:', response.statusText)
          alert('删除新闻失败，请重试')
        }
      } catch (error) {
        console.error('删除新闻失败:', error)
        alert('删除新闻失败，请重试')
      }
    }
  }

  const handleSave = async (formData: Partial<NewsPost>) => {
    try {
      if (editingNews) {
        // 更新现有新闻
        const response = await fetch(`/api/admin/news/${editingNews.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const updatedNews = await response.json()
          setNews(news.map(n => 
            n.id === editingNews.id ? updatedNews : n
          ))
        } else {
          console.error('更新新闻失败:', response.statusText)
          alert('更新新闻失败，请重试')
          return
        }
      } else {
        // 添加新新闻
        const response = await fetch('/api/admin/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const newNews = await response.json()
          setNews([newNews, ...news])
        } else {
          console.error('创建新闻失败:', response.statusText)
          alert('创建新闻失败，请重试')
          return
        }
      }
      
      setShowAddForm(false)
      setEditingNews(null)
    } catch (error) {
      console.error('保存新闻失败:', error)
      alert('保存新闻失败，请重试')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Manage News
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingNews(null)
                setShowAddForm(true)
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Article
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 新闻列表 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">All Articles ({news.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {news.map((newsItem) => (
                  <tr key={newsItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <Image
                            src={newsItem.imageUrl || '/images/placeholder-news.jpg'}
                            alt={newsItem.title}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {newsItem.title}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {newsItem.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(newsItem.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {newsItem.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(newsItem)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(newsItem.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                      <Link
                        href={`/news/${newsItem.slug}`}
                        target="_blank"
                        className="text-green-600 hover:text-green-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 空状态 */}
        {news.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No articles found</div>
            <button
              onClick={() => {
                setEditingNews(null)
                setShowAddForm(true)
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add First Article
            </button>
          </div>
        )}
      </main>

      {/* 添加/编辑表单模态框 */}
      {showAddForm && (
        <NewsForm
          news={editingNews}
          onSave={handleSave}
          onCancel={() => {
            setShowAddForm(false)
            setEditingNews(null)
          }}
        />
      )}
    </div>
  )
}

// 新闻表单组件
function NewsForm({ 
  news, 
  onSave, 
  onCancel 
}: { 
  news: NewsPost | null
  onSave: (data: Partial<NewsPost>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    slug: news?.slug || '',
    content: news?.content || '',
    imageUrl: news?.imageUrl || '',
    publishedAt: news?.publishedAt ? news.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      publishedAt: new Date(formData.publishedAt).toISOString()
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {news ? 'Edit Article' : 'Add New Article'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                URL-friendly identifier (e.g., "labubu-news-update")
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="支持HTML标签，如 <p>、<strong>、<em> 等"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                支持基本HTML标签进行格式化
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://i.ibb.co/xxxxxx/image.jpg"
              />
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">
                  💡 支持ImgBB链接，系统会自动转换格式
                </p>
                <p className="text-xs text-blue-600">
                  📝 ImgBB格式：https://ibb.co/Q7dVLbBz → 自动转换为直接链接
                </p>
                <p className="text-xs text-green-600">
                  ✅ 直接链接格式：https://i.ibb.co/xxxxxx/image.jpg
                </p>
              </div>
              {formData.imageUrl && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">图片预览：</p>
                  <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.textContent = '❌ 图片加载失败';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 hidden">
                      ❌ 图片加载失败
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date
              </label>
              <input
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {news ? 'Update' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 