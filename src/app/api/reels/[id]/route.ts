import { NextRequest, NextResponse } from 'next/server';

// GET /api/reels/[id] - Get a specific reel
export async function GET(request: NextRequest, context: any) {
  try {
    const { id } = context.params;
    
    return NextResponse.json({ 
      message: `Get reel ${id}`,
      id 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get reel' },
      { status: 500 }
    );
  }
}

// PUT /api/reels/[id] - Update a specific reel
export async function PUT(request: NextRequest, context: any) {
  try {
    const { id } = context.params;
    const body = await request.json();
 
    return NextResponse.json({ 
      message: `Update reel ${id}`,
      id,
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update reel' },
      { status: 500 }
    );
  }
}

// DELETE /api/reels/[id] - Delete a specific reel
export async function DELETE(request: NextRequest, context: any) {
  try {
    const { id } = context.params;
    return NextResponse.json({ 
      message: `Delete reel ${id}`,
      id 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete reel' },
      { status: 500 }
    );
  }
}