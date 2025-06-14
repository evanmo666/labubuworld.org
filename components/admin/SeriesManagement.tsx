"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// 定义Series类型
interface Series {
  id: number
  name: string
  slug: string
  releaseDate: string | null
  description: string
  coverImageUrl: string
}

export function SeriesManagement() {
  const router = useRouter()
  const [series, setSeries] = useState<Series[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSeries, setEditingSeries] = useState<Series | null>(null)

  // 检查认证状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin/login')
      return
    }
    loadSeries()
  }, [router])

  const loadSeries = async () => {
    try {
      const response = await fetch('/api/admin/series')
      if (response.ok) {
        const data = await response.json()
        setSeries(data)
      } else {
        console.error('加载系列失败:', response.statusText)
      }
    } catch (error) {
      console.error('加载系列失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (seriesItem: Series) => {
    setEditingSeries(seriesItem)
    setShowAddForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这个系列吗？这将同时删除该系列下的所有玩偶。')) {
      try {
        const response = await fetch(`/api/admin/series/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          // 从列表中移除已删除的系列
          setSeries(series.filter(s => s.id !== id))
        } else {
          console.error('删除系列失败:', response.statusText)
          alert('删除系列失败，请重试')
        }
      } catch (error) {
        console.error('删除系列失败:', error)
        alert('删除系列失败，请重试')
      }
    }
  }

  const handleSave = async (formData: Partial<Series>) => {
    try {
      if (editingSeries) {
        // 更新现有系列
        const response = await fetch(`/api/admin/series/${editingSeries.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const updatedSeries = await response.json()
          setSeries(series.map(s => 
            s.id === editingSeries.id ? updatedSeries : s
          ))
        } else {
          console.error('更新系列失败:', response.statusText)
          alert('更新系列失败，请重试')
          return
        }
      } else {
        // 添加新系列
        const response = await fetch('/api/admin/series', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const newSeries = await response.json()
          setSeries([...series, newSeries])
        } else {
          console.error('创建系列失败:', response.statusText)
          alert('创建系列失败，请重试')
          return
        }
      }
      
      setShowAddForm(false)
      setEditingSeries(null)
    } catch (error) {
      console.error('保存系列失败:', error)
      alert('保存系列失败，请重试')
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
                Manage Series
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingSeries(null)
                setShowAddForm(true)
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Series
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 系列列表 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">All Series ({series.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Series
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Release Date
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
                {series.map((seriesItem) => (
                  <tr key={seriesItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <Image
                            src={seriesItem.coverImageUrl || '/images/placeholder-series.jpg'}
                            alt={seriesItem.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {seriesItem.name}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {seriesItem.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {seriesItem.releaseDate ? new Date(seriesItem.releaseDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {seriesItem.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(seriesItem)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(seriesItem.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                      <Link
                        href={`/series/${seriesItem.slug}`}
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
        {series.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No series found</div>
            <button
              onClick={() => {
                setEditingSeries(null)
                setShowAddForm(true)
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add First Series
            </button>
          </div>
        )}
      </main>

      {/* 添加/编辑表单模态框 */}
      {showAddForm && (
        <SeriesForm
          series={editingSeries}
          onSave={handleSave}
          onCancel={() => {
            setShowAddForm(false)
            setEditingSeries(null)
          }}
        />
      )}
    </div>
  )
}

// 系列表单组件
function SeriesForm({ 
  series, 
  onSave, 
  onCancel 
}: { 
  series: Series | null
  onSave: (data: Partial<Series>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: series?.name || '',
    slug: series?.slug || '',
    releaseDate: series?.releaseDate || '',
    description: series?.description || '',
    coverImageUrl: series?.coverImageUrl || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {series ? 'Edit Series' : 'Add New Series'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Series Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
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
                URL-friendly identifier (e.g., "art-series")
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Release Date
              </label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.coverImageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImageUrl: e.target.value }))}
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
              {formData.coverImageUrl && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">图片预览：</p>
                  <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={formData.coverImageUrl}
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
                {series ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 