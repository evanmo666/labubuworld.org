import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllFiguresFromFile, 
  createFigureInFile 
} from '@/lib/file-store'

// 获取所有玩偶
export async function GET() {
  try {
    const figures = await getAllFiguresFromFile()
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
    const { name, description, imageUrl, isSecret, seriesId } = body

    // 验证必填字段
    if (!name || !description || !seriesId) {
      return NextResponse.json(
        { error: '名称、描述和系列ID为必填字段' },
        { status: 400 }
      )
    }

    const newFigure = await createFigureInFile({
      name,
      description,
      imageUrl: imageUrl || '',
      isSecret: Boolean(isSecret),
      seriesId: parseInt(seriesId)
    })

    return NextResponse.json(newFigure, { status: 201 })
  } catch (error) {
    console.error('创建玩偶失败:', error)
    return NextResponse.json(
      { error: '创建玩偶失败' },
      { status: 500 }
    )
  }
} 