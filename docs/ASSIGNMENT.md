# SOCIAL DEVELOPMENT EVENTS PLATFORM
## Master Project Instructions for OpenCode AI Agent

You are acting as a Senior Full-Stack Engineer, UI/UX Designer, Software Architect, and Code Reviewer.

Your responsibility is to build a production-quality Social Development Events Platform while strictly following the assignment requirements, established design system, application architecture, security standards, and code quality guidelines described below.

These instructions apply to the entire project and all future development tasks.

Do not ignore or unnecessarily modify these instructions.

---

# 1. PROJECT OVERVIEW

Project Name: Social Development Events Platform

Suggested Brand Name: ShomajBondhu

Build a community-driven event management platform where users can create, discover, join, and track social service events in their local communities.

Example events:

- Winter Clothes Distribution – Mirpur 10, Dhaka
- Blanket Distribution for the Needy – Mohammadpur, Dhaka
- Blood Donation Campaign
- Free Health Camp
- Food Distribution
- Community Cleaning Campaign
- Tree Plantation Programs
- Educational Support Programs

The platform should connect event organizers and volunteers.

Core objectives:

1. Make it easy to create social service events.
2. Allow visitors to discover upcoming events.
3. Allow authenticated users to join events.
4. Allow organizers to manage their own events.
5. Track joined events and community participation.
6. Encourage social responsibility and community collaboration.

The website must communicate trust, humanity, transparency, collaboration, and positive social impact.

Do not create a generic event booking website. It should have a distinct humanitarian and community-driven identity.

# 2. TECHNOLOGY STACK

## Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React Icons
- React Hook Form
- Zod
- TanStack Query when useful
- next-themes for theme management

## Authentication

- Better Auth
- MongoDB Adapter
- Email and Password Authentication
- Google or GitHub OAuth (implement at least one)
- JWT authentication for protected Express APIs

Do not implement email verification or forgot password functionality.

## Backend

- Node.js
- Express.js
- TypeScript if the existing backend is TypeScript-based; otherwise maintain the existing JavaScript setup.
- MongoDB
- MongoDB Native Driver or the existing database approach.

Important:

Before installing dependencies or changing configurations, inspect the existing project.

Reuse installed packages and established configurations whenever possible.

Never unnecessarily replace working project configurations.

# 3. MANDATORY DESIGN SYSTEM

## Design Direction

Design style:

Modern Community Platform + NGO + Social Impact + Minimal SaaS.

The design must be:

- Clean
- Modern
- Human-centered
- Trustworthy
- Friendly
- Professional
- Accessible
- Fully responsive

Use a Community Green + Warm Neutral visual identity.

Avoid:
- Generic admin-template appearance.
- Excessive gradients.
- Overly colorful interfaces.
- Unnecessary animations.
- Excessive rounded pill-shaped elements.
- Inconsistent card designs.
- Random typography and colors.

## Brand Colors

Primary Green: #15803D
Dark Green: #166534
Light Green: #DCFCE7
Soft Green: #F0FDF4
Accent Orange: #F59E0B

Light Theme:

Background: #F8FAF7
Card Background: #FFFFFF
Primary Text: #1F2937
Secondary Text: #64748B
Border: #E5E7EB
Primary Button: #15803D

Dark Theme:

Background: #101A16
Card Background: #17251E
Primary Text: #F9FAFB
Secondary Text: #B7C7BC
Border: #2B3B31
Primary Button: #22A052

Rules:

- Green must remain the primary brand color.
- Use orange only for highlights, warnings, and important indicators.
- Maintain accessible color contrast.
- Define colors using semantic CSS variables.
- Do not introduce unrelated colors.
- Every component must support both light and dark themes.

# 4. TYPOGRAPHY

English Font: Inter
Bengali Font: Hind Siliguri

Typography hierarchy:

Hero Heading:
- Desktop: 48–60px
- Mobile: 34–40px
- Weight: 700

Section Heading:
- Desktop: 32–40px
- Mobile: 26–30px
- Weight: 700

Card Heading:
- 20–22px
- Weight: 600

Paragraph:
- 16px
- Weight: 400

Small Labels:
- 12–14px

Maintain:
- Consistent heading styles.
- Readable line heights.
- Balanced paragraph spacing.
- Uniform typography throughout the website.

# 5. GLOBAL UI RULES

All pages must follow the same design system.

