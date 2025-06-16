import { getAllSeries, getAllNewsPosts } from '@/lib/db'

export async function GET() {
  const baseUrl = 'https://labubuworld.org'
  
  // 获取所有系列和新闻数据
  const series = await getAllSeries()
  const news = await getAllNewsPosts()
  
  // 静态页面
  const staticPages = [
    '',
    '/series',
    '/news',
    '/about',
    '/guides/how-to-spot-fake',
  ]
  
  // 生成XML内容
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${series.map(item => `
  <url>
    <loc>${baseUrl}/series/${item.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${news.map(item => `
  <url>
    <loc>${baseUrl}/news/${item.slug}</loc>
    <lastmod>${new Date(item.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
} 