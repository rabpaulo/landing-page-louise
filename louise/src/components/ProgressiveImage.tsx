import { useEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { useReducedMotion } from 'motion/react'

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string
  aspectRatio?: string
  priority?: boolean
}

export function ProgressiveImage({
  src,
  srcSet,
  sizes,
  alt = '',
  width,
  height,
  className = '',
  wrapperClassName = '',
  aspectRatio,
  priority = false,
  fetchPriority,
  loading,
  decoding = 'async',
  ...rest
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    // If image is already cached and loaded by the browser, mark as loaded immediately
    if (imgRef.current && (imgRef.current.complete || imgRef.current.naturalWidth > 0)) {
      setIsLoaded(true)
    }
  }, [src])

  const effectiveLoading = priority ? 'eager' : (loading ?? 'lazy')
  const effectiveFetchPriority = priority ? 'high' : fetchPriority

  return (
    <div
      className={`progressive-image-wrapper ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!isLoaded && !reduce && (
        <div className="image-shimmer" aria-hidden="true" />
      )}
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={effectiveLoading}
        fetchPriority={effectiveFetchPriority}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`progressive-img ${isLoaded || reduce ? 'is-loaded' : 'is-loading'} ${className}`}
        {...rest}
      />
    </div>
  )
}
