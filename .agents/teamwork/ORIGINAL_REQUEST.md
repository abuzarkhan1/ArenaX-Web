# Original User Request

## Initial Request — 2026-11-07T06:14:45Z

Redesign the public-facing ArenaX-Web website as a showcase, applying the theme, fonts, colours, and UI/UX design patterns with strict adherence to the Supabase design tokens extracted from the read-only reference `Supabase _ The Postgres Development Platform.html` file and folder across all views and pages, while keeping all existing website content intact.

Working directory: c:\Users\Muhammad Minhas\ArenaX-Web
Integrity mode: development

## Requirements

### R1. Reference Analysis (Read-Only)
Analyze `Supabase _ The Postgres Development Platform.html` and its associated files folder strictly in read-only mode to extract the exact design system tokens (including the Supabase green accent `#3ECF8E`, `#171717` and `#121212` dark carbon surfaces, hairline borders, typography, and component styling). Do not modify or overwrite the reference HTML file or its assets folder.

### R2. Theme and UI/UX Redesign
Apply the extracted Supabase design tokens and UI/UX styling consistently across all pages and views of the public-facing ArenaX-Web website, adhering strictly to the extracted color palette (exact `#3ECF8E` green accent, `#171717` / `#121212` dark carbon surfaces, hairline borders), typography, and component styling.

### R3. Content Preservation
Preserve all existing website content, copy, text, labels, and interactive capabilities without modification, replacement, or data loss.

### R4. Build and Verification
Ensure the redesigned website compiles and builds cleanly without errors, maintaining code quality and type integrity.

## Acceptance Criteria

### Reference Integrity
- [ ] The file `Supabase _ The Postgres Development Platform.html` and the `Supabase _ The Postgres Development Platform_files` folder remain unaltered.

### Visual and UI/UX Design
- [ ] Design tokens strictly match the Supabase reference: exact Supabase green accent (`#3ECF8E`), dark carbon surfaces (`#171717` / `#121212`), and subtle hairline borders across all public-facing views.
- [ ] Typography and font styling across headings, body text, buttons, and navigation elements reflect the Supabase styling.
- [ ] UI components (buttons, cards, navigation, badges, inputs) adhere to Supabase visual aesthetics, hairline borders, and spacing conventions.

### Content and Functional Integrity
- [ ] All existing website copy, headlines, descriptions, and functional links/elements remain intact and unchanged.
- [ ] All pages and routes of the public-facing website remain accessible and render without visual glitches or missing content.

### Build and Verification
- [ ] The project build command succeeds with zero errors.
- [ ] TypeScript type checks pass with zero errors.
