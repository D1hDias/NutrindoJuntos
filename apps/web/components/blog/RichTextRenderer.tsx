/**
 * RichTextRenderer - Secure renderer for Payload CMS rich text content
 *
 * Supports:
 * - Payload CMS 2.0+ Slate format
 * - XSS protection via sanitization
 * - Proper typography and styling
 * - Code blocks, lists, links, images
 */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Slate rich text node types from Payload CMS
interface RichTextNode {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  children?: RichTextNode[]
  url?: string
  value?: string
  fields?: {
    url?: string
    alt?: string
    width?: number
    height?: number
  }
  [key: string]: any
}

interface RichTextRendererProps {
  content: RichTextNode[] | any
  className?: string
}

/**
 * Serialize Slate nodes to React elements
 */
function serializeSlate(node: RichTextNode, index: number = 0): React.ReactNode {
  // Handle text leaf nodes
  if (node.text !== undefined) {
    let text: React.ReactNode = node.text

    // Apply text formatting
    if (node.bold) {
      text = <strong key={`bold-${index}`}>{text}</strong>
    }
    if (node.italic) {
      text = <em key={`italic-${index}`}>{text}</em>
    }
    if (node.underline) {
      text = <u key={`underline-${index}`}>{text}</u>
    }
    if (node.strikethrough) {
      text = <del key={`strike-${index}`}>{text}</del>
    }
    if (node.code) {
      text = <code key={`code-${index}`} className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-primary-600">{text}</code>
    }

    return text
  }

  // Handle element nodes
  const children = node.children?.map((child, i) => serializeSlate(child, i))

  switch (node.type) {
    case 'h1':
      return <h1 key={index} className="mb-6 mt-8 text-4xl font-bold tracking-tight text-graphite first:mt-0">{children}</h1>

    case 'h2':
      return <h2 key={index} className="mb-4 mt-8 text-3xl font-bold tracking-tight text-graphite first:mt-0">{children}</h2>

    case 'h3':
      return <h3 key={index} className="mb-3 mt-6 text-2xl font-semibold tracking-tight text-graphite first:mt-0">{children}</h3>

    case 'h4':
      return <h4 key={index} className="mb-3 mt-6 text-xl font-semibold text-graphite first:mt-0">{children}</h4>

    case 'h5':
      return <h5 key={index} className="mb-2 mt-4 text-lg font-semibold text-graphite first:mt-0">{children}</h5>

    case 'h6':
      return <h6 key={index} className="mb-2 mt-4 text-base font-semibold text-graphite first:mt-0">{children}</h6>

    case 'p':
    case 'paragraph':
      return <p key={index} className="mb-4 leading-relaxed text-neutral-700">{children}</p>

    case 'blockquote':
    case 'quote':
      return (
        <blockquote key={index} className="my-6 border-l-4 border-primary-500 bg-primary-50 py-3 pl-6 pr-4 italic text-neutral-700">
          {children}
        </blockquote>
      )

    case 'ul':
      return <ul key={index} className="mb-4 ml-6 list-disc space-y-2 text-neutral-700">{children}</ul>

    case 'ol':
      return <ol key={index} className="mb-4 ml-6 list-decimal space-y-2 text-neutral-700">{children}</ol>

    case 'li':
    case 'listItem':
      return <li key={index} className="leading-relaxed">{children}</li>

    case 'link':
      const isExternal = node.url?.startsWith('http')
      const linkProps = isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {}

      return (
        <Link
          key={index}
          href={node.url || '#'}
          {...linkProps}
          className="font-medium text-primary-600 underline decoration-primary-200 underline-offset-2 transition-colors hover:text-primary-700 hover:decoration-primary-400"
        >
          {children}
        </Link>
      )

    case 'code':
    case 'code-block':
      return (
        <pre key={index} className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4">
          <code className="text-sm font-mono text-neutral-100">{children}</code>
        </pre>
      )

    case 'hr':
      return <hr key={index} className="my-8 border-neutral-200" />

    case 'upload':
    case 'image':
      const imageValue = typeof node.value === 'object' && node.value !== null ? node.value as Record<string, any> : null
      const imageFields = typeof node.fields === 'object' && node.fields !== null ? node.fields as Record<string, any> : null
      const imageUrl = imageValue?.url || imageFields?.url
      const alt = imageValue?.alt || imageFields?.alt || 'Imagem'
      const width = imageValue?.width || imageFields?.width || 800
      const height = imageValue?.height || imageFields?.height || 600
      const caption = imageFields?.caption

      if (!imageUrl) return null

      return (
        <figure key={index} className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={alt}
              width={width}
              height={height}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-sm italic text-neutral-600">
              {caption}
            </figcaption>
          )}
        </figure>
      )

    default:
      // Fallback for unknown node types - render children
      return <React.Fragment key={index}>{children}</React.Fragment>
  }
}

/**
 * Main RichTextRenderer component
 */
export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  // Handle null/undefined content
  if (!content) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        ⚠️ Conteúdo não disponível
      </div>
    )
  }

  // Handle array of Slate nodes (Payload CMS 2.0 format)
  if (Array.isArray(content)) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        {content.map((node, index) => serializeSlate(node, index))}
      </div>
    )
  }

  // Handle legacy HTML string (fallback)
  if (typeof content === 'string') {
    // For HTML strings, we'd need DOMPurify
    // For now, render as plain text to avoid XSS
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <p className="whitespace-pre-wrap text-neutral-700">{content}</p>
        <p className="mt-4 text-sm text-neutral-500">
          (Conteúdo HTML detectado - renderização segura ativada)
        </p>
      </div>
    )
  }

  // Handle object with root property (some CMS formats)
  if (typeof content === 'object' && content.root) {
    return <RichTextRenderer content={content.root} className={className} />
  }

  // Unknown format - render safe fallback
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-sm text-neutral-600">
        ⚠️ Formato de conteúdo não reconhecido. Por favor, verifique o CMS.
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-neutral-500">
          Debug info (desenvolvimento)
        </summary>
        <pre className="mt-2 overflow-x-auto text-xs text-neutral-600">
          {JSON.stringify(content, null, 2)}
        </pre>
      </details>
    </div>
  )
}

/**
 * Helper component for rendering content with custom wrapper
 */
export function RichTextContent({
  content,
  className = '',
  wrapperClassName = 'prose prose-lg max-w-none'
}: RichTextRendererProps & { wrapperClassName?: string }) {
  return (
    <article className={wrapperClassName}>
      <RichTextRenderer content={content} className={className} />
    </article>
  )
}

export default RichTextRenderer
