import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllSeriesFromFile,
  updateSeriesInFile, 
  deleteSeriesFromFile 
} from '@/lib/file-store'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的系列ID' },
        { status: 400 }
      )
    }

    const series = await getAllSeriesFromFile()
    const targetSeries = series.find(s => s.id === id)
    
    if (!targetSeries) {
      return NextResponse.json(
        { error: '系列不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(targetSeries)
  } catch (error) {
    console.error('获取系列失败:', error)
    return NextResponse.json(
      { error: '获取系列失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的系列ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, slug, releaseDate, description, coverImageUrl } = body

    const updatedSeries = await updateSeriesInFile(id, {
      name,
      slug,
      releaseDate,
      description,
      coverImageUrl
    })

    if (!updatedSeries) {
      return NextResponse.json(
        { error: '系列不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedSeries)
  } catch (error) {
    console.error('更新系列失败:', error)
    return NextResponse.json(
      { error: '更新系列失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的系列ID' },
        { status: 400 }
      )
    }

    const success = await deleteSeriesFromFile(id)
    
    if (!success) {
      return NextResponse.json(
        { error: '系列不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '系列删除成功' })
  } catch (error) {
    console.error('删除系列失败:', error)
    return NextResponse.json(
      { error: '删除系列失败' },
      { status: 500 }
    )
  }
} 