import { NextRequest, NextResponse } from "next/server";

const FOURSQUARE_API_KEY = 'fsq3+NAXva7LkB890bDiqkcLPcwFnrjAsiVJm+9nt+El8ZY=';
const BASE_URL = 'https://api.foursquare.com/v3';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const near = searchParams.get('near') || '';
    const limit = searchParams.get('limit') || '10';
    const fields = searchParams.get('fields') || 'fsq_id,name,location,categories,geocodes';
    
    // Build the URL
    const url = new URL(`${BASE_URL}/places/search`);
    if (query) url.searchParams.append('query', query);
    if (near) url.searchParams.append('near', near);
    url.searchParams.append('limit', limit);
    url.searchParams.append('fields', fields);
    
    // Call Foursquare API
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': FOURSQUARE_API_KEY
      }
    });

    if (!response.ok) {
      console.error(`Foursquare API error: ${response.status}`);
      return NextResponse.json(
        { 
          success: false, 
          error: `Foursquare API error: ${response.status}`,
          details: await response.text()
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data.results,
      total: data.results?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch places",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

