import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to serverless offline
    const response = await fetch(' http://localhost:3001/dev/reels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Serverless function returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in create reel API:', error);
    return NextResponse.json(
      { error: 'Failed to create reel' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Forward the request to serverless offline
    const response = await fetch('http://localhost:3001/dev/reels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log("response",response)
      throw new Error(`Serverless function returned ${response.status}`);
    }

    const data = await response.json();
    console.log('Serverless response:', data);
    
    // Handle the response format - if it's wrapped in a 'reels' property, extract it
    const reelsData = data.reels || data;
    
    // Ensure we return an array
    if (Array.isArray(reelsData)) {
      return NextResponse.json(reelsData);
    } else {
      console.error('Invalid response format from serverless:', data);
      return NextResponse.json(
        { error: 'Invalid response format from server' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in list reels API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reels' },
      { status: 500 }
    );
  }
}