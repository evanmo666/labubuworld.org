import { sql } from '@vercel/postgres';
import { 
  getAllSeriesFromFile, 
  getSeriesBySlugFromFile, 
  getFiguresBySeriesIdFromFile,
  getAllNewsFromFile,
  getNewsBySlugFromFile
} from './file-store'

// 模拟数据（当数据库连接不可用时使用）
const mockSeries: Series[] = [
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
];

const mockFigures: Figure[] = [
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
];

const mockNews: NewsPost[] = [
  {
    id: 1,
    title: "Why is Labubu So Popular?",
    slug: "why-is-labubu-popular",
    content: `<p>The rise of Labubu can be described as a phenomenon. Created by artist <strong>Kasing Lung</strong>, this mischievous elf has captured the hearts of collectors worldwide.</p>

<p>Several factors contribute to Labubu's incredible popularity:</p>

<h3>Unique Character Design</h3>
<p>Labubu's distinctive pointed ears, sharp teeth, and playful expression create a perfect balance between cute and edgy. This design philosophy resonates with collectors who appreciate characters that are both adorable and slightly mischievous.</p>

<h3>Limited Edition Appeal</h3>
<p>Each series features a mix of regular figures and rare "secret" variants, creating excitement and anticipation for collectors. The thrill of potentially finding a secret figure adds an element of surprise to every purchase.</p>

<h3>Artistic Collaborations</h3>
<p>From art-inspired series featuring world-famous paintings to food-themed collections, Labubu continues to evolve while maintaining its core identity. These collaborations keep the character fresh and relevant.</p>

<p>The combination of artistic merit, collectible appeal, and Pop Mart's global distribution has transformed Labubu from a simple character design into a cultural phenomenon that spans continents and generations.</p>`,
    publishedAt: "2024-12-01T10:00:00Z",
    imageUrl: "/images/news/labubu-popular.svg"
  },
  {
    id: 2,
    title: "New Artist Series Breaks Pre-order Records",
    slug: "artist-series-record-breaking",
    content: `<p>The latest <strong>Artist Series</strong> has shattered all previous pre-order records, with over 100,000 units reserved within the first 24 hours of announcement.</p>

<p>This unprecedented demand highlights the growing international appeal of Labubu collectibles and the effectiveness of the art-inspired theme.</p>

<h3>Global Response</h3>
<p>The series has seen particularly strong response in:</p>
<ul>
<li>Asia-Pacific region: 45% of total pre-orders</li>
<li>North America: 30% of total pre-orders</li>
<li>Europe: 25% of total pre-orders</li>
</ul>

<p>Pop Mart has announced they are increasing production capacity to meet the overwhelming demand while maintaining their commitment to quality.</p>`,
    publishedAt: "2024-11-28T14:30:00Z",
    imageUrl: "/images/news/artist-series-record.jpg"
  },
  {
    id: 3,
    title: "Kasing Lung Reveals Inspiration Behind Labubu",
    slug: "kasing-lung-inspiration",
    content: `<p>In an exclusive interview, <strong>Kasing Lung</strong> shares the personal journey that led to creating one of the world's most beloved collectible characters.</p>

<p>"Labubu represents the mischievous spirit we all have inside," explains Lung. "The character embodies both innocence and rebellion, which I think resonates with people across all cultures."</p>

<h3>The Creative Process</h3>
<p>Lung reveals that Labubu's design went through over 50 iterations before reaching its final form. The distinctive ears and teeth were inspired by folklore creatures from various Asian cultures.</p>

<p>The artist also teased upcoming collaborations: "We're working on some very exciting projects that will surprise even longtime collectors. The art series was just the beginning."</p>`,
    publishedAt: "2024-11-25T09:15:00Z",
    imageUrl: "/images/news/kasing-lung-interview.jpg"
  }
];

// 数据库类型定义
export interface Series {
  id: number;
  name: string;
  slug: string;
  releaseDate: string | null;
  description: string | null;
  coverImageUrl: string | null;
}

export interface Figure {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  isSecret: boolean;
  seriesId: number;
}

export interface NewsPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  imageUrl: string | null;
}

// 辅助函数：检查数据库连接
function isDatabaseAvailable(): boolean {
  return !!(process.env.POSTGRES_URL && process.env.POSTGRES_URL !== 'postgresql://placeholder');
}

// 数据库查询函数 - 支持数据库和文件存储降级
export async function getLatestSeries(limit: number = 3): Promise<Series[]> {
  try {
    // 尝试使用文件存储
    console.log('使用文件存储：最新系列')
    const series = await getAllSeriesFromFile()
    return series.slice(0, limit)
  } catch (error) {
    console.error('文件存储查询失败，使用模拟数据:', error)
    console.log('使用模拟数据：最新系列')
    return getMockSeries().slice(0, limit)
  }
}

export async function getAllSeries(): Promise<Series[]> {
  try {
    console.log('使用文件存储：所有系列')
    return await getAllSeriesFromFile()
  } catch (error) {
    console.error('文件存储查询失败，使用模拟数据:', error)
    console.log('使用模拟数据：所有系列')
    return getMockSeries()
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  try {
    console.log('使用文件存储：根据slug查找系列')
    return await getSeriesBySlugFromFile(slug)
  } catch (error) {
    console.error('文件存储查询失败，使用模拟数据:', error)
    console.log('使用模拟数据：根据slug查找系列')
    return getMockSeries().find(series => series.slug === slug) || null
  }
}

// 玩偶相关查询
export async function getFiguresBySeriesId(seriesId: number): Promise<Figure[]> {
  try {
    console.log('使用文件存储：根据系列ID查找玩偶')
    return await getFiguresBySeriesIdFromFile(seriesId)
  } catch (error) {
    console.error('文件存储查询失败，使用模拟数据:', error)
    console.log('使用模拟数据：根据系列ID查找玩偶')
    return getMockFigures().filter(figure => figure.seriesId === seriesId)
  }
}

// 新闻相关查询
export async function getLatestNewsPosts(limit: number = 3): Promise<NewsPost[]> {
  try {
    console.log('使用文件存储：最新新闻')
    const news = await getAllNewsFromFile()
    return news.slice(0, limit)
  } catch (error) {
    console.error('文件存储查询失败，使用模拟数据:', error)
    console.log('使用模拟数据：最新新闻')
    return getMockNews().slice(0, limit)
  }
}

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  try {
    console.log('使用文件存储：新闻列表')
    return await getAllNewsFromFile()
  } catch (error) {
    console.error('文件存储查询失败，使用模拟数据:', error)
    console.log('使用模拟数据：新闻列表')
    return getMockNews()
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  try {
    console.log('使用文件存储：根据slug查找新闻')
    return await getNewsBySlugFromFile(slug)
  } catch (error) {
    console.error('文件存储查询失败，使用模拟数据:', error)
    console.log('使用模拟数据：根据slug查找新闻')
    return getMockNews().find(news => news.slug === slug) || null
  }
}

// 模拟数据（作为降级方案）
function getMockSeries(): Series[] {
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

function getMockFigures(): Figure[] {
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

function getMockNews(): NewsPost[] {
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