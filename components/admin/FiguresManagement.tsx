"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllSeries, getFiguresBySeriesId, type Series, type Figure } from '@/lib/db'

export function FiguresManagement() {
  const router = useRouter()
  const [series, setSeries] = useState<Series[]>([])
  const [figures, setFigures] = useState<Figure[]>([])
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingFigure, setEditingFigure] = useState<Figure | null>(null)

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
      const data = await getAllSeries()
      setSeries(data)
      if (data.length > 0) {
        setSelectedSeriesId(data[0].id)
        loadFigures(data[0].id)
      }
    } catch (error) {
      console.error('加载系列失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadFigures = async (seriesId: number) => {
    try {
      const data = await getFiguresBySeriesId(seriesId)
      setFigures(data)
    } catch (error) {
      console.error('加载玩偶失败:', error)
    }
  }

  const handleSeriesChange = (seriesId: number) => {
    setSelectedSeriesId(seriesId)
    loadFigures(seriesId)
  }

  const handleEdit = (figure: Figure) => {
    setEditingFigure(figure)
    setShowAddForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这个玩偶吗？')) {
      // 这里应该调用删除API
      console.log('删除玩偶:', id)
      // 临时从列表中移除
      setFigures(figures.filter(f => f.id !== id))
    }
  }

  const handleSave = async (formData: Partial<Figure>) => {
    try {
      if (editingFigure) {
        // 更新现有玩偶
        const updatedFigures = figures.map(f => 
          f.id === editingFigure.id 
            ? { ...f, ...formData }
            : f
        )
        setFigures(updatedFigures)
      } else {
        // 添加新玩偶
        const newFigure: Figure = {
          id: Math.max(...figures.map(f => f.id), 0) + 1,
          name: formData.name || '',
          seriesId: selectedSeriesId || 1,
          isSecret: formData.isSecret || false,
          imageUrl: formData.imageUrl || null,
          description: formData.description || null
        }
        setFigures([...figures, newFigure])
      }
      setShowAddForm(false)
      setEditingFigure(null)
    } catch (error) {
      console.error('保存玩偶失败:', error)
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

  const selectedSeries = series.find(s => s.id === selectedSeriesId)

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
              disabled={!selectedSeriesId}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              Add New Figure
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 系列选择器 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Series</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {series.map((seriesItem) => (
              <button
                key={seriesItem.id}
                onClick={() => handleSeriesChange(seriesItem.id)}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedSeriesId === seriesItem.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={seriesItem.coverImageUrl || '/images/placeholder-series.jpg'}
                    alt={seriesItem.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{seriesItem.name}</h3>
                    <p className="text-sm text-gray-500">
                      {figures.filter(f => f.seriesId === seriesItem.id).length} figures
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 玩偶列表 */}
        {selectedSeries && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedSeries.name} Figures ({figures.length})
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
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {figures.map((figure) => (
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          figure.isSecret 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-gray-100 text-gray-800'
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
                        <Link
                          href={`/figures/${figure.id}`}
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
        )}
      </main>

      {/* 添加/编辑表单模态框 */}
      {showAddForm && selectedSeriesId && (
        <FigureForm
          figure={editingFigure}
          seriesId={selectedSeriesId}
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
  seriesId,
  onSave, 
  onCancel 
}: { 
  figure: Figure | null
  seriesId: number
  onSave: (data: Partial<Figure>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: figure?.name || '',
    isSecret: figure?.isSecret || false,
    imageUrl: figure?.imageUrl || '',
    description: figure?.description || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      seriesId
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {figure ? 'Edit Figure' : 'Add New Figure'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Figure Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter figure name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  checked={!formData.isSecret}
                  onChange={() => setFormData({ ...formData, isSecret: false })}
                  className="mr-2"
                />
                Regular Figure
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  checked={formData.isSecret}
                  onChange={() => setFormData({ ...formData, isSecret: true })}
                  className="mr-2"
                />
                Secret Figure
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter figure description"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {figure ? 'Update Figure' : 'Create Figure'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 