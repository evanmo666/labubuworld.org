import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllNewsFromFile, 
  createNewsInFile 
} from '@/lib/file-store'

// 获取所有新闻文章
export async function GET() {
  try {
    const news = await getAllNewsFromFile()
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
    const { title, slug, content, imageUrl, publishedAt } = body

    // 验证必填字段
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: '标题、slug和内容为必填字段' },
        { status: 400 }
      )
    }

    const newNews = await createNewsInFile({
      title,
      slug,
      content,
      imageUrl: imageUrl || '',
      publishedAt: publishedAt || new Date().toISOString()
    })

    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    console.error('创建新闻失败:', error)
    return NextResponse.json(
      { error: '创建新闻失败' },
      { status: 500 }
    )
  }
} 