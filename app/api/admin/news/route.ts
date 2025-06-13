import { NextRequest, NextResponse } from 'next/server'
import { getAllNewsPosts } from '@/lib/db'

// 获取所有新闻文章
export async function GET() {
  try {
    const news = await getAllNewsPosts()
    return NextResponse.json(news)
  } catch (error) {
    console.error('获取新闻列表失败:', error)
    return NextResponse.json(
      { error: '获取新闻列表失败' },
      { status: 500 }
    )
  }
}

// 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, imageUrl } = body

    // 验证必填字段
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: '标题、slug和内容是必填字段' },
        { status: 400 }
      )
    }

    // 这里应该调用数据库插入操作
    // 暂时返回成功响应
    const newNews = {
      id: Date.now(), // 临时ID生成
      title,
      slug,
      content,
      publishedAt: new Date().toISOString(),
      imageUrl: imageUrl || null
    }

    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    console.error('创建新闻失败:', error)
    return NextResponse.json(
      { error: '创建新闻失败' },
      { status: 500 }
    )
  }
} 