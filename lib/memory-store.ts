// 内存数据存储系统 - 用于开发环境临时存储数据
import { Series, Figure, NewsPost } from './db'

// 内存存储
let memoryStore = {
  series: [] as Series[],
  figures: [] as Figure[],
  news: [] as NewsPost[],
  initialized: false
}

// 初始化内存存储（使用模拟数据）
export function initializeMemoryStore() {
  if (memoryStore.initialized) return

  // 初始化系列数据
  memoryStore.series = [
    {
      id: 1,
      name: "Artist Series",
      slug: "art-series", 
      releaseDate: "2022-08-19",
      description: "A series featuring The Monsters family members integrated into world famous paintings.",
      coverImageUrl: "/images/series/art-series-cover.svg"
    },
    {
      id: 2,
      name: "Macaron Series",
      slug: "macaron-series",
      releaseDate: "2023-04-07", 
      description: "A sweet and colorful series inspired by delicious macarons.",
      coverImageUrl: "/images/series/macaron-series-cover.svg"
    },
    {
      id: 3,
      name: "SpongeBob Collaboration",
      slug: "spongebob-series",
      releaseDate: "2023-06-21",
      description: "A crossover collaboration series with the SpongeBob SquarePants world.",
      coverImageUrl: "/images/series/spongebob-series-cover.svg"
    }
  ]

  // 初始化玩偶数据
  memoryStore.figures = [
    // Artist Series figures
    { id: 1, name: "Discus Thrower", description: "Labubu as the classical Greek sculpture", imageUrl: "/images/figures/discus-thrower.svg", isSecret: false, seriesId: 1 },
    { id: 2, name: "Van Gogh", description: "Labubu in Van Gogh's self-portrait style", imageUrl: "/images/figures/van-gogh.svg", isSecret: false, seriesId: 1 },
    { id: 3, name: "The Scream", description: "Labubu recreating Munch's famous painting", imageUrl: "/images/figures/the-scream.jpg", isSecret: false, seriesId: 1 },
    { id: 4, name: "Mona Lisa", description: "Labubu with the enigmatic smile", imageUrl: "/images/figures/mona-lisa.jpg", isSecret: false, seriesId: 1 },
    { id: 5, name: "Birth of Venus", description: "Secret variant of the Renaissance masterpiece", imageUrl: "/images/figures/birth-of-venus.svg", isSecret: true, seriesId: 1 },
    
    // Macaron Series figures  
    { id: 6, name: "Soy Milk Macaron", description: "Creamy soy milk flavored design", imageUrl: "/images/figures/soy-milk-macaron.jpg", isSecret: false, seriesId: 2 },
    { id: 7, name: "Lychee Berry Macaron", description: "Sweet lychee and berry combination", imageUrl: "/images/figures/lychee-berry.jpg", isSecret: false, seriesId: 2 },
    { id: 8, name: "Pistachio Macaron", description: "Elegant green pistachio design", imageUrl: "/images/figures/pistachio.jpg", isSecret: false, seriesId: 2 },
    { id: 9, name: "Chestnut Cocoa Macaron", description: "Rich and rare chestnut cocoa flavor", imageUrl: "/images/figures/chestnut-cocoa.jpg", isSecret: true, seriesId: 2 },
  ]

  // 初始化新闻数据
  memoryStore.news = [
    {
      id: 1,
      title: "Why is Labubu So Popular?",
      slug: "why-is-labubu-popular",
      content: `<p>The rise of Labubu can be described as a phenomenon. Created by artist <strong>Kasing Lung</strong>, this mischievous elf has captured the hearts of collectors worldwide.</p>`,
      publishedAt: "2024-12-01T10:00:00Z",
      imageUrl: "/images/news/labubu-popular.svg"
    },
    {
      id: 2,
      title: "New Artist Series Breaks Pre-order Records",
      slug: "artist-series-record-breaking",
      content: `<p>The latest <strong>Artist Series</strong> has shattered all previous pre-order records, with over 100,000 units reserved within the first 24 hours of announcement.</p>`,
      publishedAt: "2024-11-28T14:30:00Z",
      imageUrl: "/images/news/artist-series-record.jpg"
    },
    {
      id: 3,
      title: "Kasing Lung Reveals Inspiration Behind Labubu",
      slug: "kasing-lung-inspiration",
      content: `<p>In an exclusive interview, <strong>Kasing Lung</strong> shares the personal journey that led to creating one of the world's most beloved collectible characters.</p>`,
      publishedAt: "2024-11-25T09:15:00Z",
      imageUrl: "/images/news/kasing-lung-interview.jpg"
    }
  ]

  memoryStore.initialized = true
  console.log('内存存储已初始化')
}

// 获取下一个ID
function getNextId(type: 'series' | 'figures' | 'news'): number {
  const items = memoryStore[type]
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
}

// 系列相关操作
export function getAllSeriesFromMemory(): Series[] {
  initializeMemoryStore()
  return [...memoryStore.series].sort((a, b) => 
    new Date(b.releaseDate || '').getTime() - new Date(a.releaseDate || '').getTime()
  )
}

