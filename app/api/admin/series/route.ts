import { NextRequest, NextResponse } from 'next/server'
import { getAllSeries } from '@/lib/db'
import { getAllSeriesFromMemory, createSeriesInMemory, convertImgBBUrl } from '@/lib/memory-store'

// 获取所有系列
export async function GET() {
  try {
    // 优先使用数据库，如果不可用则使用内存存储
    let series
    try {
      series = await getAllSeries()
    } catch (error) {
      console.log('数据库不可用，使用内存存储')
      series = getAllSeriesFromMemory()
    }
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
    let { name, slug, releaseDate, description, coverImageUrl } = body

    // 验证必填字段
    if (!name || !slug) {
      return NextResponse.json(
        { error: '系列名称和slug是必填字段' },
        { status: 400 }
      )
    }

    // 转换ImgBB链接格式
    if (coverImageUrl) {
      coverImageUrl = convertImgBBUrl(coverImageUrl)
    }

    // 创建新系列数据
    const seriesData = {
      name,
      slug,
      releaseDate: releaseDate || null,
      description: description || null,
      coverImageUrl: coverImageUrl || null
    }

    // 使用内存存储创建系列
    const newSeries = createSeriesInMemory(seriesData)

    return NextResponse.json(newSeries, { status: 201 })
  } catch (error) {
    console.error('创建系列失败:', error)
    return NextResponse.json(
      { error: '创建系列失败' },
      { status: 500 }
    )
  }
} 