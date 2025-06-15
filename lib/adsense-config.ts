// AdSense 配置文件
// 用于管理所有广告位ID和相关设置

export const ADSENSE_CONFIG = {
  // Google AdSense 客户端ID
  CLIENT_ID: 'ca-pub-6940272936543623',
  
  // 广告位ID配置
  // 注意：这些是示例ID，需要在Google AdSense后台创建实际的广告位后替换
  AD_SLOTS: {
    // 页面顶部横幅广告
    HEADER_BANNER: '1234567890',
    
    // 侧边栏广告（300x250）
    SIDEBAR_RECTANGLE: '0987654321',
    
    // 内容中间广告（自适应）
    CONTENT_MIDDLE: '1122334455',
    
    // 页脚广告
    FOOTER_BANNER: '5544332211',
    
    // 文章内广告
    IN_ARTICLE: '6677889900',
    
    // 移动端广告
    MOBILE_BANNER: '9988776655',
  },
  
  // 广告格式配置
  AD_FORMATS: {
    AUTO: 'auto',
    HORIZONTAL: 'horizontal',
    RECTANGLE: 'rectangle',
    VERTICAL: 'vertical',
    FLUID: 'fluid',
  },
  
  // 响应式广告尺寸
  RESPONSIVE_SIZES: {
    LEADERBOARD: { width: 728, height: 90 },
    MEDIUM_RECTANGLE: { width: 300, height: 250 },
    LARGE_RECTANGLE: { width: 336, height: 280 },
    SKYSCRAPER: { width: 160, height: 600 },
    WIDE_SKYSCRAPER: { width: 300, height: 600 },
    MOBILE_BANNER: { width: 320, height: 50 },
  },
  
  // 广告显示设置
  SETTINGS: {
    // 是否启用全宽响应式
    FULL_WIDTH_RESPONSIVE: true,
    
    // 是否启用自动广告
    AUTO_ADS: true,
    
    // 广告加载策略
    LOADING_STRATEGY: 'afterInteractive' as const,
  }
}

// 广告位类型定义
export type AdSlotType = keyof typeof ADSENSE_CONFIG.AD_SLOTS
export type AdFormatType = keyof typeof ADSENSE_CONFIG.AD_FORMATS

// 获取广告位ID的辅助函数
export function getAdSlotId(slotType: AdSlotType): string {
  return ADSENSE_CONFIG.AD_SLOTS[slotType]
}

// 获取广告格式的辅助函数
export function getAdFormat(formatType: AdFormatType): string {
  return ADSENSE_CONFIG.AD_FORMATS[formatType]
}

// 检查是否应该显示广告的函数
export function shouldShowAds(): boolean {
  // 在开发环境中可以选择不显示广告
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_SHOW_ADS === 'true'
  }
  
  // 生产环境默认显示广告
  return true
}

// 广告位配置预设
export const AD_PRESETS = {
  // 主页广告配置
  HOME_PAGE: {
    header: {
      slot: ADSENSE_CONFIG.AD_SLOTS.HEADER_BANNER,
      format: ADSENSE_CONFIG.AD_FORMATS.HORIZONTAL,
    },
    content: {
      slot: ADSENSE_CONFIG.AD_SLOTS.CONTENT_MIDDLE,
      format: ADSENSE_CONFIG.AD_FORMATS.FLUID,
    },
  },
  
  // 文章页面广告配置
  ARTICLE_PAGE: {
    sidebar: {
      slot: ADSENSE_CONFIG.AD_SLOTS.SIDEBAR_RECTANGLE,
      format: ADSENSE_CONFIG.AD_FORMATS.RECTANGLE,
    },
    inArticle: {
      slot: ADSENSE_CONFIG.AD_SLOTS.IN_ARTICLE,
      format: ADSENSE_CONFIG.AD_FORMATS.FLUID,
    },
  },
  
  // 移动端广告配置
  MOBILE: {
    banner: {
      slot: ADSENSE_CONFIG.AD_SLOTS.MOBILE_BANNER,
      format: ADSENSE_CONFIG.AD_FORMATS.HORIZONTAL,
    },
  },
} 