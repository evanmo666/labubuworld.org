import { NextRequest, NextResponse } from 'next/server'
import { updateSeriesInMemory, deleteSeriesFromMemory, convertImgBBUrl } from '@/lib/memory-store'

// 更新系列
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

    // 更新系列数据
    const updateData = {
      name,
      slug,
      releaseDate: releaseDate || null,
      description: description || null,
      coverImageUrl: coverImageUrl || null
    }

    const updatedSeries = updateSeriesInMemory(id, updateData)
    
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

// 删除系列
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

    const success = deleteSeriesFromMemory(id)
    
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