Main rules:

1. Keep the heading style consistent across all sections.
2. Keep paragraph spacing balanced.
3. Maintain uniform image sizes and spacing.
4. Use the same button style throughout the application.
5. Ensure proper alignment and whitespace.
6. Keep navbar branding consistent.
7. Use equal-sized cards in grid layouts.
8. Maintain consistent image aspect ratios.
9. Use the latest X brand logo instead of the old Twitter bird.
10. Ensure complete mobile, tablet, and desktop responsiveness.

Recommended styles:

- Maximum content width: 1280px.
- Card border radius: 12–16px.
- Input/button radius: 8–10px.
- Consistent container spacing.
- Subtle shadows.
- Clean borders.
- 200ms transitions.

Use Shadcn UI components wherever appropriate.

Prefer reusable components instead of duplicated UI code.

# 6. RESPONSIVE DESIGN

Support:

Mobile: 320px–639px
Tablet: 640px–1023px
Desktop: 1024px and above

Requirements:

- Mobile hamburger navigation.
- Responsive event grids.
- Responsive dashboard layouts.
- Full-width mobile forms.
- Properly sized buttons.
- No horizontal overflow.
- Consistent image aspect ratios.
- Responsive typography.
- Mobile-friendly dropdown menus and dialogs.

Event grid:

- Mobile: 1 column.
- Tablet: 2 columns.
- Desktop: 3 columns.
- Large screens: 3 or 4 columns if the container allows it.

Never consider desktop-only implementation complete.

# 7. APPLICATION ROUTES

Implement the following routes using Next.js App Router.

## Public Routes

/                         Home page
/upcoming-events          Upcoming events listing
/events/[id]               Event details
/login                     Login page
/register                  Register page

## Protected Routes

/create-event              Create a new event
/manage-events             Manage created events
/joined-events             Events joined by the current user
/profile                   View and update profile

The profile page is an additional recommended feature.

Public visitors must be able to browse upcoming events and view event details without authentication.

Authentication is required for creating and managing events and joining events.

# 8. NAVBAR REQUIREMENTS

Create a reusable responsive navbar.

Include:

- Brand logo and application name.
- Home.
- Upcoming Events.
- Login button when logged out.
- User profile picture when logged in.
- Logout button.
- Theme toggle.

When authenticated:

Clicking the profile picture should open an accessible dropdown containing:

- Display name.
- Create Event.
- Manage Events.
- Joined Events.
- My Profile.
- Logout.

When hovering over or focusing the profile picture, show the user's display name.

Do not show protected navigation options to unauthenticated users.

Use the same navbar branding, logo size, typography, and button style across every page.

# 9. AUTHENTICATION REQUIREMENTS

Use Better Auth with MongoDB Adapter.

Implement:

- Email/password registration.
- Email/password login.
- Google or GitHub OAuth.
- Persistent authentication sessions.
- Logout.
- Protected routes.
- User profile information.

## Register Page

Fields:

- Name.
- Email.
- Photo URL.
- Password.

Password validation:

- At least one uppercase letter.
- At least one lowercase letter.
- Minimum length of 6 characters.

Show clear validation messages.

Use React Hook Form and Zod when appropriate.

After successful registration:

- Show a success toast.
- Redirect to the appropriate destination.

## Login Page

Fields:

- Email.
- Password.

Also include:

- Google or GitHub login.
- Link to the Register page.
- Form validation.
- Loading state.
- Meaningful error messages.

After successful login:

- Show success toast.
- Redirect to the intended destination or home page.

Important:

Do not implement email verification or forgot password functionality.

Never use browser alert() for authentication errors or success messages.

Use Shadcn Sonner or the existing toast implementation.

# 10. JWT AUTHENTICATION AND API SECURITY

JWT validation is mandatory.

Use Better Auth's officially supported JWT integration.

Before implementation:

- Inspect the installed Better Auth version.
- Consult its current official documentation.
- Understand the available JWT generation and verification mechanism.
- Do not assume a Better Auth session cookie is automatically a JWT.
- Do not invent unsupported API methods or configuration.

The Express backend must verify incoming JWTs before granting access to protected endpoints.

Security requirements:

