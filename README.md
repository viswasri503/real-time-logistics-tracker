
# Real-Time Logistics Tracker

A React-based logistics tracking dashboard with real-time driver location updates using WebSockets, Tailwind CSS, and Mapbox.

## Features

- Real-time map updates
- Driver list with filtering and selection
- Location updates via WebSocket
- Responsive UI using Tailwind

## Instructions for setting up and running the application.

1. Clone the repo:
   git clone https://github.com/viswasri503/real-time-logistics-tracker
   
   cd real-time-logistics-tracker
   
2. Install dependencies:
   npm install
   
3. Start the development server:
   npm run dev
   
4. WebSocket mock server
   node mock-server/mock-server.js
   
5. Create a `.env` with your Mapbox token:
   VITE_MAPBOX_TOKEN=pk.eyJ1Ijoidmlzd2Fzcmk1MDMiLCJhIjoiY21iODhlNTJ3MGloMjJxcTV2NW53MDR6ciJ9.CdrJl3pvj9KbgIePp51bsg

   
## Tech Stack

- React
- Tailwind CSS
- Mapbox GL JS
- WebSocket


## Architectural Decisions & Design Trade-Offs
1. React with TypeScript
Why: Chosen for its strong type safety and better developer experience in catching errors during development.
Trade-Off: Slightly steeper learning curve and increased setup complexity, but improves maintainability and scalability in the long term.

2. Component-Based Architecture
Why: React’s component model allows for modular, reusable UI pieces such as DriverList, DriverCard, MapView, etc.
Trade-Off: Requires careful state management and prop drilling (or context usage) to prevent performance or complexity issues in deeply nested components.

3. Mapbox GL JS for Map Integration
Why: Provides high-quality, customizable maps with real-time marker updates and smooth interactions.
Trade-Off: Slightly heavier library and requires access tokens. Leaflet was initially considered but Mapbox was chosen for better performance and modern styling.

4. WebSocket for Real-Time Updates
Why: Enables low-latency, bi-directional communication to reflect real-time driver locations.
Trade-Off: More complex than polling; needs reconnection logic and fallback strategies to handle network issues.

5. Redux Toolkit (if used)
Why: Centralizes state management, making it easier to handle driver data and interactions across the app.
Trade-Off: Adds extra boilerplate and setup, but improves predictability and debuggability in larger applications.

6. Tailwind CSS for Styling
Why: Rapid utility-first styling enabled quick UI development with consistent spacing, responsiveness, and theming.
Trade-Off: Verbose JSX with utility classes, but eliminates the need for managing large CSS files or complex stylesheets.

## Known Limitations or areas that could be further optimized
1.Map Performance with Many Markers:
    Currently, the app may experience performance degradation if tracking a very large number of drivers simultaneously. Implementing clustering or virtualization     techniques for markers can help improve performance.
  
2. WebSocket Resilience:
     The current WebSocket connection lacks advanced reconnection strategies and error handling. Adding automatic reconnects and better fallback mechanisms would       enhance reliability.

3.UI/UX Enhancements:
    The driver list filter is basic; adding multi-criteria filtering, search, and sorting would improve usability.
    Map popups could support richer content and more interactive controls.

4.Security & Authentication:
    The assignment does not cover user authentication or authorization. For a production environment, securing the API and WebSocket endpoints is necessary.

5.Testing Coverage:
    Limited unit and integration tests are implemented. Expanding test coverage will improve maintainability and reduce regressions.

6.Mobile Responsiveness:
    While basic responsive design is in place, further optimizations for mobile usability, including touch interactions on the map, would improve accessibility.
