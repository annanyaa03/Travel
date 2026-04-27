# Compass and Co. - Travel Experience Platform

**Live Demo:** [https://travel-rosy-omega.vercel.app](https://travel-rosy-omega.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
  - [Application Entry Point](#application-entry-point)
  - [Routing](#routing)
  - [State Management](#state-management)
  - [Maps Integration](#maps-integration)
  - [AI Integration](#ai-integration)
  - [Styling and Typography](#styling-and-typography)
- [Backend](#backend)
  - [Firebase Services](#firebase-services)
  - [Supabase Integration](#supabase-integration)
  - [travel-backend Directory](#travel-backend-directory)
- [External APIs](#external-apis)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend and Environment Setup](#backend-and-environment-setup)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Linting and Code Quality](#linting-and-code-quality)
- [Dependencies](#dependencies)
- [License](#license)

---

## Overview

Compass and Co. is a full-featured travel experience web application designed to help users explore destinations, plan itineraries, and interact with an AI-powered travel assistant. The platform is built as a single-page application (SPA) using React 19, with client-side routing, interactive mapping, real-time AI assistance via Google Gemini, and cloud-based data persistence using both Firebase and Supabase.

The project is structured as a monorepo: the root directory contains the React frontend scaffolded with Vite, and the `travel-backend` subdirectory houses any server-side or supporting backend code. The application is deployed on Vercel and uses a combination of Firebase Authentication, Firestore, Supabase, and several third-party APIs to deliver a seamless travel planning experience.

---

## Architecture

The application follows a client-heavy architecture typical of modern SPAs. Most application logic, routing, and state management lives in the browser. Backend services are consumed via SDK calls (Firebase, Supabase) or REST API calls (Google Gemini, Unsplash, Pexels) directly from the frontend. There is no custom REST API layer in the primary frontend codebase; instead, managed Backend-as-a-Service (BaaS) platforms handle persistence and authentication.

```
Browser (React SPA)
       |
       |--- React Router DOM (client-side routing)
       |--- Zustand (global state)
       |--- Firebase SDK (auth + Firestore)
       |--- Supabase JS SDK (alternative/supplementary storage)
       |--- Google Gemini API (AI travel assistant)
       |--- Unsplash API (destination imagery)
       |--- Leaflet / React Leaflet (interactive maps)
       |
       +--- travel-backend/ (Node.js backend, supplementary server logic)
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Library | React | 19.2.4 |
| Build Tool | Vite | 8.0.0 |
| Language | JavaScript (ES Modules) | ES2022+ |
| Routing | React Router DOM | 7.13.1 |
| State Management | Zustand | 5.0.12 |
| Primary Backend / Auth | Firebase | 12.10.0 |
| Secondary Database | Supabase JS | 2.104.1 |
| AI Assistant | Google Generative AI (Gemini) | 0.24.1 |
| Mapping | Leaflet + React Leaflet | 1.9.4 / 5.0.0 |
| Icons | React Icons | 5.6.0 |
| Styling | Custom CSS | - |
| Linting | ESLint | 9.39.4 |
| Deployment | Vercel | - |

---

## Features

**Destination Exploration**
Users can browse and search travel destinations with rich imagery sourced from the Unsplash API. Each destination card presents curated photos, descriptions, and key information to help users decide where to travel next.

**Interactive Maps**
The platform integrates Leaflet and React Leaflet to render interactive, fully zoomable maps. Users can pin destinations, visualise travel routes, and explore geographic context for each location. Leaflet's CSS and JavaScript are loaded via CDN in `index.html`, and the React Leaflet bindings provide a component-level interface for map interactions.

**AI-Powered Travel Assistant**
An integrated chat interface connects to the Google Gemini API (`@google/generative-ai`). Users can describe their travel preferences, ask for itinerary suggestions, request local tips, or get recommendations for accommodation and activities. The assistant maintains conversational context within the session.

**User Authentication**
Firebase Authentication handles user sign-up, login, and session management. The authentication state is tracked globally using Zustand, making the auth status available to all components without prop drilling.

**Data Persistence**
Logged-in users can save destinations, itineraries, and preferences. Firebase Firestore provides real-time NoSQL document storage. Supabase (`@supabase/supabase-js`) is also integrated, likely for structured relational data such as user profiles, trip records, or review data.

**Responsive User Interface**
The UI is built entirely with custom CSS and is designed to be responsive across desktop and mobile viewports. Typography is handled via two Google Font families — Fraunces (a variable optical-size serif, used for headings and display text) and Inter (a neutral sans-serif, used for body and UI text).

**Single-Page Navigation**
React Router DOM v7 provides client-side routing, enabling fast, flicker-free navigation between pages such as Home, Destinations, Trip Planner, Map View, AI Assistant, and User Profile without full-page reloads.

---

## Project Structure

```
TRAVEL/
|
|-- public/                     # Static assets served directly
|   |-- logo.svg                # Application logo (SVG, referenced in index.html)
|   +-- [other static assets]
|
|-- src/                        # React application source
|   |-- main.jsx                # Application entry point; renders <App /> into #root
|   |-- [components/]           # Reusable UI components
|   |-- [pages/]                # Page-level route components
|   |-- [store/]                # Zustand state stores
|   |-- [services/]             # Firebase, Supabase, Gemini API service wrappers
|   +-- [styles/]               # Global and component CSS files
|
|-- travel-backend/             # Backend / server-side code
|   |-- [server entry / routes] # Node.js server or serverless functions
|   +-- package.json            # Backend-specific dependencies
|
|-- index.html                  # HTML shell; loads fonts, Leaflet CDN, and /src/main.jsx
|-- package.json                # Frontend project metadata and dependencies
|-- vite.config.js              # Vite build and dev server configuration
|-- eslint.config.js            # ESLint flat configuration
|-- .env.example                # Template for required environment variables
|-- .gitignore                  # Git ignore rules (node_modules, .env, dist, etc.)
|-- pexels_page.html            # Standalone HTML reference page (Pexels video asset)
+-- README.md                   # Project documentation (this file)
```

> Note: The internal structure of `src/` (components, pages, store, services) is inferred from the application's documented features and standard React project conventions. Refer to the actual directory listing for the precise folder names.

---

## Frontend

### Application Entry Point

`index.html` serves as the HTML shell for the Vite SPA. It includes:

- A `<meta>` viewport and SEO description tag with the tagline "Compass and Co. - The #1 Rated Travel Experience Platform."
- Google Fonts preconnect links followed by the stylesheet for **Fraunces** (variable-weight optical-size serif) and **Inter** (variable-weight sans-serif).
- Leaflet v1.9.4 CSS and JavaScript loaded from `unpkg.com` via CDN, with SRI integrity hashes for security.
- A single `<div id="root">` mount point.
- A module script tag pointing to `/src/main.jsx`, which bootstraps the React application.

`src/main.jsx` initialises the React tree, wraps it in the router provider, and mounts it to the DOM root.

### Routing

Client-side routing is handled by **React Router DOM v7**. This version of React Router uses the new data router model and supports nested routes, layout routes, loaders, and actions. The application is an SPA and all navigation occurs without server round-trips.

Typical routes include pages for the landing/home view, destination discovery, interactive map, AI assistant chat, trip planner, user authentication (login/signup), and user profile. The router configuration lives within the `src/` tree.

### State Management

**Zustand v5** is used for global application state. Zustand was chosen for its minimal boilerplate compared to Redux and its compatibility with React's concurrent rendering model. Stores likely include:

- **Auth Store:** Tracks the current Firebase user object and authentication loading state.
- **Trip Store:** Manages saved itineraries, selected destinations, and trip metadata.
- **UI Store:** Controls application-wide UI state such as modal visibility, sidebar state, and active filters.

Each store is defined as a standalone module and imported where needed. Because Zustand stores are not React context-dependent, they can also be accessed outside of the component tree (e.g., in service modules).

### Maps Integration

The mapping layer uses **Leaflet 1.9.4** for the underlying map engine and **React Leaflet 5.0.0** for React component bindings. Leaflet is loaded via CDN in `index.html` to avoid bundling its large CSS and JS into the Vite output.

React Leaflet components such as `<MapContainer>`, `<TileLayer>`, `<Marker>`, and `<Popup>` are used to compose the interactive map UI. OpenStreetMap tiles serve as the default base layer (no additional API key required). Custom markers are used to represent travel destinations, and clicking a marker opens a popup with location details and links to the destination detail view.

### AI Integration

The `@google/generative-ai` package (version 0.24.1) provides access to the **Google Gemini** language model. The API key is injected at build time via the `VITE_GEMINI_API_KEY` environment variable.

The AI assistant is likely implemented as a chat-style component that maintains a message history array in local or Zustand state. Each user message is sent to the Gemini API alongside a system prompt that instructs the model to behave as a knowledgeable travel assistant. The response is streamed or returned as a complete message and rendered in the chat UI.

### Styling and Typography

The application uses hand-authored CSS without a utility-first framework such as Tailwind. CSS makes up approximately 18.7% of the codebase, indicating a moderate amount of custom styling. Typography uses two typefaces loaded from Google Fonts:

- **Fraunces** — A variable-axis serif inspired by early 20th century typefaces. Used at optical sizes 9–144 with weights 300, 400, and 500 in both upright and italic styles. Suited for editorial headings and destination names.
- **Inter** — A neutral grotesque sans-serif. Used at weights 300, 400, 500, and 600 for body text, labels, and UI controls.

---

## Backend

### Firebase Services

The project integrates **Firebase v12**, which encompasses:

- **Firebase Authentication:** Manages user identity. Supports email/password sign-in at minimum, with potential for OAuth providers (Google, GitHub) depending on project configuration.
- **Firestore:** A NoSQL document database used for storing user data, saved destinations, itinerary documents, and potentially reviews or ratings. Firestore's real-time listeners can be used to push updates to the UI without polling.
- **Firebase App Initialization:** The Firebase app is initialised once in a service module (e.g., `src/services/firebase.js`) using the environment variables from the `.env` file, and the resulting `app` instance is used to obtain `auth` and `db` references.

Firebase configuration uses seven `VITE_FIREBASE_*` environment variables (see [Environment Variables](#environment-variables)).

### Supabase Integration

**Supabase JS v2.104.1** (`@supabase/supabase-js`) is listed as a production dependency, indicating that the application uses Supabase as a second data store alongside Firebase. Supabase provides a PostgreSQL-based relational database with an auto-generated REST and real-time API.

Possible use cases for Supabase in this project include structured trip or review data, user preference storage, or features that benefit from relational queries that Firestore's document model does not natively support. The Supabase client is likely initialised with a project URL and anon/public key, which may be stored in additional environment variables not yet reflected in `.env.example`.

### travel-backend Directory

The `travel-backend/` subdirectory contains a separate backend project with its own `package.json`. This is likely a Node.js server (Express or a similar framework) or a collection of serverless functions that provides server-side logic not handled by Firebase or Supabase directly.

Possible responsibilities of the backend include:

- Proxying third-party API calls (Unsplash, Pexels) to avoid exposing API keys on the client.
- Handling webhook events from Firebase or Supabase.
- Running scheduled jobs (e.g., refreshing cached destination data).
- Providing custom authentication middleware or token validation.

To set up the backend independently, navigate to the `travel-backend/` directory and follow any instructions in that directory's own configuration files.

---

## External APIs

| API | Purpose | Key Variable |
|---|---|---|
| Google Gemini (`generativelanguage.googleapis.com`) | AI travel assistant chat completions | `VITE_GEMINI_API_KEY` |
| Unsplash API | High-quality destination photography | `VITE_UNSPLASH_ACCESS_KEY` |
| Firebase (auth, Firestore) | User authentication and NoSQL data persistence | `VITE_FIREBASE_*` (7 variables) |
| Supabase | Relational database and real-time data | Configured separately |
| OpenStreetMap / Leaflet | Base map tiles (no API key required) | N/A |

> The Pexels platform is referenced in `pexels_page.html`, which appears to be a standalone page saved for reference or asset tracking rather than part of the built application.

---

## Prerequisites

Before running the project locally, ensure you have the following installed and configured:

- **Node.js** v18 or later (v20 LTS recommended)
- **npm** v9 or later (or an equivalent package manager such as yarn or pnpm)
- A **Firebase project** with the following services enabled:
  - Authentication (Email/Password provider at minimum)
  - Firestore Database
- A **Google Generative AI** API key with access to the Gemini model
- An **Unsplash Developer** account and access key
- (Optional) A **Supabase** project if the Supabase-backed features are required

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/annanyaa03/TRAVEL.git
cd TRAVEL
```

### Frontend Setup

Install all frontend dependencies:

```bash
npm install
```

Create your environment file by copying the provided example:

```bash
cp .env.example .env
```

Fill in all required values in `.env` (see [Environment Variables](#environment-variables) below).

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Backend and Environment Setup

Navigate to the backend directory and install its dependencies:

```bash
cd travel-backend
npm install
```

Refer to any configuration or README files within `travel-backend/` for specific startup instructions. The backend may require its own environment variables or configuration files separate from those in the project root.

---

## Available Scripts

All of the following scripts are run from the **project root** directory.

| Script | Command | Description |
|---|---|---|
| Development server | `npm run dev` | Starts the Vite development server on port 5173 with HMR enabled |
| Production build | `npm run build` | Compiles and bundles the application for production into the `dist/` directory |
| Preview build | `npm run preview` | Serves the production build locally for pre-deployment testing |
| Lint | `npm run lint` | Runs ESLint across all JavaScript and JSX files in the project |

---

## Environment Variables

Create a file named `.env` in the project root. All variables must be prefixed with `VITE_` to be accessible in the Vite application at build time. Do not commit this file to version control; it is already listed in `.gitignore`.

```env
# Google Generative AI (Gemini)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Unsplash Image API
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Firebase Configuration
# Obtain these values from your Firebase project settings
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> If Supabase features are enabled, you will also need to provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. These are not yet reflected in `.env.example` but should be added when configuring Supabase.

**Obtaining API Keys:**

- **Firebase:** Go to the [Firebase Console](https://console.firebase.google.com), create or select a project, navigate to Project Settings > General, scroll to "Your apps," and copy the SDK configuration object values.
- **Gemini:** Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate an API key for the Gemini API.
- **Unsplash:** Register as a developer at [unsplash.com/developers](https://unsplash.com/developers) and create an application to obtain an access key.
- **Supabase:** Create a project at [supabase.com](https://supabase.com), then find your project URL and anon key under Project Settings > API.

---

## Deployment

The application is deployed on **Vercel** and is accessible at [https://travel-rosy-omega.vercel.app](https://travel-rosy-omega.vercel.app).

To deploy your own instance on Vercel:

1. Push the repository to GitHub (or fork the existing one).
2. Import the project into [Vercel](https://vercel.com).
3. Under Project Settings > Environment Variables, add all variables from your `.env` file.
4. Set the **Root Directory** to the project root (where `package.json` lives).
5. Vercel will automatically detect Vite and configure the build command as `npm run build` and the output directory as `dist`.
6. Deploy. Any subsequent push to the `main` branch will trigger an automatic redeployment.

---

## Linting and Code Quality

The project uses **ESLint 9** with the flat configuration format (`eslint.config.js`). The following plugins are active:

- `eslint-plugin-react-hooks` — Enforces the Rules of Hooks, preventing misuse of `useState`, `useEffect`, and other React hooks.
- `eslint-plugin-react-refresh` — Ensures that components are structured in a way compatible with Vite's React Fast Refresh, flagging patterns that would cause full-page reloads instead of hot updates.

Run the linter at any time with:

```bash
npm run lint
```

Fix auto-fixable issues with:

```bash
npm run lint -- --fix
```

---

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.4 | Core UI rendering library |
| `react-dom` | ^19.2.4 | DOM renderer for React |
| `react-router-dom` | ^7.13.1 | Declarative client-side routing |
| `zustand` | ^5.0.12 | Lightweight global state management |
| `firebase` | ^12.10.0 | Authentication and Firestore database |
| `@supabase/supabase-js` | ^2.104.1 | Supabase client for relational data access |
| `@google/generative-ai` | ^0.24.1 | Google Gemini AI SDK for chat completions |
| `leaflet` | ^1.9.4 | Interactive map rendering engine |
| `react-leaflet` | ^5.0.0 | React component bindings for Leaflet |
| `react-icons` | ^5.6.0 | Comprehensive icon library for React |

### Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.0.0 | Frontend build tool and dev server |
| `@vitejs/plugin-react` | ^6.0.0 | Official React plugin for Vite (uses Oxc transformer) |
| `eslint` | ^9.39.4 | JavaScript and JSX static analysis |
| `eslint-plugin-react-hooks` | ^7.0.1 | Lint rules for React Hooks |
| `eslint-plugin-react-refresh` | ^0.5.2 | Lint rules for React Fast Refresh compatibility |
| `@types/react` | ^19.2.14 | TypeScript type definitions for React (used by IDE tooling) |
| `@types/react-dom` | ^19.2.3 | TypeScript type definitions for React DOM |
| `globals` | ^17.4.0 | Global variable definitions for ESLint environments |
| `@eslint/js` | ^9.39.4 | Core ESLint JavaScript ruleset |

---

## License

This project does not currently specify a license. All rights are reserved by the author unless explicitly stated otherwise. If you intend to use, modify, or distribute any part of this codebase, please contact the repository owner for permission.

---

## Author

Developed and maintained by [annanyaa03](https://github.com/annanyaa03).

