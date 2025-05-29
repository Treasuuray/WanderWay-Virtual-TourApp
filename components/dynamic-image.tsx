'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface DynamicImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function DynamicImage({ src, alt, width, height, className }: DynamicImageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder div during SSR
    return (
      <div 
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`bg-gray-200 ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/placeholder.svg";
      }}
    />
  );
}