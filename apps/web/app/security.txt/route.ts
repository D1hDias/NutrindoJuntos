/**
 * Security.txt route
 * Serves security.txt at both /.well-known/security.txt and /security.txt
 *
 * @see https://securitytxt.org/
 */

import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const securityTxt = readFileSync(
    join(process.cwd(), 'public', '.well-known', 'security.txt'),
    'utf-8'
  )

  return new Response(securityTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
}
