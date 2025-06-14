import { NextRequest, NextResponse } from 'next/server'
import { updateFigureInMemory, deleteFigureFromMemory, convertImgBBUrl } from '@/lib/memory-store'

// 更新玩偶
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的玩偶ID' },
        { status: 400 }
      )
    }

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

    // 更新玩偶数据
    const updateData = {
      name,
      description: description || null,
      imageUrl: imageUrl || null,
      isSecret: Boolean(isSecret),
      seriesId: parseInt(seriesId)
    }

    const updatedFigure = updateFigureInMemory(id, updateData)
    
    if (!updatedFigure) {
      return NextResponse.json(
        { error: '玩偶不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedFigure)
  } catch (error) {
    console.error('更新玩偶失败:', error)
    return NextResponse.json(
      { error: '更新玩偶失败' },
      { status: 500 }
    )
  }
}

// 删除玩偶
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的玩偶ID' },
        { status: 400 }
      )
    }

    const success = deleteFigureFromMemory(id)
    
    if (!success) {
      return NextResponse.json(
        { error: '玩偶不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '玩偶删除成功' })
  } catch (error) {
    console.error('删除玩偶失败:', error)
    return NextResponse.json(
      { error: '删除玩偶失败' },
      { status: 500 }
    )
  }
} 