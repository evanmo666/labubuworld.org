import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllFiguresFromFile,
  updateFigureInFile, 
  deleteFigureFromFile 
} from '@/lib/file-store'

export async function GET(
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

    const figures = await getAllFiguresFromFile()
    const targetFigure = figures.find(f => f.id === id)
    
    if (!targetFigure) {
      return NextResponse.json(
        { error: '玩偶不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(targetFigure)
  } catch (error) {
    console.error('获取玩偶失败:', error)
    return NextResponse.json(
      { error: '获取玩偶失败' },
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
        { error: '无效的玩偶ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, description, imageUrl, isSecret, seriesId } = body

    const updatedFigure = await updateFigureInFile(id, {
      name,
      description,
      imageUrl,
      isSecret: Boolean(isSecret),
      seriesId: seriesId ? parseInt(seriesId) : undefined
    })

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

    const success = await deleteFigureFromFile(id)
    
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