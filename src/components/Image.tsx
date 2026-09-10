import React, { useState, useId } from "react";
import { ImageOff } from "lucide-react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  blurPlaceholder?: string;
}

/**
 * High-performance Image component implementing:
 * 1. Native lazy-loading (loading="lazy" for below fold, "eager" for priority/hero)
 * 2. Asynchronous decoding (decoding="async")
 * 3. Strict security referrer policy (referrerPolicy="no-referrer")
 * 4. Progressive Blur-Up placeholder effect using low-res thumbnail and shimmer
 * 5. Smooth CSS opacity & unblur transition upon image decode
 * 6. Graceful error fallback state
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = "w-full h-full object-cover",
  containerClassName = "w-full h-full relative overflow-hidden",
  priority = false,
  blurPlaceholder,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const placeholderId = useId();

  // Generate low-resolution micro placeholder for Unsplash images if not explicitly provided
  const computedBlurSrc = React.useMemo(() => {
    if (blurPlaceholder) return blurPlaceholder;
    if (src && src.includes("images.unsplash.com")) {
      // Replace width and quality with micro-thumbnail params
      return src
        .replace(/w=\d+/, "w=30")
        .replace(/q=\d+/, "q=20")
        .concat("&blur=50");
    }
    return undefined;
  }, [src, blurPlaceholder]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#071C14]/10 ${containerClassName}`}>
      {/* 1. Low-Resolution Blur-Up Placeholder & Skeleton Backdrop */}
      {!isLoaded && !hasError && (
        <div
          id={`placeholder-${placeholderId}`}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
          {computedBlurSrc ? (
            <img
              src={computedBlurSrc}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover filter blur-lg scale-110 opacity-70 transform"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-[#12372A]/15 animate-pulse" />
          )}

          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
      )}

      {/* 2. Main High-Resolution Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-all duration-700 ease-out transform ${
            isLoaded
              ? "opacity-100 filter-none"
              : "opacity-0 blur-md scale-105"
          } ${className}`}
          {...props}
        />
      ) : (
        /* 3. Graceful Error Fallback */
        <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-[#071C14]/15 text-[#6B7280] p-4 text-center">
          <ImageOff className="w-8 h-8 text-[#D4A853]/60 mb-2" />
          <span className="text-xs font-medium text-[#1C1C1C]/70">
            {alt || "Image unavailable"}
          </span>
        </div>
      )}
    </div>
  );
};
