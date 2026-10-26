# CleanSync – Functional Guide

CleanSync is a web application developed as a final exam project for the React course at SoftUni (Software University).

The application is designed to simplify the management of cleaning schedules for holiday rental properties. It helps cleaning teams organize scheduled cleanings, manage guest arrival requirements, and coordinate employee availability and comments through a secure, user-friendly interface.

CleanSync is built with React, Vite, Tailwind CSS, and Supabase, demonstrating practical skills in component-based development, routing, authentication, CRUD operations, and database integration.

Live Application: https://cleansync.vedioweb.com

GitHub Repository: https://github.com/mina1961/clean-sync

## 1. Project Overview

### Application Name
CleanSync

### Application Category / Topic
Guest House Cleaning Schedule Management Application

### Main Purpose
CleanSync is a web application designed to simplify the management of cleaning schedules for holiday rental properties. It allows authenticated users to create, view, update, and delete cleaning appointments, manage guest arrival requirements, and track scheduled cleanings for individual villas. The application provides a public property catalog and secure access to cleaning management features.

---

## 2. User Access & Permissions

### Guest
Guests can access the Home page, browse the public villa catalog, and view details about individual properties. They can also access the Login and Register pages. Guests cannot create, edit, or delete cleaning records, and attempts to access protected cleaning details redirect them to the Login page.

### Authenticated User
Authenticated users can view cleaning schedules and cleaning details, create new cleaning appointments, and manage their own records. They can edit and delete only the cleaning records they created. Ownership permissions are enforced through Supabase Row Level Security (RLS). Authenticated users can also log out and are redirected away from the Login and Register pages.

---

## 3. Authentication & Session Handling
CleanSync uses Supabase Authentication for user registration, login, logout, and session management.

- Registration: New users can create an account using an email address and password. Email confirmation is supported through Supabase.
- Login: Registered users can sign in with their credentials. Invalid credentials produce an error message.
- Logout: Authenticated users can securely sign out of the application.
- Session Management: React Context (AuthContext) manages authentication state and provides user information to components.
- Protected Routes: ProtectedRoute prevents unauthenticated users from accessing restricted pages and redirects them to Login.
- Guest Routes: GuestRoute prevents authenticated users from accessing Login and Register and redirects them to Schedule.

## 4. Routing Structure
CleanSync uses React Router for client-side navigation.

Route	                             Page	                               Access

  /	                                 Home	                               Public
  /schedule	               Cleaning Schedule / Villa Gallery	Public route; content
                                                                depends on authentication
  /houses	                      Villa Catalog	                           Public
  /houses/:houseId	              Villa Details	                           Public
  /cleanings/:cleaningId	     Cleaning Details	            Authenticated users only
  /login	                          Login	                             Guests only
  /register	                         Register	                         Guests only

Dynamic URL parameters (`houseId` and `cleaningId`) are used to load individual records from Supabase. ProtectedRoute redirects unauthenticated visitors to Login, while GuestRoute redirects authenticated users away from Login and Register to Schedule.

## 5. List → Details Flow
CleanSync provides two main List → Details navigation flows:

1. Villa Catalog → Villa Details: Users can browse the villa catalog at `/houses` and select an individual property to open `/houses/:houseId`. The details page displays the villa name, location, image, property information, and cleaning schedule.

2. Cleaning Schedule → Cleaning Details: Authenticated users can view scheduled cleanings and open `/cleanings/:cleaningId` to see detailed information about a specific cleaning, including the villa, date, time, status, guest counts, and special requirements.

Both details pages retrieve the selected record from Supabase using a dynamic URL parameter. If a record does not exist, the application displays a not-found message and provides navigation back to the relevant list.

## 6. Data Source & Backend
CleanSync uses Supabase as its Backend as a Service (BaaS) platform. Supabase provides a hosted PostgreSQL database, authentication services, and an API for accessing application data.

The application uses three main database tables:

- `houses` – stores villa information, including names, images, and descriptions.
- `cleanings` – stores cleaning appointments, including the associated villa, date, time, status, guest information, special requirements, and the ID of the user who created each record.
- `cleaning_responses` – stores employee responses to scheduled cleanings, including the cleaning ID, user ID, availability status, optional comments, and timestamps.

React communicates with Supabase through the Supabase JavaScript client. Data is retrieved and updated asynchronously without requiring a custom Express or Node.js backend.

