# Labubu World - Ultimate Collection Guide

Labubu World 是一个专门为 Labubu 收藏玩具打造的资讯网站，提供系列指南、真假鉴定和最新资讯。

## 🚀 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript  
- **样式**: Tailwind CSS
- **数据库**: Vercel Postgres
- **身份验证**: NextAuth.js v5
- **部署**: Vercel
- **端口**: 固定使用 3000 端口

## 📁 项目结构

```
labubuworld/
├── app/                          # Next.js App Router 页面
│   ├── layout.tsx               # 根布局文件（服务器组件）
│   ├── page.tsx                 # 主页（服务器组件）
│   ├── globals.css              # 全局样式
│   ├── series/                  # 系列相关页面
│   │   ├── page.tsx            # 系列归档页
│   │   └── [slug]/             # 动态系列详情页
│   ├── guides/                  # 指南页面
│   │   └── how-to-spot-fake/   # 真假鉴定指南
│   ├── news/                    # 新闻页面
│   └── admin/                   # 后台管理（需要身份验证）
├── lib/                         # 工具库
│   └── db.ts                   # 数据库连接和查询函数
├── scripts/                     # 脚本文件
│   └── init-db.sql             # 数据库初始化SQL
├── public/                      # 静态资源
│   └── images/                 # 图片资源
└── components/                  # 可复用组件
```

## 🗄️ 数据库设计

### Series 表（系列信息）
- `id`: 主键
- `name`: 系列名称
- `slug`: URL 友好的标识符
- `releaseDate`: 发售日期
- `description`: 系列描述
- `coverImageUrl`: 封面图片URL

### Figure 表（玩偶信息）
- `id`: 主键
- `name`: 玩偶名称
- `description`: 玩偶描述
- `imageUrl`: 玩偶图片URL
- `isSecret`: 是否为隐藏款
- `seriesId`: 关联系列ID

### NewsPost 表（新闻文章）
- `id`: 主键
- `title`: 文章标题
- `slug`: URL 友好的标识符
- `content`: 文章内容
- `publishedAt`: 发布时间
- `imageUrl`: 文章图片URL

## 🎯 功能特色

### 前台功能
- ✅ 响应式导航栏和页脚
- ✅ Hero 区域和特色系列展示
- ✅ 系列归档页面（网格布局）
- ✅ 真假鉴定详细指南
- 🔄 系列详情页（动态路由）
- 🔄 新闻列表和详情页
- 🔄 关于页面

### 后台功能
- 🔄 NextAuth.js 身份验证
- 🔄 系列 CRUD 管理
- 🔄 玩偶 CRUD 管理  
- 🔄 新闻文章编辑器
- 🔄 富文本编辑器集成

### SEO 优化
- ✅ 动态元数据生成
- 🔄 网站地图自动生成
- 🔄 结构化数据（JSON-LD）
- ✅ Next.js Image 组件优化

## 🚦 开发进度

### ✅ 已完成
1. **项目基础搭建**
   - Next.js 14 + TypeScript 配置
   - Tailwind CSS 样式系统
   - 项目文件结构创建
   - 开发服务器已启动（3000端口）

2. **数据库设计**
   - PostgreSQL 表结构设计
   - 数据库查询函数创建
   - 初始数据填充脚本
   - 模拟数据系统（支持无数据库运行）

3. **前台页面开发**
   - ✅ 根布局文件（导航栏、页脚）
   - ✅ 主页（Hero区域、精选系列、最新资讯）
   - ✅ 系列归档页面（网格展示）
   - ✅ 系列详情页 `/series/[slug]`（动态路由）
   - ✅ 真假鉴定指南页面（完整指南内容）
   - ✅ 新闻列表页 `/news`
   - ✅ 新闻详情页 `/news/[slug]`（动态路由）
   - ✅ 关于页面 `/about`

4. **SEO优化功能**
   - ✅ 动态元数据生成
   - ✅ 结构化数据（JSON-LD）
   - ✅ Next.js Image 组件优化
   - ✅ 社交媒体分享优化

5. **后台管理系统基础**
   - ✅ NextAuth.js 配置和身份验证
   - ✅ 管理员登录页面 `/admin/login`
   - ✅ 管理员仪表板 `/admin/dashboard`
   - ✅ SessionProvider 配置
   - ✅ 占位符图片系统（SVG）

6. **后台管理系统完整功能**
   - ✅ 系列管理页面 `/admin/series`（完整CRUD）
   - ✅ 玩偶管理页面 `/admin/figures`（完整CRUD）
   - ✅ 新闻管理页面 `/admin/news`（完整CRUD）
   - ✅ 模态框表单编辑器
   - ✅ 数据验证和错误处理

### 🔄 开发中
1. **功能增强**
   - 富文本编辑器集成
   - 图片上传功能
   - 批量操作功能

### 📅 待开发
1. **SEO 功能**
   - 网站地图生成
   - 结构化数据添加
   - 图片优化完善

2. **性能优化**
   - 页面加载优化
   - 图片懒加载
   - 缓存策略

## 🛠️ 开发命令

```bash
# 安装依赖
npm install

# 开发模式（3000端口）
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

## 📝 开发规范

### 代码规范
- 代码注释必须使用中文
- 网页文案必须使用英文
- 变量和函数名使用英文
- 遵循 Next.js 14 App Router 最佳实践

### Git 提交规范
- 每次功能更新必须提交到 master 分支
- Commit 信息使用中文描述具体改动
- 每次更新都要更新 README.md

### 架构规范
- 服务器组件：处理数据获取和 SEO
- 客户端组件：处理交互逻辑
- 严格遵循 "use client" 和 metadata 不能同时使用的规则

## 🔧 环境变量

```bash
# Vercel Postgres（生产环境自动配置）
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# NextAuth.js
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## 📞 支持

如有问题或建议，请通过以下方式联系：
- 项目仓库 Issues
- 开发者邮箱：dev@labubuworld.org

---

**版本**: v0.4.0  
**最后更新**: 2024年12月19日  
**开发状态**: 前台页面完成，后台管理系统完成，包含完整的CRUD功能

## 🔑 管理员登录信息

**管理员登录地址**: `/admin/login`  
**演示账户**:
- 邮箱: `admin@labubuworld.org`
- 密码: `labubu2024admin`

> 注意：这是演示账户，生产环境请修改为安全的凭据

> 注意：这是一个非官方的粉丝网站。Labubu 是 POP MART 和 Kasing Lung 的商标。 