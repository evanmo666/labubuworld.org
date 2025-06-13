import { NextRequest, NextResponse } from 'next/server'

// 获取所有玩偶
export async function GET() {
  try {
    // 这里应该调用数据库查询所有玩偶
    // 暂时返回模拟数据
    const figures = [
      { id: 1, name: "Discus Thrower", description: "Labubu as the classical Greek sculpture", imageUrl: "/images/figures/discus-thrower.svg", isSecret: false, seriesId: 1 },
      { id: 2, name: "Van Gogh", description: "Labubu in Van Gogh's self-portrait style", imageUrl: "/images/figures/van-gogh.svg", isSecret: false, seriesId: 1 },
      { id: 3, name: "The Scream", description: "Labubu recreating Munch's famous painting", imageUrl: "/images/figures/the-scream.jpg", isSecret: false, seriesId: 1 },
      { id: 4, name: "Mona Lisa", description: "Labubu with the enigmatic smile", imageUrl: "/images/figures/mona-lisa.jpg", isSecret: false, seriesId: 1 },
      { id: 5, name: "Birth of Venus", description: "Secret variant of the Renaissance masterpiece", imageUrl: "/images/figures/birth-of-venus.svg", isSecret: true, seriesId: 1 },
      { id: 6, name: "Soy Milk Macaron", description: "Creamy soy milk flavored design", imageUrl: "/images/figures/soy-milk-macaron.jpg", isSecret: false, seriesId: 2 },
      { id: 7, name: "Lychee Berry Macaron", description: "Sweet lychee and berry combination", imageUrl: "/images/figures/lychee-berry.jpg", isSecret: false, seriesId: 2 },
      { id: 8, name: "Pistachio Macaron", description: "Elegant green pistachio design", imageUrl: "/images/figures/pistachio.jpg", isSecret: false, seriesId: 2 },
      { id: 9, name: "Chestnut Cocoa Macaron", description: "Rich and rare chestnut cocoa flavor", imageUrl: "/images/figures/chestnut-cocoa.jpg", isSecret: true, seriesId: 2 }
    ]
    
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
    if (!name || !seriesId) {
      return NextResponse.json(
        { error: '玩偶名称和系列ID是必填字段' },
        { status: 400 }
      )
    }

    // 这里应该调用数据库插入操作
    // 暂时返回成功响应
    const newFigure = {
      id: Date.now(), // 临时ID生成
      name,
      description: description || null,
      imageUrl: imageUrl || null,
      isSecret: isSecret || false,
      seriesId: parseInt(seriesId)
    }

    return NextResponse.json(newFigure, { status: 201 })
  } catch (error) {
    console.error('创建玩偶失败:', error)
    return NextResponse.json(
      { error: '创建玩偶失败' },
      { status: 500 }
    )
  }
} 