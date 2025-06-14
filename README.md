# Labubu World - Ultimate Collection Guide

Labubu World 是一个专门为 Labubu 收藏玩具打造的资讯网站，提供系列指南、真假鉴定和最新资讯。

## 🚀 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript  
- **样式**: Tailwind CSS
- **数据存储**: 文件存储系统 (JSON) + 数据库降级支持
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
│   ├── db.ts                   # 数据库连接和查询函数
│   ├── file-store.ts           # 文件存储系统（JSON持久化）
│   └── memory-store.ts         # 内存存储系统（已弃用）
├── data/                        # 数据文件夹（JSON文件存储）
│   ├── series.json             # 系列数据
│   ├── figures.json            # 玩偶数据
│   └── news.json               # 新闻数据
├── scripts/                     # 脚本文件
│   └── init-db.sql             # 数据库初始化SQL
├── public/                      # 静态资源
│   └── images/                 # 图片资源
└── components/                  # 可复用组件
```

## 🗄️ 数据存储系统

### 文件存储系统（主要）
项目使用基于JSON文件的持久化存储系统，确保数据在服务器重启后不会丢失：

- **series.json**: 存储所有系列信息
- **figures.json**: 存储所有玩偶信息  
- **news.json**: 存储所有新闻文章

### 数据库降级支持
当文件存储不可用时，系统会自动降级到模拟数据，确保网站正常运行。

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

### ✅ 最新完成 (v0.7.0) - 后台管理系统用户体验优化
1. **编辑功能全面改进**
   - ✅ 玩偶管理添加"View Series"链接，可直接跳转到对应系列页面
   - ✅ 所有管理页面的图片URL输入框添加实时预览功能
   - ✅ 详细的ImgBB链接使用指南和格式说明
   - ✅ 图片加载失败时的友好错误提示
   - ✅ 改进的占位符和帮助文本

2. **图片URL管理优化**
   - ✅ 创建专门的图片URL使用指南页面 `/admin/help/image-guide`
   - ✅ 支持ImgBB、Imgur、Cloudinary等多种图床
   - ✅ 提供测试链接和快速验证功能
   - ✅ 详细的使用步骤和注意事项说明
   - ✅ 实时图片预览和错误处理

3. **管理仪表板功能增强**
   - ✅ 添加"图片URL指南"快速访问链接
   - ✅ 添加"查看网站"链接，可在新窗口打开前台
   - ✅ 改进的快速操作区域布局
   - ✅ 更友好的用户界面和导航体验

### ✅ 已完成 (v0.6.0) - Labubu狂热现象分析
1. **首页新增"Decoding Labubu Craze"栏目**
   - ✅ 添加Labubu狂热现象分析section
   - ✅ 四大驱动因素展示（时尚配饰、社媒病毒、明星效应、盲盒魔力）
   - ✅ Pop Mart 2024年IP收入贡献图表（可视化数据展示）
   - ✅ 艺术拍卖纪录和Kidult市场增长数据
   - ✅ 完整英文翻译和可爱风格设计
   - ✅ 响应式布局和动画效果

2. **数据可视化功能**
   - ✅ 收入贡献条形图（Labubu、Molly、SKULLPANDA等）
   - ✅ 关键数据统计展示（$150,000+拍卖纪录、+12%市场增长）
   - ✅ 渐变色彩设计和可爱图标装饰
   - ✅ 移动端友好的图表布局

### ✅ 已完成 (v0.5.0) - 文件存储系统
1. **文件持久化存储系统**
   - ✅ 创建文件存储系统（file-store.ts）
   - ✅ 完全解决数据持久化问题（服务器重启数据不丢失）
   - ✅ JSON文件存储：series.json、figures.json、news.json
   - ✅ 自动创建数据目录和文件
   - ✅ 完善的错误处理和降级机制

2. **API系统全面升级**
   - ✅ 所有API路由使用文件存储系统
   - ✅ 支持完整的CRUD操作（创建、读取、更新、删除）
   - ✅ 自动ID生成和数据排序
   - ✅ ImgBB链接自动转换功能
   - ✅ 数据验证和错误处理

3. **数据安全和版本控制**
   - ✅ 数据文件夹添加到.gitignore
   - ✅ 用户数据不会被提交到版本控制
   - ✅ 支持数据备份和恢复
   - ✅ 多环境数据隔离

### ✅ 已完成 (v0.4.0)
1. **内存存储系统（已弃用）**
   - ✅ 创建内存存储系统（memory-store.ts）
   - ✅ 临时解决后台数据问题
   - ✅ 完善所有API的CRUD操作
   - ✅ 支持数据库降级机制
   - ✅ 实时数据同步和更新

2. **图片链接优化**
   - ✅ ImgBB链接自动转换功能
   - ✅ 图片URL格式验证和修正
   - ✅ 创建图片链接使用指南页面
   - ✅ 支持多种图床服务
   - ✅ 图片显示问题修复

3. **可爱风格改造**
   - ✅ 品牌标识集成（favicon和logo）
   - ✅ 粉色可爱主题设计
   - ✅ 导航栏和页脚emoji装饰
   - ✅ 可爱动画效果（浮动、闪烁、脉冲）
   - ✅ 渐变背景和毛玻璃效果

4. **字体系统升级**
   - ✅ 添加Comfortaa圆体字体（标题专用）
   - ✅ 添加Quicksand圆体字体（正文专用）
   - ✅ 全局字体配置优化
   - ✅ 所有组件字体样式更新
   - ✅ 可爱圆润的视觉效果

5. **API路由系统**
   - ✅ 系列管理API `/api/admin/series` (GET, POST)
   - ✅ 系列详情API `/api/admin/series/[id]` (PUT, DELETE)
   - ✅ 玩偶管理API `/api/admin/figures` (GET, POST)
   - ✅ 玩偶详情API `/api/admin/figures/[id]` (PUT, DELETE)
   - ✅ 新闻管理API `/api/admin/news` (GET, POST)
   - ✅ 新闻详情API `/api/admin/news/[id]` (PUT, DELETE)
   - ✅ NextAuth认证API `/api/auth/[...nextauth]`

4. **项目配置优化**
   - ✅ 修复Next.js配置警告
   - ✅ 优化package.json依赖结构
   - ✅ 创建环境变量示例文件
   - ✅ 完善所有占位符图片

5. **文档完善**
   - ✅ 更新README.md完整文档
   - ✅ 添加API使用说明
   - ✅ 完善部署指南

### 🔄 开发中
1. **功能增强**
   - 富文本编辑器集成
   - 图片上传功能
   - 批量操作功能

### 📅 待开发
1. **SEO 功能**
   - 网站地图生成
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

**版本**: v0.7.0  
**最后更新**: 2024年12月19日  
**开发状态**: 前台页面完成，后台管理系统完成，包含完整的CRUD功能、数据可视化和优化的用户体验

## 🔑 管理员登录信息

**管理员登录地址**: `/admin/login`  

> 注意：管理员账户信息请联系开发者获取，生产环境请使用安全的凭据

> 注意：这是一个非官方的粉丝网站。Labubu 是 POP MART 和 Kasing Lung 的商标。 