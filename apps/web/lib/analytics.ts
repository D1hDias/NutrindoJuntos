// Analytics tracking utility
// Supports Google Analytics 4 and other tracking platforms

interface TrackEventParams {
  [key: string]: string | number | boolean
}

/**
 * Track custom events for analytics
 */
export function trackEvent(eventName: string, parameters?: TrackEventParams): void {
  try {
    // Google Analytics 4 (gtag)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-expect-error - gtag is loaded externally
      window.gtag('event', eventName, {
        ...parameters,
        timestamp: Date.now(),
        page_url: window.location.href,
        page_title: document.title,
      })
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', {
        event: eventName,
        parameters,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : 'N/A'
      })
    }

    // Facebook Pixel (if available)
    if (typeof window !== 'undefined' && 'fbq' in window) {
      // @ts-expect-error - fbq is loaded externally
      window.fbq('track', eventName, parameters)
    }

  } catch (error) {
    console.warn('Analytics tracking error:', error)
  }
}

/**
 * Track page views
 */
export function trackPageView(url?: string): void {
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  
  trackEvent('page_view', {
    page_url: pageUrl,
    page_title: typeof document !== 'undefined' ? document.title : '',
  })
}

/**
 * Track course-specific events
 */
export function trackCourseEvent(action: string, courseSlug: string, additionalData?: TrackEventParams): void {
  trackEvent(`course_${action}`, {
    course_slug: courseSlug,
    ...additionalData
  })
}

/**
 * Track conversion events
 */
export function trackConversion(type: 'purchase' | 'lead' | 'signup', value?: number, currency = 'BRL'): void {
  trackEvent('conversion', {
    conversion_type: type,
    value: value || 0,
    currency
  })
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formType: string, formName: string, success: boolean = true): void {
  trackEvent('form_submission', {
    form_type: formType,
    form_name: formName,
    success: success ? 'true' : 'false'
  })
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText?: string): void {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText || '',
  })
}

/**
 * Track search events
 */
export function trackSearch(searchTerm: string, resultCount?: number): void {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount || 0,
  })
}

/**
 * Track user engagement
 */
export function trackEngagement(type: 'scroll' | 'time_on_page' | 'video_play' | 'download', value?: number): void {
  trackEvent('user_engagement', {
    engagement_type: type,
    engagement_value: value || 0,
  })
}

/**
 * Initialize analytics
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return

  // Track initial page view
  trackPageView()

  // Track scroll depth
  let maxScroll = 0
  const trackScrollDepth = () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent
      trackEngagement('scroll', scrollPercent)
    }
  }

  // Throttled scroll tracking
  let scrollTimeout: NodeJS.Timeout
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(trackScrollDepth, 100)
  })

  // Track time on page
  const startTime = Date.now()
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000)
    trackEngagement('time_on_page', timeOnPage)
  })
}

/**
 * Enhanced event tracking with user context
 */
export function trackEventWithContext(eventName: string, parameters?: TrackEventParams): void {
  const contextData: TrackEventParams = {
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    screen_resolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '',
    viewport_size: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    language: typeof navigator !== 'undefined' ? navigator.language : '',
    ...parameters
  }

  trackEvent(eventName, contextData)
}

// Export types for TypeScript support
export type { TrackEventParams }