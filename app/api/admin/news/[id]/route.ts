import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllNewsFromFile,
  updateNewsInFile, 
  deleteNewsFromFile 
} from '@/lib/file-store'

export async function GET(
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

    const news = await getAllNewsFromFile()
    const targetNews = news.find(n => n.id === id)
    
    if (!targetNews) {
      return NextResponse.json(
        { error: '新闻不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(targetNews)
  } catch (error) {
    console.error('获取新闻失败:', error)
    return NextResponse.json(
      { error: '获取新闻失败' },
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
        { error: '无效的新闻ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { title, slug, content, imageUrl, publishedAt } = body

    const updatedNews = await updateNewsInFile(id, {
      title,
      slug,
      content,
      imageUrl,
      publishedAt
    })

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

    const success = await deleteNewsFromFile(id)
    
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