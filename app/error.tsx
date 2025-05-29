'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-red-200">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <div className="bg-red-50 p-4 rounded mb-4 border border-red-100">
          <p className="text-red-800">{error.message || 'An unexpected error occurred'}</p>
          {error.digest && (
            <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>
          )}
        </div>
        <button
          onClick={() => reset()}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}