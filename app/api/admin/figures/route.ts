import { NextRequest, NextResponse } from 'next/server'
import { getAllFiguresFromMemory, createFigureInMemory, convertImgBBUrl } from '@/lib/memory-store'

// 获取所有玩偶
export async function GET() {
  try {
    const figures = getAllFiguresFromMemory()
    return NextResponse.json(figures)
  } catch (error) {
    console.error('获取玩偶列表失败:', error)
    return NextResponse.json(
      { error: '获取玩偶列表失败' },
      { status: 500 }
    )
  }
}

// 创建新玩偶
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { name, description, imageUrl, isSecret, seriesId } = body

    // 验证必填字段
    if (!name || !seriesId) {
      return NextResponse.json(
        { error: '玩偶名称和系列ID是必填字段' },
        { status: 400 }
      )
    }

    // 转换ImgBB链接格式
    if (imageUrl) {
      imageUrl = convertImgBBUrl(imageUrl)
    }

    // 创建新玩偶数据
    const figureData = {
      name,
      description: description || null,
      imageUrl: imageUrl || null,
      isSecret: Boolean(isSecret),
      seriesId: parseInt(seriesId)
    }

    // 使用内存存储创建玩偶
    const newFigure = createFigureInMemory(figureData)

    return NextResponse.json(newFigure, { status: 201 })
  } catch (error) {
    console.error('创建玩偶失败:', error)
    return NextResponse.json(
      { error: '创建玩偶失败' },
      { status: 500 }
    )
  }
} 