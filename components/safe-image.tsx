'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function SafeImage({ src, alt, width, height, className }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by only setting state after mount
  useEffect(() => {
    setMounted(true);
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setImgSrc('/placeholder.svg');
    setError(true);
    setLoading(false);
  };

  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-pulse w-full h-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      )}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          unoptimized
          onLoad={() => setLoading(false)}
          onError={handleError}
        />
      )}
      {error && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1">
          Image failed to load
        </div>
      )}
    </div>
  );
}
