# SignalStack Backend

Express.js backend for SignalStack built with TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues

## Project Structure

```
src/
├── server.ts      # Main application entry point
└── routes/        # API routes
    └── health.ts  # Health check endpoint
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
