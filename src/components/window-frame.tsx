import Image, { type StaticImageData } from 'next/image'

/**
 * A screenshot in a macOS window, so it reads as the app rather than a
 * picture of a web page.
 */
export function WindowFrame({
  src,
  alt,
  title = 'mssh',
  priority = false,
  className = '',
}: {
  src: StaticImageData
  alt: string
  title?: string
  priority?: boolean
  className?: string
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/60 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-raised px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-muted">{title}</span>
      </div>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        sizes="(min-width: 1280px) 1152px, 100vw"
        className="block h-auto w-full"
      />
    </figure>
  )
}
