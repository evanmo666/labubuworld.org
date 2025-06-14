import { NextRequest, NextResponse } from 'next/server'
import { updateNewsInMemory, deleteNewsFromMemory, convertImgBBUrl } from '@/lib/memory-store'

// 更新新闻
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的新闻ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    let { title, slug, content, imageUrl } = body

    // 验证必填字段
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: '标题、slug和内容是必填字段' },
        { status: 400 }
      )
    }

    // 转换ImgBB链接格式
    if (imageUrl) {
      imageUrl = convertImgBBUrl(imageUrl)
    }

    // 更新新闻数据
    const updateData = {
      title,
      slug,
      content,
      imageUrl: imageUrl || null
    }

    const updatedNews = updateNewsInMemory(id, updateData)
    
    if (!updatedNews) {
      return NextResponse.json(
        { error: '新闻不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error('更新新闻失败:', error)
    return NextResponse.json(
      { error: '更新新闻失败' },
      { status: 500 }
    )
  }
}

// 删除新闻
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的新闻ID' },
        { status: 400 }
      )
    }

    const success = deleteNewsFromMemory(id)
    
    if (!success) {
      return NextResponse.json(
        { error: '新闻不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '新闻删除成功' })
  } catch (error) {
    console.error('删除新闻失败:', error)
    return NextResponse.json(
      { error: '删除新闻失败' },
      { status: 500 }
    )
  }
} 