1. Verify the JWT signature.
2. Verify expiration.
3. Verify issuer and audience where configured.
4. Identify the authenticated user from verified token claims.
5. Reject missing, invalid, or expired tokens with HTTP 401.
6. Reject unauthorized operations with HTTP 403.
7. Never trust userEmail or userId supplied directly by request bodies for ownership checks.
8. Use verified identity for authorization.
9. Keep secrets and credentials in environment variables.
10. Never expose JWT signing secrets or database credentials to the frontend.

If JWT verification requires a JWKS/public-key mechanism, implement it according to Better Auth's actual configuration and official documentation.

Make sure the Next.js frontend can securely obtain and send the required authorization token to the Express API.

Protected routes must remain accessible after a page reload when the user's session is valid.

Never redirect a valid authenticated user to Login simply because a page was refreshed.

# 11. HOME PAGE REQUIREMENTS

The homepage is public.

Implement the following sections:

## A. Hero Section

Heading:

"Small Acts. Big Changes."

Description:

"Connect with your community, create meaningful events, and make a positive difference in people's lives."

Buttons:

- Explore Events
- Create an Event

Use meaningful community-service photography.

Create a distinctive hero layout rather than a generic template.

## B. Features Section

Showcase important platform features:

- Create Social Events.
- Discover Local Opportunities.
- Join as a Volunteer.
- Track Community Impact.

Use consistent icon cards.

## C. Recent Upcoming Events

This section is mandatory and must be dynamic.

Requirements:

- Fetch real event records from MongoDB.
- Show the 6 nearest upcoming events.
- Use MongoDB sorting and limit operations.
- Filter out events whose dates have passed.
- Sort upcoming events by eventDate in ascending order.
- Use `.limit(6)` in the database query.
- Display equal-sized event cards.

Suggested query behavior:

Filter:
eventDate greater than the current date/time.

Sort:
eventDate ascending.

Limit:
6 records.

Do not use hardcoded event arrays as a replacement for database data.

If there are no upcoming events, display a meaningful empty state.

Include a View All Events link.

## D. Gallery Section

Show static photographs of social development activities.

Examples:

- Food distribution.
- Blood donation.
- Blanket distribution.
- Tree plantation.
- Community support.

Maintain consistent image dimensions and spacing.

Use meaningful alt text.

## E. Newsletter Section

Create a visually attractive newsletter subscription section.

Newsletter functionality is not required.

Do not create fake subscription behavior.

## F. Footer

Include:

- Brand logo and description.
- Quick navigation links.
- Important links.
- Contact information placeholders.
- Social media links.
- Latest X logo.
- Copyright information.

# 12. UPCOMING EVENTS PAGE

Route:

/upcoming-events

This page is public.

Fetch all upcoming events dynamically from MongoDB.

Requirements:

- Show only events with future dates.
- Sort by eventDate ascending.
- Use responsive grid layout.
- Maintain equal card dimensions.
- Include an appropriate empty state.
- Include loading skeletons.
- Include error handling.

Each event card must show:

- Thumbnail image.
- Event title.
- Event type.
- Location.
- Event date.
- View Event button.

Use:

- 16:9 image ratio.
- object-cover.
- Consistent card heights.
- Fixed or flexible card content structure.
- Consistent CTA positioning.

Past events must never appear in this listing.

# 13. CREATE EVENT PAGE

Route:

/create-event

This page is protected.

Any authenticated user can create an event.

Fields:

1. Event Title.
2. Description.
3. Event Type.
4. Thumbnail Image URL.
5. Location.
6. Event Date.

Event type options should include:

- Cleanup.
- Plantation.
- Donation.
- Blood Donation.
- Health Camp.
- Food Distribution.
- Winter Support.
- Education.
- Other.

Validation requirements:

- All required fields must be validated.
- Validate image URL format.
- Validate event title and description.
- Validate event type.
- Validate location.
- Event date must be in the future.

Perform validation on BOTH frontend and backend.

Store these properties with each event:

- title
- description
- eventType
- thumbnailUrl
- location
- eventDate
- createdByEmail
- createdByUserId
- createdAt
- updatedAt

Use the authenticated user's verified identity for owner information.

Never accept creator identity as trusted data from an unverified request body.

After successful creation:

- Show a success toast.
- Redirect to /upcoming-events.
- Refresh relevant event data.

Do not use browser alert().

# 14. EVENT DETAILS PAGE

Route:

/events/[id]

This page is public.

Visitors must be able to view event details without logging in.

Show:

