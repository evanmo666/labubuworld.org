// 文件持久化存储系统 - 使用JSON文件保存数据
import { promises as fs } from 'fs'
import path from 'path'
import { Series, Figure, NewsPost } from './db'

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data')
const SERIES_FILE = path.join(DATA_DIR, 'series.json')
const FIGURES_FILE = path.join(DATA_DIR, 'figures.json')
const NEWS_FILE = path.join(DATA_DIR, 'news.json')

// 确保数据目录存在
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// 读取JSON文件
async function readJsonFile<T>(filePath: string, defaultData: T[]): Promise<T[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // 文件不存在或读取失败，返回默认数据并创建文件
    await writeJsonFile(filePath, defaultData)
    return defaultData
  }
}

// 写入JSON文件
async function writeJsonFile<T>(filePath: string, data: T[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// 获取默认数据
function getDefaultSeries(): Series[] {
  return [
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
}

function getDefaultFigures(): Figure[] {
  return [
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
}

function getDefaultNews(): NewsPost[] {
  return [
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
}

// 获取下一个ID
async function getNextId(type: 'series' | 'figures' | 'news'): Promise<number> {
  let items: any[] = []
  
  switch (type) {
    case 'series':
      items = await readJsonFile(SERIES_FILE, getDefaultSeries())
      break
    case 'figures':
      items = await readJsonFile(FIGURES_FILE, getDefaultFigures())
      break
    case 'news':
      items = await readJsonFile(NEWS_FILE, getDefaultNews())
      break
  }
  
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
}

// ImgBB链接转换函数
export function convertImgBBUrl(url: string): string {
  if (!url) return url
  
  // 检查是否是ImgBB分享链接格式
  const imgbbMatch = url.match(/https:\/\/ibb\.co\/([a-zA-Z0-9]+)/)
  if (imgbbMatch) {
    const imageId = imgbbMatch[1]
    // 转换为直接图片链接
    return `https://i.ibb.co/${imageId}/image.jpg`
  }
  
  return url
}

// 系列相关操作
export async function getAllSeriesFromFile(): Promise<Series[]> {
  console.log('使用文件存储：系列列表')
  const series = await readJsonFile(SERIES_FILE, getDefaultSeries())
  return series.sort((a, b) => 
    new Date(b.releaseDate || '').getTime() - new Date(a.releaseDate || '').getTime()
  )
}

export async function getSeriesBySlugFromFile(slug: string): Promise<Series | null> {
  console.log('使用文件存储：根据slug查找系列')
  const series = await readJsonFile(SERIES_FILE, getDefaultSeries())
  return series.find(s => s.slug === slug) || null
}

export async function createSeriesInFile(data: Omit<Series, 'id'>): Promise<Series> {
  console.log('使用文件存储：创建新系列')
  const series = await readJsonFile(SERIES_FILE, getDefaultSeries())
  const newSeries: Series = {
    id: await getNextId('series'),
    ...data,
    coverImageUrl: convertImgBBUrl(data.coverImageUrl || '')
  }
  
  series.push(newSeries)
  await writeJsonFile(SERIES_FILE, series)
  console.log('新系列已保存到文件:', newSeries)
  return newSeries
}

export async function updateSeriesInFile(id: number, data: Partial<Omit<Series, 'id'>>): Promise<Series | null> {
  console.log('使用文件存储：更新系列')
  const series = await readJsonFile(SERIES_FILE, getDefaultSeries())
  const index = series.findIndex(s => s.id === id)
  if (index === -1) return null
  
  // 转换图片URL
  if (data.coverImageUrl) {
    data.coverImageUrl = convertImgBBUrl(data.coverImageUrl)
  }
  
  series[index] = { ...series[index], ...data }
  await writeJsonFile(SERIES_FILE, series)
  console.log('系列已更新并保存到文件:', series[index])
  return series[index]
}

export async function deleteSeriesFromFile(id: number): Promise<boolean> {
  console.log('使用文件存储：删除系列')
  const series = await readJsonFile(SERIES_FILE, getDefaultSeries())
  const index = series.findIndex(s => s.id === id)
  if (index === -1) return false
  
  // 同时删除相关的玩偶
  const figures = await readJsonFile(FIGURES_FILE, getDefaultFigures())
  const updatedFigures = figures.filter(figure => figure.seriesId !== id)
  await writeJsonFile(FIGURES_FILE, updatedFigures)
  
  series.splice(index, 1)
  await writeJsonFile(SERIES_FILE, series)
  console.log('系列已删除并保存到文件，ID:', id)
  return true
}

// 玩偶相关操作
export async function getAllFiguresFromFile(): Promise<Figure[]> {
  console.log('使用文件存储：玩偶列表')
  const figures = await readJsonFile(FIGURES_FILE, getDefaultFigures())
  return figures.sort((a, b) => {
    if (a.seriesId !== b.seriesId) return a.seriesId - b.seriesId
    if (a.isSecret !== b.isSecret) return a.isSecret ? 1 : -1
    return a.name.localeCompare(b.name)
  })
}

export async function getFiguresBySeriesIdFromFile(seriesId: number): Promise<Figure[]> {
  console.log('使用文件存储：根据系列ID查找玩偶')
  const figures = await readJsonFile(FIGURES_FILE, getDefaultFigures())
  return figures
    .filter(figure => figure.seriesId === seriesId)
    .sort((a, b) => {
      if (a.isSecret !== b.isSecret) return a.isSecret ? 1 : -1
      return a.name.localeCompare(b.name)
    })
}

export async function createFigureInFile(data: Omit<Figure, 'id'>): Promise<Figure> {
  console.log('使用文件存储：创建新玩偶')
  const figures = await readJsonFile(FIGURES_FILE, getDefaultFigures())
  const newFigure: Figure = {
    id: await getNextId('figures'),
    ...data,
    imageUrl: convertImgBBUrl(data.imageUrl || '')
  }
  
  figures.push(newFigure)
  await writeJsonFile(FIGURES_FILE, figures)
  console.log('新玩偶已保存到文件:', newFigure)
  return newFigure
}

export async function updateFigureInFile(id: number, data: Partial<Omit<Figure, 'id'>>): Promise<Figure | null> {
  console.log('使用文件存储：更新玩偶')
  const figures = await readJsonFile(FIGURES_FILE, getDefaultFigures())
  const index = figures.findIndex(f => f.id === id)
  if (index === -1) return null
  
  // 转换图片URL
  if (data.imageUrl) {
    data.imageUrl = convertImgBBUrl(data.imageUrl)
  }
  
  figures[index] = { ...figures[index], ...data }
  await writeJsonFile(FIGURES_FILE, figures)
  console.log('玩偶已更新并保存到文件:', figures[index])
  return figures[index]
}

export async function deleteFigureFromFile(id: number): Promise<boolean> {
  console.log('使用文件存储：删除玩偶')
  const figures = await readJsonFile(FIGURES_FILE, getDefaultFigures())
  const index = figures.findIndex(f => f.id === id)
  if (index === -1) return false
  
  figures.splice(index, 1)
  await writeJsonFile(FIGURES_FILE, figures)
  console.log('玩偶已删除并保存到文件，ID:', id)
  return true
}

// 新闻相关操作
export async function getAllNewsFromFile(): Promise<NewsPost[]> {
  console.log('使用文件存储：新闻列表')
  const news = await readJsonFile(NEWS_FILE, getDefaultNews())
  return news.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getNewsBySlugFromFile(slug: string): Promise<NewsPost | null> {
  console.log('使用文件存储：根据slug查找新闻')
  const news = await readJsonFile(NEWS_FILE, getDefaultNews())
  return news.find(n => n.slug === slug) || null
}

export async function createNewsInFile(data: Omit<NewsPost, 'id'>): Promise<NewsPost> {
  console.log('使用文件存储：创建新新闻')
  const news = await readJsonFile(NEWS_FILE, getDefaultNews())
  const newNews: NewsPost = {
    id: await getNextId('news'),
    ...data,
    imageUrl: convertImgBBUrl(data.imageUrl || ''),
    publishedAt: data.publishedAt || new Date().toISOString()
  }
  
  news.push(newNews)
  await writeJsonFile(NEWS_FILE, news)
  console.log('新新闻已保存到文件:', newNews)
  return newNews
}

export async function updateNewsInFile(id: number, data: Partial<Omit<NewsPost, 'id'>>): Promise<NewsPost | null> {
  console.log('使用文件存储：更新新闻')
  const news = await readJsonFile(NEWS_FILE, getDefaultNews())
  const index = news.findIndex(n => n.id === id)
  if (index === -1) return null
  
  // 转换图片URL
  if (data.imageUrl) {
    data.imageUrl = convertImgBBUrl(data.imageUrl)
  }
  
  news[index] = { ...news[index], ...data }
  await writeJsonFile(NEWS_FILE, news)
  console.log('新闻已更新并保存到文件:', news[index])
  return news[index]
}

export async function deleteNewsFromFile(id: number): Promise<boolean> {
  console.log('使用文件存储：删除新闻')
  const news = await readJsonFile(NEWS_FILE, getDefaultNews())
  const index = news.findIndex(n => n.id === id)
  if (index === -1) return false
  
  news.splice(index, 1)
  await writeJsonFile(NEWS_FILE, news)
  console.log('新闻已删除并保存到文件，ID:', id)
  return true
} 