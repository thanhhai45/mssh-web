'use client'

import { Play } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'

import { Window } from '@/components/window-frame'

/**
 * A YouTube video that is only a picture until it is played. The page makes
 * no request to YouTube — no player script, no cookie — before the visitor
 * asks for the video, and then it comes from youtube-nocookie.com.
 */
export function YouTubeVideo({
  id,
  title,
  poster,
  aspect = '16 / 10',
  className = '',
}: {
  id: string
  title: string
  // Our own screenshot rather than YouTube's thumbnail, which would be a
  // request to Google before anyone pressed play.
  poster: StaticImageData
  // The recording's own shape, so the player has no black bars.
  aspect?: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <Window title={title} className={className}>
      <div className="relative w-full bg-black" style={{ aspectRatio: aspect }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full cursor-pointer"
            aria-label={`Play: ${title}`}
          >
            <Image
              src={poster}
              alt=""
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="size-full object-cover opacity-60 transition group-hover:opacity-50"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-accent text-background shadow-xl transition group-hover:scale-110 sm:size-20">
                <Play className="ml-1 size-7 fill-current sm:size-9" />
              </span>
            </span>
          </button>
        )}
      </div>
    </Window>
  )
}