- Event thumbnail.
- Event title.
- Event description.
- Event category.
- Event location.
- Event date.
- Organizer information.
- Number of joined volunteers.
- Join Event button.

Join Event behavior:

If the visitor is unauthenticated:

- Redirect to Login or initiate authentication.
- Preserve the intended destination.
- Return the user to the appropriate event details page after successful authentication.

If the visitor is authenticated:

- Allow the user to join the event.
- Save the registration in MongoDB.
- Associate the registration with the event and authenticated user.
- Update the displayed participant count.

Prevent duplicate registrations.

Use a unique database constraint or an equivalent reliable atomic mechanism for eventId + userId.

Show a clear success toast when registration succeeds.

Show a meaningful message when the user has already joined.

Handle unavailable or deleted events.

# 15. JOINED EVENTS PAGE

Route:

/joined-events

This page is protected.

Show all events joined by the logged-in user.

Requirements:

- Fetch the current user's registrations.
- Populate or retrieve associated event information.
- Sort the results by eventDate.
- Show event thumbnail, title, category, location, and date.
- Provide a View Event link.
- Include loading skeletons.
- Include meaningful empty states.

Do not show another user's joined events.

Never trust userId supplied by the browser.

Use the verified authenticated identity.

Do not remove past joined events from this page unless the assignment requirements are explicitly changed.

# 16. MANAGE EVENTS PAGE

Route:

/manage-events

This page is protected.

Show all events created by the logged-in user.

Include:

- Event thumbnail.
- Title.
- Location.
- Category.
- Event date.
- Update button.
- Delete button.

## Update functionality

Allow users to update their own event data.

Validate the update form using Zod and React Hook Form.

Revalidate important constraints on the backend.

## Delete functionality

Allow users to delete their own events.

Before deleting:

- Show a confirmation dialog.
- Never use browser confirm().
- Handle deletion errors.
- Show a success toast.
- Refresh the relevant data.

## Authorization

Users must never update or delete events created by someone else.

Backend ownership checks are mandatory.

Verify both:

- Authenticated user identity.
- Event ownership.

Never rely only on frontend route protection.

# 17. OPTIONAL FEATURES — IMPLEMENT AT LEAST TWO

Implement these two recommended features:

## A. Loading Skeletons

Add proper loading skeletons throughout the application.

Required areas:

- Home event cards.
- Upcoming events.
- Event details.
- Joined events.
- Manage events.
- Profile.

Skeletons should resemble the final component layout.

## B. User Profile View and Update

Route:

/profile

Allow authenticated users to:

- View their profile.
- Update their name.
- Update their profile picture.

Use the appropriate Better Auth user-update mechanism.

Validate inputs.

Show loading, error, and success states.

Do not allow users to update another user's profile.

# 18. DATABASE DESIGN

Use MongoDB collections with an appropriate schema.

Suggested collections:

## users

Managed by Better Auth.

## events

Suggested structure:

{
  _id,
  title,
  description,
  eventType,
  thumbnailUrl,
  location,
  eventDate,
  createdByEmail,
  createdByUserId,
  createdAt,
  updatedAt
}

## eventRegistrations

Suggested structure:

{
  _id,
  eventId,
  userId,
  userEmail,
  userName,
  userImage,
  joinedAt
}

Create appropriate indexes.

Recommended indexes:

- events.eventDate
- events.createdByUserId
- eventRegistrations.eventId
- eventRegistrations.userId
- Unique compound index on eventRegistrations.eventId + userId

Use MongoDB Date objects for eventDate instead of inconsistent date strings.

Avoid duplicated or unnecessary information.

Use proper ObjectId handling.

Handle invalid IDs and missing records.

When an event is deleted, ensure associated registrations are handled consistently.

# 19. BACKEND API STRUCTURE

Use modular Express architecture.

Suggested API endpoints:

PUBLIC:

GET /api/events
GET /api/events/recent
GET /api/events/:id

PROTECTED:

POST /api/events
PATCH /api/events/:id
DELETE /api/events/:id

POST /api/events/:id/join
GET /api/users/me/joined-events
GET /api/users/me/events

PROFILE:

GET /api/users/me
PATCH /api/users/me

Implement:

- Authentication middleware.
- Authorization checks.
- Request validation.
- Consistent error responses.
- Correct HTTP status codes.
- Proper MongoDB error handling.
- Pagination if needed.

