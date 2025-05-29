// Foursquare Places API service

const FOURSQUARE_API_KEY = 'fsq3+NAXva7LkB890bDiqkcLPcwFnrjAsiVJm+9nt+El8ZY=';
const BASE_URL = 'https://api.foursquare.com/v3';

interface PlacesSearchParams {
  query?: string;
  ll?: string; // latitude,longitude
  radius?: number;
  categories?: string;
  limit?: number;
  sort?: 'RELEVANCE' | 'RATING' | 'DISTANCE';
}

export async function searchPlaces(params: PlacesSearchParams) {
  const url = new URL(`${BASE_URL}/places/search`);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': FOURSQUARE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Foursquare API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}

export async function getPlaceDetails(fsqId: string) {
  try {
    const response = await fetch(`${BASE_URL}/places/${fsqId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': FOURSQUARE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Foursquare API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
}

export async function getPlacePhotos(fsqId: string, limit = 5) {
  try {
    const response = await fetch(`${BASE_URL}/places/${fsqId}/photos?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': FOURSQUARE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Foursquare API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching place photos:', error);
    throw error;
  }
}

export function getPhotoUrl(photo: any, width = 400, height = 300): string {
  if (!photo || !photo.prefix || !photo.suffix) {
    return "/placeholder.svg";
  }
  
  // Make sure the URL is properly formatted
  return `${photo.prefix}${width}x${height}${photo.suffix}`;
}

// Add a debug function to check image URLs
export async function debugImageUrl(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    console.log(`Image URL ${url} status: ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error(`Failed to fetch image URL ${url}:`, error);
    return false;
  }
}

