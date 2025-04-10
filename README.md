# Real-Time Sales Metrics Dashboard

A web application to monitor real-time sales and revenue data for DC InfoTech Pvt Ltd.

## Features

- Real-time data visualization using D3.js
- Dynamic charts and graphs for KPIs
  - Total sales
  - Revenue growth
  - Product performance
- Multi-user access with different privilege levels
  - Viewer role
  - Editor role

## Tech Stack

- Frontend: React.js with TypeScript
- Data Visualization: D3.js
- UI Components: Material-UI
- Database: Firebase Realtime Database
- Authentication: Firebase Auth

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase configuration in `src/config/firebase.ts`

3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── hooks/         # Custom React hooks
├── services/      # API and Firebase services
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
└── config/        # Configuration files
```
