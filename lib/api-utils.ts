import { NextResponse } from 'next/server';

export function handleApiError(error: unknown, message = "An error occurred") {
  console.error(message, error);
  
  // Determine the error details
  let errorMessage = message;
  let statusCode = 500;
  
  if (error instanceof Response) {
    statusCode = error.status;
    errorMessage = `API error: ${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  return NextResponse.json(
    { 
      success: false, 
      error: errorMessage,
      details: error instanceof Error ? error.stack : String(error)
    },
    { status: statusCode }
  );
}

export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}