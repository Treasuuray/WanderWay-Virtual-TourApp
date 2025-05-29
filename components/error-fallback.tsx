'use client';

import { useState } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  fallbackUI?: React.ReactNode;
}

export default function ErrorFallback({ 
  error, 
  resetErrorBoundary,
  fallbackUI
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="p-4 border border-red-300 rounded bg-red-50 my-4">
      {fallbackUI || (
        <>
          <h2 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-2">{error.message}</p>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
            
            {showDetails && (
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                {error.stack}
              </pre>
            )}
            
            <button
              onClick={resetErrorBoundary}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try again
            </button>
          </div>
        </>
      )}
    </div>
  );
}