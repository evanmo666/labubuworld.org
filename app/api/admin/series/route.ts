import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllSeriesFromFile, 
  createSeriesInFile 
} from '@/lib/file-store'

// 获取所有系列
export async function GET() {
  try {
    const series = await getAllSeriesFromFile()
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
    if (!name || !slug || !description) {
      return NextResponse.json(
        { error: '名称、slug和描述为必填字段' },
        { status: 400 }
      )
    }

    const newSeries = await createSeriesInFile({
      name,
      slug,
      releaseDate: releaseDate || null,
      description,
      coverImageUrl: coverImageUrl || ''
    })

    return NextResponse.json(newSeries, { status: 201 })
  } catch (error) {
    console.error('创建系列失败:', error)
    return NextResponse.json(
      { error: '创建系列失败' },
      { status: 500 }
    )
  }
} 