export function getSeriesBySlugFromMemory(slug: string): Series | null {
  initializeMemoryStore()
  return memoryStore.series.find(series => series.slug === slug) || null
}

export function createSeriesInMemory(data: Omit<Series, 'id'>): Series {
  initializeMemoryStore()
  const newSeries: Series = {
    id: getNextId('series'),
    ...data
  }
  memoryStore.series.push(newSeries)
  console.log('新系列已添加到内存存储:', newSeries)
  return newSeries
}

export function updateSeriesInMemory(id: number, data: Partial<Omit<Series, 'id'>>): Series | null {
  initializeMemoryStore()
  const index = memoryStore.series.findIndex(series => series.id === id)
  if (index === -1) return null
  
  memoryStore.series[index] = { ...memoryStore.series[index], ...data }
  console.log('系列已更新:', memoryStore.series[index])
  return memoryStore.series[index]
}

export function deleteSeriesFromMemory(id: number): boolean {
  initializeMemoryStore()
  const index = memoryStore.series.findIndex(series => series.id === id)
  if (index === -1) return false
  
  // 同时删除相关的玩偶
  memoryStore.figures = memoryStore.figures.filter(figure => figure.seriesId !== id)
  memoryStore.series.splice(index, 1)
  console.log('系列已删除，ID:', id)
  return true
}

// 玩偶相关操作
export function getAllFiguresFromMemory(): Figure[] {
  initializeMemoryStore()
  return [...memoryStore.figures].sort((a, b) => {
    if (a.seriesId !== b.seriesId) return a.seriesId - b.seriesId
    if (a.isSecret !== b.isSecret) return a.isSecret ? 1 : -1
    return a.name.localeCompare(b.name)
  })
}

export function getFiguresBySeriesIdFromMemory(seriesId: number): Figure[] {
  initializeMemoryStore()
  return memoryStore.figures
    .filter(figure => figure.seriesId === seriesId)
    .sort((a, b) => {
      if (a.isSecret !== b.isSecret) return a.isSecret ? 1 : -1
      return a.name.localeCompare(b.name)
    })
}

export function createFigureInMemory(data: Omit<Figure, 'id'>): Figure {
  initializeMemoryStore()
  const newFigure: Figure = {
    id: getNextId('figures'),
    ...data
  }
  memoryStore.figures.push(newFigure)
  console.log('新玩偶已添加到内存存储:', newFigure)
  return newFigure
}

export function updateFigureInMemory(id: number, data: Partial<Omit<Figure, 'id'>>): Figure | null {
  initializeMemoryStore()
  const index = memoryStore.figures.findIndex(figure => figure.id === id)
  if (index === -1) return null
  
  memoryStore.figures[index] = { ...memoryStore.figures[index], ...data }
  console.log('玩偶已更新:', memoryStore.figures[index])
  return memoryStore.figures[index]
}

export function deleteFigureFromMemory(id: number): boolean {
  initializeMemoryStore()
  const index = memoryStore.figures.findIndex(figure => figure.id === id)
  if (index === -1) return false
  
  memoryStore.figures.splice(index, 1)
  console.log('玩偶已删除，ID:', id)
  return true
}

// 新闻相关操作
export function getAllNewsFromMemory(): NewsPost[] {
  initializeMemoryStore()
  return [...memoryStore.news].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getNewsBySlugFromMemory(slug: string): NewsPost | null {
  initializeMemoryStore()
  return memoryStore.news.find(news => news.slug === slug) || null
}

export function createNewsInMemory(data: Omit<NewsPost, 'id'>): NewsPost {
  initializeMemoryStore()
  const newNews: NewsPost = {
    id: getNextId('news'),
    ...data
  }
  memoryStore.news.push(newNews)
  console.log('新新闻已添加到内存存储:', newNews)
  return newNews
}

export function updateNewsInMemory(id: number, data: Partial<Omit<NewsPost, 'id'>>): NewsPost | null {
  initializeMemoryStore()
  const index = memoryStore.news.findIndex(news => news.id === id)
  if (index === -1) return null
  
  memoryStore.news[index] = { ...memoryStore.news[index], ...data }
  console.log('新闻已更新:', memoryStore.news[index])
  return memoryStore.news[index]
}

export function deleteNewsFromMemory(id: number): boolean {
  initializeMemoryStore()
  const index = memoryStore.news.findIndex(news => news.id === id)
  if (index === -1) return false
  
  memoryStore.news.splice(index, 1)
  console.log('新闻已删除，ID:', id)
  return true
}

// 工具函数：转换ImgBB链接为直接图片链接
export function convertImgBBUrl(url: string): string {
  // 如果是ImgBB分享链接，转换为直接图片链接
  if (url.includes('ibb.co/')) {
    // 从 https://ibb.co/Q7dVLbBz 转换为 https://i.ibb.co/Q7dVLbBz/image.jpg
    const imageId = url.split('/').pop()
    if (imageId) {
      // 注意：这是一个简化的转换，实际的ImgBB直接链接可能需要完整的文件名
      // 建议用户直接使用ImgBB提供的"Direct link"
      return `https://i.ibb.co/${imageId}/image.jpg`
    }
  }
  return url
} 