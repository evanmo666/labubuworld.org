import { NextRequest, NextResponse } from 'next/server'
import { getAllSeries } from '@/lib/db'

// 获取所有系列
export async function GET() {
  try {
    const series = await getAllSeries()
    return NextResponse.json(series)
  } catch (error) {
    console.error('获取系列列表失败:', error)
    return NextResponse.json(
      { error: '获取系列列表失败' },
      { status: 500 }
    )
  }
}

// 创建新系列
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, releaseDate, description, coverImageUrl } = body

    // 验证必填字段
    if (!name || !slug) {
      return NextResponse.json(
        { error: '系列名称和slug是必填字段' },
        { status: 400 }
      )
    }

    // 这里应该调用数据库插入操作
    // 暂时返回成功响应
    const newSeries = {
      id: Date.now(), // 临时ID生成
      name,
      slug,
      releaseDate: releaseDate || null,
      description: description || null,
      coverImageUrl: coverImageUrl || null
    }

    return NextResponse.json(newSeries, { status: 201 })
  } catch (error) {
    console.error('创建系列失败:', error)
    return NextResponse.json(
      { error: '创建系列失败' },
      { status: 500 }
    )
  }
} 