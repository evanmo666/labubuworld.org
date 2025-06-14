"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// 定义类型
interface Series {
  id: number
  name: string
  slug: string
  releaseDate: string | null
  description: string
  coverImageUrl: string
}

interface Figure {
  id: number
  name: string
  description: string
  imageUrl: string
  isSecret: boolean
  seriesId: number
}

export function FiguresManagement() {
  const router = useRouter()
  const [figures, setFigures] = useState<Figure[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingFigure, setEditingFigure] = useState<Figure | null>(null)
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null)

  // 检查认证状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/admin/login')
      return
    }
    loadData()
  }, [router])

  const loadData = async () => {
    try {
      // 并行加载系列和玩偶数据
      const [seriesResponse, figuresResponse] = await Promise.all([
        fetch('/api/admin/series'),
        fetch('/api/admin/figures')
      ])
      
      if (seriesResponse.ok) {
        const seriesData = await seriesResponse.json()
        setSeries(seriesData)
      }
      
      if (figuresResponse.ok) {
        const figuresData = await figuresResponse.json()
        setFigures(figuresData)
      }
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (figure: Figure) => {
    setEditingFigure(figure)
    setShowAddForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这个玩偶吗？')) {
      try {
        const response = await fetch(`/api/admin/figures/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setFigures(figures.filter(f => f.id !== id))
        } else {
          console.error('删除玩偶失败:', response.statusText)
          alert('删除玩偶失败，请重试')
        }
      } catch (error) {
        console.error('删除玩偶失败:', error)
        alert('删除玩偶失败，请重试')
      }
    }
  }

  const handleSave = async (formData: Partial<Figure>) => {
    try {
      if (editingFigure) {
        // 更新现有玩偶
        const response = await fetch(`/api/admin/figures/${editingFigure.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const updatedFigure = await response.json()
          setFigures(figures.map(f => 
            f.id === editingFigure.id ? updatedFigure : f
          ))
        } else {
          console.error('更新玩偶失败:', response.statusText)
          alert('更新玩偶失败，请重试')
          return
        }
      } else {
        // 添加新玩偶
        const response = await fetch('/api/admin/figures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const newFigure = await response.json()
          setFigures([...figures, newFigure])
        } else {
          console.error('创建玩偶失败:', response.statusText)
          alert('创建玩偶失败，请重试')
          return
        }
      }
      
      setShowAddForm(false)
      setEditingFigure(null)
    } catch (error) {
      console.error('保存玩偶失败:', error)
      alert('保存玩偶失败，请重试')
    }
  }

  // 获取系列名称
  const getSeriesName = (seriesId: number) => {
    const seriesItem = series.find(s => s.id === seriesId)
    return seriesItem?.name || 'Unknown Series'
  }

  // 过滤玩偶
  const filteredFigures = selectedSeries 
    ? figures.filter(f => f.seriesId === selectedSeries)
    : figures

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
                Manage Figures
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingFigure(null)
                setShowAddForm(true)
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Figure
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 过滤器 */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Filter by Series:
            </label>
            <select
              value={selectedSeries || ''}
              onChange={(e) => setSelectedSeries(e.target.value ? parseInt(e.target.value) : null)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Series</option>
              {series.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 玩偶列表 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Figures ({filteredFigures.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Figure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Series
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFigures.map((figure) => (
                  <tr key={figure.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <Image
                            src={figure.imageUrl || '/images/placeholder-figure.jpg'}
                            alt={figure.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {figure.name}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {figure.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getSeriesName(figure.seriesId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        figure.isSecret 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {figure.isSecret ? 'Secret' : 'Regular'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(figure)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(figure.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 空状态 */}
        {filteredFigures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {selectedSeries ? 'No figures found for selected series' : 'No figures found'}
            </div>
            <button
              onClick={() => {
                setEditingFigure(null)
                setShowAddForm(true)
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add First Figure
            </button>
          </div>
        )}
      </main>

      {/* 添加/编辑表单模态框 */}
      {showAddForm && (
        <FigureForm
          figure={editingFigure}
          series={series}
          onSave={handleSave}
          onCancel={() => {
            setShowAddForm(false)
            setEditingFigure(null)
          }}
        />
      )}
    </div>
  )
}

// 玩偶表单组件
function FigureForm({ 
  figure, 
  series,
  onSave, 
  onCancel 
}: { 
  figure: Figure | null
  series: Series[]
  onSave: (data: Partial<Figure>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: figure?.name || '',
    description: figure?.description || '',
    imageUrl: figure?.imageUrl || '',
    isSecret: figure?.isSecret || false,
    seriesId: figure?.seriesId || (series[0]?.id || 0)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {figure ? 'Edit Figure' : 'Add New Figure'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Figure Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Series *
              </label>
              <select
                value={formData.seriesId}
                onChange={(e) => setFormData(prev => ({ ...prev, seriesId: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {series.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
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
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                支持ImgBB链接，系统会自动转换格式
              </p>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isSecret}
                  onChange={(e) => setFormData(prev => ({ ...prev, isSecret: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Secret Figure (隐藏款)
                </span>
              </label>
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
                {figure ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 