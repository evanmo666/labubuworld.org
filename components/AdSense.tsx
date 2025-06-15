"use client"

import { useEffect } from 'react'
import { ADSENSE_CONFIG, getAdSlotId, shouldShowAds } from '@/lib/adsense-config'

interface AdSenseProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export function AdSense({ 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ""
}: AdSenseProps) {
  useEffect(() => {
    try {
      // 确保adsbygoogle已加载
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  // 检查是否应该显示广告
  if (!shouldShowAds()) {
    return null
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={ADSENSE_CONFIG.CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

// 预定义的广告位组件
export function HeaderAd() {
  return (
    <AdSense
      adSlot={getAdSlotId('HEADER_BANNER')}
      adFormat="horizontal"
      className="my-4"
      style={{ display: 'block', textAlign: 'center' }}
    />
  )
}

export function SidebarAd() {
  return (
    <AdSense
      adSlot={getAdSlotId('SIDEBAR_RECTANGLE')}
      adFormat="rectangle"
      className="my-4"
      style={{ display: 'block', width: '300px', height: '250px' }}
    />
  )
}

export function ContentAd() {
  return (
    <AdSense
      adSlot={getAdSlotId('CONTENT_MIDDLE')}
      adFormat="fluid"
      className="my-6"
      style={{ display: 'block', textAlign: 'center' }}
    />
  )
}

export function FooterAd() {
  return (
    <AdSense
      adSlot={getAdSlotId('FOOTER_BANNER')}
      adFormat="horizontal"
      className="my-4"
      style={{ display: 'block', textAlign: 'center' }}
    />
  )
}

export function InArticleAd() {
  return (
    <AdSense
      adSlot={getAdSlotId('IN_ARTICLE')}
      adFormat="fluid"
      className="my-8"
      style={{ display: 'block', textAlign: 'center' }}
    />
  )
}

export function MobileBannerAd() {
  return (
    <AdSense
      adSlot={getAdSlotId('MOBILE_BANNER')}
      adFormat="horizontal"
      className="my-2 md:hidden"
      style={{ display: 'block', textAlign: 'center' }}
    />
  )
} 