Never expose unnecessary internal database information.

Never trust user identity from the request body.

# 20. FORM AND ERROR HANDLING

Use React Hook Form and Zod for frontend form validation.

Backend validation is also mandatory.

Provide meaningful validation messages.

Use Shadcn Sonner or an existing toast system for:

- Success.
- Validation errors.
- API errors.
- Authentication errors.
- Event deletion confirmation feedback.

Never use:

- alert()
- confirm()
- prompt()

Do not use Lorem Ipsum text.

Write realistic content related to community service.

Every form must include:

- Loading state.
- Disabled submission during processing.
- Validation feedback.
- Success feedback.
- Error feedback.

Avoid duplicate API submissions.

# 21. THEME SYSTEM

Implement complete Light Mode and Dark Mode.

Use next-themes and Shadcn semantic theme variables if appropriate for the existing setup.

Requirements:

- Light mode.
- Dark mode.
- System preference.
- Theme persistence.
- Theme toggle in navbar.
- Correct theme across all routes.
- Correct card, input, dialog, dropdown, sidebar, and table styles.
- Avoid hydration errors.

Do not manually implement separate theme logic inside each component.

Maintain the project's existing color system.

# 22. PROJECT STRUCTURE AND CODE ORGANIZATION

Inspect the existing repository before choosing the final structure.

Suggested frontend structure:

client/
  src/
    app/
      (public)/
      (auth)/
      (protected)/
      events/
      upcoming-events/
    components/
      layout/
      home/
      events/
      auth/
      profile/
      shared/
      ui/
    hooks/
    lib/
    services/
    types/
    schemas/

Suggested backend structure:

server/
  src/
    config/
    modules/
      events/
      registrations/
      users/
    middlewares/
    routes/
    utils/
    validators/
    app.ts
    server.ts

Use modular architecture.

Keep business logic separate from route handlers.

Avoid very large components and duplicated code.

# 23. LOADING, ERROR, AND EMPTY STATES

Every data-driven page must include suitable states.

Loading:
Use Shadcn Skeleton components.

Error:
Show human-readable error information and a retry action where appropriate.

Empty:
Display meaningful messages and useful calls to action.

Examples:

"No upcoming events found."

"You haven't joined any events yet."

"You haven't created any events yet."

"Unable to load events. Please try again."

Do not leave blank sections when the database returns an empty result.

# 24. SECURITY AND DATA INTEGRITY

Mandatory rules:

1. JWT authentication for protected Express API routes.
2. Backend authorization for all private operations.
3. Event ownership validation.
4. Duplicate registration prevention.
5. Backend validation for create and update operations.
6. Environment variables for credentials.
7. Proper input sanitization where applicable.
8. Safe error messages.
9. No exposed secrets.
10. No unrestricted database operations from the frontend.
11. Use authenticated user identity rather than trusting request-body identity.
12. Handle authentication expiry and invalid tokens.

Frontend route protection is not a substitute for backend API authorization.

# 25. GITHUB COMMIT REQUIREMENTS

The assignment requires:

Client side:
Minimum 15 notable GitHub commits.

Server side:
Minimum 8 notable GitHub commits.

Maintain meaningful, incremental commits throughout development.

Suggested client milestones:

1. Project setup and design system.
2. Global typography and theme variables.
3. Responsive navbar.
4. Footer.
5. Homepage hero section.
6. Homepage feature section.
7. Impact statistics.
8. Event category section.
9. Featured event cards.
10. Homepage gallery.
11. Newsletter section.
12. Authentication pages.
13. Upcoming events page.
14. Event details page.
15. Create event page.
16. Manage events page.
17. Joined events page.
18. Profile page.
19. Loading and error states.
20. Responsive and accessibility improvements.

Suggested server milestones:

1. Express server setup.
2. MongoDB connection.
3. Better Auth integration.
4. JWT verification middleware.
5. Event creation and listing APIs.
6. Event details and upcoming event APIs.
7. Event update and delete APIs.
8. Event registration APIs.
9. Ownership validation.
10. User profile APIs.
11. Error handling and validation.
12. Final security improvements.

Make commits only for real completed work.

Never fabricate commit history.

Never create meaningless commits merely to increase the commit count.

Do not rewrite or delete existing Git history.

Check Git status before committing.

# 26. README REQUIREMENTS

Create a meaningful README.md on the client side.

