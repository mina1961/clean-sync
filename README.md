# 🧹 CleanSync

![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

**CleanSync is a web application developed as a final exam project for the React course at SoftUni (Software University).**

The application helps cleaning teams organize cleaning schedules for holiday rental properties, manage guest arrival requirements, and coordinate employee availability.

**Live Demo:** https://cleansync.vedioweb.com

**Functional Guide:** [View detailed documentation](docs/functional-guide.md)

---

## Features

- User registration, login, and logout using Supabase Authentication
- Public villa catalog and individual villa details
- Cleaning schedule management
- Create, read, update, and delete cleaning appointments
- Guest information and special cleaning requirements
- Employee availability and comments
- Protected routes and user-based access permissions
- Responsive interface

## Technologies

- **React 19** — component-based user interface
- **Vite 8** — development server and production build
- **React Router 8** — client-side navigation
- **Tailwind CSS 4** — styling
- **Supabase** — PostgreSQL database and authentication
- **Hostinger** — frontend hosting

## Installation and Local Setup

Clone the repository:

```bash
git clone https://github.com/mina1961/clean-sync.git
cd clean-sync
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and configure the Supabase environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

A configured Supabase project with the required database tables, authentication settings, and RLS policies is necessary for the application to work.

## Application Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/houses` | Public villa catalog |
| `/houses/:houseId` | Villa details |
| `/schedule` | Villa gallery for guests / cleaning schedule for authenticated users |
| `/cleanings/:cleaningId` | Protected cleaning details |
| `/login` | Login |
| `/register` | Registration |

## Database and Security

CleanSync uses Supabase for authentication and data storage.

The main tables are:

- `houses` — villa information
- `cleanings` — cleaning appointments
- `cleaning_responses` — employee availability and comments

Supabase Row Level Security (RLS) is used to enforce database access permissions. Users can manage cleaning records according to their ownership permissions.

## Demo Accounts for Examiners

Dedicated demo accounts will be provided for testing authentication, CRUD operations, user permissions, and employee availability.

*Demo credentials will be added after the test accounts have been created and verified.*

## Documentation

For a detailed explanation of the application architecture, authentication, routing, database integration, CRUD operations, and user flows, see the [Functional Guide](docs/functional-guide.md).

## Author

Developed by Mina Bergova as a final exam project for the **React course at SoftUni**.