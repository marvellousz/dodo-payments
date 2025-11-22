# Dodo Payments Assignment

Next.js app with three main components: Figma dashboard replication, API queue system with rate limiting UI, and backend echo API. Built for the React Intern assignment.

## Project Overview

**Dashboard** (`/`) - Pixel-perfect Figma replication with 7 financial cards in a responsive 3-column layout.

**Queue Demo** (`/queue-demo`) - Interactive API queue system showing real-time request processing, rate limiting, and response history.

**Backend API** (`/api/echo`) - POST endpoint with Zod validation, 2-second delay simulation, and rate limiting (5 requests/minute per IP).

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) for the dashboard or [http://localhost:3000/queue-demo](http://localhost:3000/queue-demo) for the API queue demo.

## Project Components

### 1. Figma Dashboard Replication

**Route:** `/`

Replicates the Figma design with 7 financial cards:
- My Cards - Credit card display with spending limits
- Spending Summary - Gauge chart with category breakdown
- Total Expenses - Line graph with expense tracking
- Recent Transactions - Transaction list with filters
- My Subscriptions - Subscription management
- Exchange - Currency exchange interface
- Credit Score - Credit score visualization

**Features:**
- 3-column responsive grid layout
- Pixel-perfect spacing and typography
- Reusable component system
- Mobile-responsive design

### 2. API Queue System (Rate Limit UI)

**Route:** `/queue-demo`

Frontend queue system that manages API requests to prevent rate limit hits.

**Features:**
- Sequential request processing (one at a time)
- Real-time queue status updates
- Visual indicators for pending, processing, completed, and failed requests
- Statistics dashboard (total, completed, failed, pending)
- Interactive form to add requests
- Quick action buttons for testing

**How it works:**
- Requests are queued when buttons are clicked or form is submitted
- Queue processes requests sequentially with 2-second delays
- UI updates in real-time as requests move through states
- Failed requests (rate limited) are clearly displayed

### 3. Backend Echo API

**Route:** `POST /api/echo`

Backend endpoint that echoes messages with rate limiting.

**Features:**
- Zod validation for request body
- 2-second processing delay
- Rate limiting: 5 requests per minute per IP
- Proper IP extraction from proxy headers
- Structured error responses (400, 429, 500)

**Request:**
```json
{
  "message": "Hello, World!"
}
```

**Response:**
```json
{
  "status": "ok",
  "echo": "Hello, World!"
}
```

**Rate Limit:**
- 5 requests per minute per IP address
- Returns HTTP 429 when exceeded
- Includes retry-after header

## Tech Stack

- **Next.js 16** - App Router, Server Components
- **TypeScript** - Type safety throughout
- **TailwindCSS** - Utility-first styling
- **Zod** - Runtime validation
- **Vercel** - Deployment platform

## Architecture

### File Structure

```
app/
  ├── page.tsx              # Dashboard (Figma replication)
  ├── queue-demo/
  │   └── page.tsx          # API Queue UI
  └── api/
      └── echo/
          └── route.ts      # POST endpoint with rate limiting

components/
  ├── ui/                   # Reusable components
  ├── layout/               # Sidebar, Header
  ├── dashboard/            # Dashboard cards
  └── queue/                # Queue panel

lib/
  ├── apiQueue.ts           # Singleton queue system
  ├── rateLimiter.ts        # IP-based rate limiting
  └── validators.ts         # Zod schemas
```

### Key Decisions

**Queue System**
- Singleton pattern for global state
- Observer pattern for real-time UI updates
- Sequential processing (one request at a time)
- States: pending → processing → completed/failed

**Rate Limiting**
- 5 requests per minute per IP
- IP extraction from proxy headers (`x-forwarded-for`, `x-real-ip`)
- In-memory storage (ready for Redis migration)
- Returns HTTP 429 with retry-after header

**API Design**
- POST `/api/echo` endpoint
- 2-second delay to simulate processing
- Zod validation for request body
- Structured error responses with proper HTTP codes

**UI Components**
- Component-based architecture
- Reusable base components (Button, Input, Card)
- TailwindCSS for styling
- Responsive grid layout
- Real-time queue status updates

**State Management**
- React hooks for local state
- Singleton queue for global state
- Subscription-based updates (no external state lib)

## API Endpoint

**POST** `/api/echo`

Request:
```json
{
  "message": "Hello, World!"
}
```

Response:
```json
{
  "status": "ok",
  "echo": "Hello, World!"
}
```

Rate limit: 5 requests/minute per IP. Returns 429 when exceeded.

## Production Considerations

If this were production:

- **Idempotency keys** - Prevent duplicate charges
- **Retry logic** - Exponential backoff for failures
- **Redis** - Distributed rate limiting
- **Database** - Persistent request logging
- **Authentication** - API keys or OAuth
- **Monitoring** - Request metrics and alerts
- **Webhooks** - Async notifications


## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Auto-deploy on push

No environment variables required for basic setup.
