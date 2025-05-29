import { NextRequest, NextResponse } from "next/server";

const FOURSQUARE_API_KEY = 'fsq3+NAXva7LkB890bDiqkcLPcwFnrjAsiVJm+9nt+El8ZY=';
const BASE_URL = 'https://api.foursquare.com/v3';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const placeId = params.id;
    
    // Fetch place details
    const detailsResponse = await fetch(`${BASE_URL}/places/${placeId}?fields=fsq_id,name,description,location,categories,rating,stats,website,tel,hours,price,tastes,features`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': FOURSQUARE_API_KEY
      }
    });

    if (!detailsResponse.ok) {
      throw new Error(`Foursquare API error: ${detailsResponse.status}`);
    }

    const placeDetails = await detailsResponse.json();
    
    // Fetch place photos
    const photosResponse = await fetch(`${BASE_URL}/places/${placeId}/photos?limit=10`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': FOURSQUARE_API_KEY
      }
    });

    let photos = [];
    if (photosResponse.ok) {
      photos = await photosResponse.json();
    }
    
    // Format the response
    const formattedPlace = {
      ...placeDetails,
      photos: photos.map((photo: any) => ({
        id: photo.id,
        created_at: photo.created_at,
        prefix: photo.prefix,
        suffix: photo.suffix,
        width: photo.width,
        height: photo.height,
        url: `${photo.prefix}original${photo.suffix}`
      }))
    };

    return NextResponse.json({
      success: true,
      data: formattedPlace
    });
  } catch (error) {
    console.error("Error fetching place details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch place details" },
      { status: 500 }
    );
  }
}