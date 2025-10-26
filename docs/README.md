# Reel PWA App Documentation

## Project Structure

This project follows a clean architecture with clear separation between frontend and backend concerns.

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Backend)
│   │   ├── reels/
│   │   │   ├── route.ts          # GET /api/reels, POST /api/reels
│   │   │   ├── [id]/
│   │   │   │   └── route.ts      # GET/PUT/DELETE /api/reels/[id]
│   │   │   └── presigned-url/
│   │   │       └── route.ts      # POST /api/reels/presigned-url
│   │   └── health/
│   │       └── route.ts          # Health check endpoint
│   ├── components/               # React Components
│   ├── reels/                    # Reels page
│   ├── upload/                   # Upload page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/                          # Backend utilities
│   ├── aws/                      # AWS SDK configuration
│   ├── db/                       # Database operations
│   └── validation/               # Data validation
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript types
└── utils/                        # Frontend utilities
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/reels` - List all reels
- `POST /api/reels` - Create a new reel
- `GET /api/reels/[id]` - Get a specific reel
- `PUT /api/reels/[id]` - Update a specific reel
- `DELETE /api/reels/[id]` - Delete a specific reel
- `POST /api/reels/presigned-url` - Get presigned URL for file upload

## Development

1. Install dependencies: `npm install`
2. Set up environment variables (see `.env.local.example`)
3. Run development server: `npm run dev`

## Deployment

This project can be deployed to various platforms including Vercel, AWS, or any Node.js hosting service.