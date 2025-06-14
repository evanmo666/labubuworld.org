import { NextRequest, NextResponse } from 'next/server'
import { getAllNewsPosts } from '@/lib/db'
import { getAllNewsFromMemory, createNewsInMemory, convertImgBBUrl } from '@/lib/memory-store'

// 获取所有新闻文章
export async function GET() {
  try {
    // 优先使用数据库，如果不可用则使用内存存储
    let news
    try {
      news = await getAllNewsPosts()
    } catch (error) {
      console.log('数据库不可用，使用内存存储')
      news = getAllNewsFromMemory()
    }
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

    // 创建新新闻数据
    const newsData = {
      title,
      slug,
      content,
      publishedAt: new Date().toISOString(),
      imageUrl: imageUrl || null
    }

    // 使用内存存储创建新闻
    const newNews = createNewsInMemory(newsData)

    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    console.error('创建新闻失败:', error)
    return NextResponse.json(
      { error: '创建新闻失败' },
      { status: 500 }
    )
  }
} 