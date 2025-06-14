import { sql } from '@vercel/postgres';

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

// 数据库查询函数
export async function getAllSeries(): Promise<Series[]> {
  // 如果数据库不可用，使用内存存储
  if (!isDatabaseAvailable()) {
    console.log('使用内存存储：系列列表');
    const { getAllSeriesFromMemory } = await import('./memory-store');
    return getAllSeriesFromMemory();
  }

  try {
    const { rows } = await sql`
      SELECT * FROM "Series" 
      ORDER BY "releaseDate" DESC
    `;
    return rows as Series[];
  } catch (error) {
    console.error('数据库查询失败，使用内存存储:', error);
    const { getAllSeriesFromMemory } = await import('./memory-store');
    return getAllSeriesFromMemory();
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  // 如果数据库不可用，使用内存存储
  if (!isDatabaseAvailable()) {
    console.log('使用内存存储：根据slug查找系列');
    const { getSeriesBySlugFromMemory } = await import('./memory-store');
    return getSeriesBySlugFromMemory(slug);
  }

  try {
    const { rows } = await sql`
      SELECT * FROM "Series" 
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return rows[0] as Series || null;
  } catch (error) {
    console.error('数据库查询失败，使用内存存储:', error);
    const { getSeriesBySlugFromMemory } = await import('./memory-store');
    return getSeriesBySlugFromMemory(slug);
  }
}

export async function getFiguresBySeriesId(seriesId: number): Promise<Figure[]> {
  // 如果数据库不可用，使用内存存储
  if (!isDatabaseAvailable()) {
    console.log('使用内存存储：根据系列ID查找玩偶');
    const { getFiguresBySeriesIdFromMemory } = await import('./memory-store');
    return getFiguresBySeriesIdFromMemory(seriesId);
  }

  try {
    const { rows } = await sql`
      SELECT * FROM "Figure" 
      WHERE "seriesId" = ${seriesId}
      ORDER BY "isSecret" ASC, name ASC
    `;
    return rows as Figure[];
  } catch (error) {
    console.error('数据库查询失败，使用内存存储:', error);
    const { getFiguresBySeriesIdFromMemory } = await import('./memory-store');
    return getFiguresBySeriesIdFromMemory(seriesId);
  }
}

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  // 如果数据库不可用，使用内存存储
  if (!isDatabaseAvailable()) {
    console.log('使用内存存储：新闻列表');
    const { getAllNewsFromMemory } = await import('./memory-store');
    return getAllNewsFromMemory();
  }

  try {
    const { rows } = await sql`
      SELECT * FROM "NewsPost" 
      ORDER BY "publishedAt" DESC
    `;
    return rows as NewsPost[];
  } catch (error) {
    console.error('数据库查询失败，使用内存存储:', error);
    const { getAllNewsFromMemory } = await import('./memory-store');
    return getAllNewsFromMemory();
  }
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  // 如果数据库不可用，使用内存存储
  if (!isDatabaseAvailable()) {
    console.log('使用内存存储：根据slug查找新闻');
    const { getNewsBySlugFromMemory } = await import('./memory-store');
    return getNewsBySlugFromMemory(slug);
  }

  try {
    const { rows } = await sql`
      SELECT * FROM "NewsPost" 
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return rows[0] as NewsPost || null;
  } catch (error) {
    console.error('数据库查询失败，使用内存存储:', error);
    const { getNewsBySlugFromMemory } = await import('./memory-store');
    return getNewsBySlugFromMemory(slug);
  }
}

export async function getLatestSeries(limit: number = 4): Promise<Series[]> {
  // 如果数据库不可用，使用内存存储
  if (!isDatabaseAvailable()) {
    console.log('使用内存存储：最新系列');
    const { getAllSeriesFromMemory } = await import('./memory-store');
    return getAllSeriesFromMemory().slice(0, limit);
  }

  try {
    const { rows } = await sql`
      SELECT * FROM "Series" 
      ORDER BY "releaseDate" DESC
      LIMIT ${limit}
    `;
    return rows as Series[];
  } catch (error) {
    console.error('数据库查询失败，使用内存存储:', error);
    const { getAllSeriesFromMemory } = await import('./memory-store');
    return getAllSeriesFromMemory().slice(0, limit);
  }
}

export async function getLatestNewsPosts(limit: number = 3): Promise<NewsPost[]> {
  // 如果数据库不可用，使用内存存储
  if (!isDatabaseAvailable()) {
    console.log('使用内存存储：最新新闻');
    const { getAllNewsFromMemory } = await import('./memory-store');
    return getAllNewsFromMemory().slice(0, limit);
  }

  try {
    const { rows } = await sql`
      SELECT * FROM "NewsPost" 
      ORDER BY "publishedAt" DESC
      LIMIT ${limit}
    `;
    return rows as NewsPost[];
  } catch (error) {
    console.error('数据库查询失败，使用内存存储:', error);
    const { getAllNewsFromMemory } = await import('./memory-store');
    return getAllNewsFromMemory().slice(0, limit);
  }
} 