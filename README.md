# UnaCloneDemo

UnaCloneDemo is a custom AI agent demo built with Next.js and the Runway Characters SDK. It presents a live operations dashboard for Una Transport, with an onboard AI assistant named Una that can navigate the dashboard, inspect data, and interact with the demo ticket workflow.

## What this project includes

- A responsive dashboard UI with overview, revenue, tickets, and settings pages
- A Runway Character agent panel for live demo conversations
- Client-side and server-side demo tooling examples
- Local in-memory data for revenue and ticket interactions
- A ready-to-run Next.js app for in-person customer demos

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Runway Characters SDK

## Local development

```bash
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Environment setup

Create a local `.env.local` file and add:

```bash
RUNWAYML_API_SECRET=your_key_here
```

## Demo notes

This project is designed for live demos and is not intended as a production multi-user backend. The app uses local in-memory data, so state resets when the server restarts.

## Repository

- GitHub: https://github.com/Unagobbato/UnaCloneDemo
