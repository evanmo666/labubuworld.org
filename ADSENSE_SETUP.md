# Google AdSense 设置指南

## 🎯 已完成的集成工作

### ✅ 1. AdSense 脚本集成
- Google AdSense 脚本已添加到网站头部 (`app/layout.tsx`)
- 客户端ID: `ca-pub-6940272936543623`
- 使用 Next.js Script 组件优化加载性能

### ✅ 2. ads.txt 文件
- 文件位置: `/public/ads.txt`
- 内容: `google.com, pub-6940272936543623, DIRECT, f08c47fec0942fa0`
- 用于验证您的 AdSense 账户所有权

### ✅ 3. AdSense 组件系统
- 主组件: `components/AdSense.tsx`
- 配置文件: `lib/adsense-config.ts`
- 预定义广告位组件:
  - `HeaderAd` - 页面顶部横幅广告
  - `SidebarAd` - 侧边栏矩形广告 (300x250)
  - `ContentAd` - 内容中间流体广告
  - `FooterAd` - 页脚横幅广告
  - `InArticleAd` - 文章内广告
  - `MobileBannerAd` - 移动端横幅广告

### ✅ 4. 广告位布局
- **主页**: 顶部横幅 + 内容中间广告
- **系列页面**: 侧边栏 + 内容广告
- **新闻页面**: 顶部横幅 + 内容广告

## 🔧 下一步配置

### 1. 在 Google AdSense 后台操作
1. **登录 Google AdSense**: https://www.google.com/adsense/
2. **验证网站**: 添加您的域名 `labubuworld.org`
3. **创建广告单元**: 为每种广告位类型创建对应的广告单元
4. **获取广告位ID**: 复制每个广告单元的ID

### 2. 更新广告位ID
编辑 `lib/adsense-config.ts` 文件，将示例ID替换为实际ID：

```typescript
AD_SLOTS: {
  HEADER_BANNER: '您的实际广告位ID',      // 替换 '1234567890'
  SIDEBAR_RECTANGLE: '您的实际广告位ID',  // 替换 '0987654321'
  CONTENT_MIDDLE: '您的实际广告位ID',     // 替换 '1122334455'
  FOOTER_BANNER: '您的实际广告位ID',      // 替换 '5544332211'
  IN_ARTICLE: '您的实际广告位ID',         // 替换 '6677889900'
  MOBILE_BANNER: '您的实际广告位ID',      // 替换 '9988776655'
}
```

### 3. 环境变量配置
在生产环境中设置以下环境变量：

```bash
# 在 Vercel 或其他部署平台设置
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-6940272936543623"
NEXT_PUBLIC_SHOW_ADS="true"
```

### 4. 测试广告显示
1. **开发环境测试**: 设置 `NEXT_PUBLIC_SHOW_ADS=true`
2. **生产环境**: 广告会自动显示
3. **移动端测试**: 确保响应式广告正常显示

## 📊 广告位建议

### 推荐的广告单元类型
1. **顶部横幅**: 728x90 (桌面) / 320x50 (移动)
2. **侧边栏**: 300x250 矩形广告
3. **内容中间**: 自适应流体广告
4. **文章内**: 自适应文章内广告
5. **页脚**: 728x90 横幅广告

### 广告位置优化
- **用户体验优先**: 广告不影响内容阅读
- **移动端友好**: 响应式设计适配所有设备
- **加载性能**: 使用 `afterInteractive` 策略
- **错误处理**: 广告加载失败时优雅降级

## 🚀 部署注意事项

### 1. 域名验证
- 确保 `ads.txt` 文件可以通过 `https://labubuworld.org/ads.txt` 访问
- Google 需要验证域名所有权

### 2. 内容政策
- 确保网站内容符合 Google AdSense 政策
- 避免点击诱导和无效流量

### 3. 性能监控
- 监控广告加载对页面性能的影响
- 使用 Google Analytics 跟踪广告效果

## 🔍 故障排除

### 广告不显示？
1. 检查广告位ID是否正确
2. 确认 AdSense 账户状态
3. 验证 ads.txt 文件内容
4. 检查浏览器控制台错误

### 移动端问题？
1. 测试响应式广告设置
2. 检查移动端广告位配置
3. 确认移动端用户体验

## 📞 支持

如需帮助，请参考：
- [Google AdSense 帮助中心](https://support.google.com/adsense/)
- [Next.js Script 组件文档](https://nextjs.org/docs/basic-features/script)
- 项目 README.md 中的详细配置说明

---

**注意**: 这是一个完整的 AdSense 集成方案，所有技术实现已完成，您只需要在 Google AdSense 后台完成账户设置和广告单元创建即可。 