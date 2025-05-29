'use client';

import { Suspense } from "react";
import dynamic from 'next/dynamic';

// Dynamically import MainContent with no SSR
const MainContent = dynamic(() => import('@/components/main-content'), { 
  ssr: false,
  loading: () => <div className="p-8">Loading content...</div>
});

export default function MainContentWrapper() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}