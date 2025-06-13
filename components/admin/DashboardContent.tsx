"use client"

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalSeries: number
  totalFigures: number
  totalNews: number
  secretFigures: number
}

export function DashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalSeries: 0,
    totalFigures: 0,
    totalNews: 0,
    secretFigures: 0
  })

  // 检查认证状态
  useEffect(() => {
    if (status === 'loading') return // 仍在加载中
    if (!session) {
      router.push('/admin/login')
      return
    }
  }, [session, status, router])

  // 获取统计数据
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 这里应该调用API获取真实统计数据
        // 暂时使用模拟数据
        setStats({
          totalSeries: 3,
          totalFigures: 9,
          totalNews: 3,
          secretFigures: 2
        })
      } catch (error) {
        console.error('获取统计数据失败:', error)
      }
    }

    if (session) {
      fetchStats()
    }
  }, [session])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // 将重定向到登录页面
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Labubu World Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {session.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Series</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSeries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Figures</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFigures}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">News Articles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalNews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">★</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Secret Figures</p>
                <p className="text-2xl font-bold text-gray-900">{stats.secretFigures}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/admin/series"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">S</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Manage Series</h3>
                    <p className="text-sm text-gray-500">Add, edit, or delete series</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/figures"
                className="block p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">F</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Manage Figures</h3>
                    <p className="text-sm text-gray-500">Add, edit, or delete figures</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/news"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">N</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Manage News</h3>
                    <p className="text-sm text-gray-500">Add, edit, or delete news articles</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 最近活动 */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-600">System initialized with mock data</span>
                <span className="ml-auto text-gray-400">Just now</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-600">Admin dashboard created</span>
                <span className="ml-auto text-gray-400">Just now</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-gray-600">Authentication system configured</span>
                <span className="ml-auto text-gray-400">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 