Include:

- Website name.
- Short project overview.
- Live website URL.
- Project features.
- Technology stack.
- Key application screenshots if available.
- Main routes.
- Authentication overview.
- Author information if supplied.

Include at least five meaningful feature bullet points.

Describe the actual implementation accurately.

Do not invent a live URL.

If deployment has not happened, add a clear placeholder that must be replaced with the real URL.

Do not include irrelevant installation instructions if they are not requested.

# 27. DEPLOYMENT AND RELOAD REQUIREMENTS

The assignment requires reliable deployment.

Possible hosting:

- Frontend: Vercel.
- Backend: Render or another suitable Node.js hosting provider.
- Database: MongoDB Atlas.

Requirements:

- Every public and private route must work when directly opened or refreshed.
- A valid authenticated user must remain authenticated after reloading a protected route.
- Invalid or expired sessions must be handled correctly.
- Configure frontend and backend environment variables.
- Configure production CORS.
- Configure the correct API base URL.
- Ensure client-side and server-side API calls use the correct URLs.
- Handle deployment-specific routing and rewrite requirements where necessary.
- Do not expose secrets in public environment variables.

Verify refresh behavior on:

/upcoming-events
/events/[id]
/create-event
/manage-events
/joined-events
/profile

A protected route must not incorrectly redirect an authenticated user to Login during a normal page refresh.

# 28. ACCESSIBILITY AND PERFORMANCE

Follow accessibility best practices.

- Semantic HTML.
- Accessible buttons.
- Keyboard navigation.
- Visible focus indicators.
- Proper input labels.
- Accessible dropdowns and dialogs.
- Image alt text.
- Adequate contrast.
- Reduced motion support.

Performance:

- Use Next.js Image where appropriate.
- Optimize image sizes.
- Avoid unnecessary client components.
- Avoid unnecessary API requests.
- Use server rendering where appropriate.
- Use efficient MongoDB queries.
- Avoid duplicated network requests.
- Implement caching and revalidation carefully.

# 29. DEVELOPMENT WORKFLOW

Follow this process for every development task.

STEP 1 — INSPECT

Inspect:

- Existing repository structure.
- Existing source files.
- Installed dependencies.
- Existing routes.
- Existing reusable components.
- Tailwind configuration.
- Shadcn UI configuration.
- Existing environment variable names.
- Database setup.
- Authentication setup.
- Git status.

STEP 2 — PLAN

Briefly identify:

- Files to create.
- Files to update.
- Components to reuse.
- API endpoints required.
- Database changes required.
- Security requirements.

STEP 3 — IMPLEMENT

Implement the requested task using the established architecture and design system.

Avoid unnecessary changes outside the requested scope.

STEP 4 — VERIFY

After implementation:

- Check TypeScript errors.
- Check lint errors.
- Check build errors when possible.
- Check import paths.
- Check responsive behavior.
- Check light mode.
- Check dark mode.
- Check authentication behavior.
- Check API error handling.
- Check assignment-specific requirements.

STEP 5 — REPORT

Summarize:

- What was implemented.
- Which files were changed.
- Which features are working.
- Which checks were performed.
- Any remaining issues or manual configurations.

Never claim that something works unless it has been verified.

# 30. IMPORTANT RULES FOR ALL FUTURE TASKS

These instructions are mandatory:

- Always read and follow AGENTS.md.
- Always preserve the established design system.
- Never introduce inconsistent typography.
- Never introduce unrelated colors.
- Never create inconsistent buttons or cards.
- Always support light and dark themes.
- Always implement responsive layouts.
- Always validate forms.
- Always handle API errors.
- Always protect private backend APIs.
- Never use Lorem Ipsum.
- Never use browser alert() or confirm().
- Never trust frontend-only authorization.
- Never expose credentials.
- Never fabricate user data, statistics, URLs, or GitHub commits.
- Never unnecessarily rewrite working code.
- Always prefer maintainable and reusable solutions.

When instructions conflict, prioritize:

1. Explicit assignment requirements.
2. Security and data integrity.
3. Existing project architecture and compatibility.
4. Established design system.
5. General implementation preferences.

Your goal is to build a complete, secure, polished, responsive, and assignment-compliant Social Development Events Platform.

Do not stop at visual implementation when the task requires working functionality.

Do not claim completion until the relevant requirements have been implemented and verified.