Supabase Row Level Security (RLS) policies control access to database records. Public users can read villa information, authenticated users can access cleaning records, and only the creator of a cleaning record can update or delete it.

Authenticated employees can submit and update their own availability responses and comments for scheduled cleanings. Team responses can be viewed by authenticated users.

The React frontend is deployed on Hostinger, while the database and authentication services are hosted by Supabase.

## 7. CRUD Operations

CleanSync implements full CRUD functionality for cleaning appointments:

- **Create** – Authenticated users can create cleaning appointments for individual villas, including the cleaning date, time, guest information, and special requirements.
- **Read** – Authenticated users can view scheduled cleanings and open a details page for an individual cleaning record.
- **Update** – Users can edit cleaning appointments they created. Changes are saved to Supabase and reflected in the application.
- **Delete** – Users can delete their own cleaning appointments.

### Employee Availability & Comments

Authenticated employees can respond to scheduled cleaning appointments:

- **Create** – Submit an availability response (Available or Unavailable) with an optional comment.
- **Read** – View availability responses and comments submitted by team members.
- **Update** – Change their own availability status or edit their comments.

Employee responses are stored in the `cleaning_responses` table. Supabase Row Level Security ensures that employees can create and update only their own responses.

## 8. Forms & Validation
CleanSync uses forms for user registration, login, and managing cleaning appointments.

- Login and Registration: Forms collect user credentials and validate required fields and email format.
- Cleaning Forms: Authenticated users can enter or update the villa, cleaning date and time, guest counts, and special requirements.
- Controlled Inputs: React state manages form values and updates them in response to user input.
- Form Submission: Event handlers process submitted data and communicate with Supabase.
- Validation Feedback: Required fields and invalid input are checked before submission. Authentication errors are displayed to users.

### Employee Availability Form

Authenticated employees can submit their availability for a scheduled cleaning by selecting **Available** or **Unavailable** and optionally entering a comment.

The form uses React state to manage user input. When submitted, the application creates a new response or updates the employee's existing response in Supabase.

Each employee can modify only their own response, while authenticated team members can view the submitted availability statuses and comments.

## 9. React-Specific Techniques
CleanSync uses modern React concepts and techniques throughout the application.

- Functional Components: The interface is organized into reusable React components and page components.
- useState: Manages local component state, including form values, loading indicators, errors, and fetched data.
- useEffect: Handles asynchronous data fetching and updates when route parameters change.
- React Context: AuthContext provides authentication state and user information across the application.
- Custom Hook: useAuth provides convenient access to the authentication context.
- React Router: Implements client-side navigation, dynamic URL parameters, and route protection.
- Conditional Rendering: Displays different content and controls depending on authentication state, loading status, and record ownership.
- Props: Passes data between reusable components such as villa and cleaning cards.
- Event Handling: Handles form submissions, editing, deleting, and navigation actions.

## 10. Typical User Flow
A typical user journey in CleanSync follows these steps:

1. A visitor opens the Home page and browses the public villa catalog.
2. The visitor selects a villa to view its details.
3. To manage cleaning appointments, the visitor registers or logs in.
4. After authentication, the user accesses the cleaning schedule.
5. The user creates a cleaning appointment by selecting a villa and entering the cleaning date, time, guest information, and special requirements.
6. The new appointment appears in the cleaning schedule.
7. The user opens the cleaning details page to review the appointment.
8. If the user created the appointment, they can edit or delete it.
9. The user opens a scheduled cleaning and selects **Available** or **Unavailable** to indicate their availability, optionally adding a comment.

10. The user can view other team members' availability responses and update their own response if necessary.

11. The user logs out when finished. Protected cleaning management features are no longer accessible without authentication.

## 11. Error & Edge Case Handling
CleanSync includes error handling and validation to improve reliability and user experience.

- Form Validation: Login and Register forms prevent submission when required fields are empty or the email format is invalid.
- Authentication Errors: Failed login attempts display an error message returned by Supabase.
- Loading States: The application displays loading feedback while authentication or data requests are being processed.
- Missing Records: Invalid villa or cleaning IDs display a not-found message with a navigation link back to the relevant page.
- Protected Routes: Unauthenticated visitors attempting to access cleaning details are redirected to Login.
- Ownership Restrictions: Users cannot edit or delete cleaning records created by other users. These restrictions are enforced through Supabase RLS.
- API Errors: Errors returned by Supabase are handled and displayed where supported by the relevant component.