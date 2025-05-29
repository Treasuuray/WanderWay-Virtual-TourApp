# Wanderway - Virtual Travel Experience

![Wanderway Logo](public/logo.png)

## Overview

Wanderway is a virtual travel platform that allows users to explore destinations around the world from the comfort of their home. Our interactive experiences combine high-quality videos, immersive tours, and detailed information about global attractions.

## Features

- **Virtual Tours**: Explore famous landmarks and hidden gems through immersive 360° experiences
- **Destination Discovery**: Browse curated collections of global attractions with detailed information
- **Interactive Maps**: Navigate destinations with our interactive mapping system
- **User Profiles**: Save favorite destinations and create personalized travel wishlists
- **Multi-platform**: Available on web, mobile, and compatible with VR headsets

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Styling**: Tailwind CSS with custom theming
- **State Management**: React Hooks
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wanderway.git
   cd wanderway
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
wanderway/
├── app/                # Next.js app directory
│   ├── about/          # About page
│   ├── api/            # API routes
│   ├── login/          # Authentication pages
│   ├── overview/       # Dashboard and analytics
│   ├── search/         # Search functionality
│   ├── settings/       # User settings
│   └── users/          # User profiles
├── components/         # Reusable UI components
├── lib/                # Utility functions and shared logic
├── public/             # Static assets
└── styles/             # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
