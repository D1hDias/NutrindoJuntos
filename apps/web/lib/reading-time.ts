/**
 * Calculate reading time for a text
 * Based on average reading speed of 200 words per minute in Portuguese
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 min de leitura'
  }
  return `${minutes} min de leitura`
}

/**
 * Calculate and format reading time in one function
 */
export function getReadingTime(text: string): string {
  const minutes = calculateReadingTime(text)
  return formatReadingTime(minutes)
}
