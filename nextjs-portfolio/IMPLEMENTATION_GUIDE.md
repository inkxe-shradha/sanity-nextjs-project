# Portfolio Website - Documentation

A fully responsive portfolio website built with **Next.js 16**, **TypeScript**, **React 19**, and **Tailwind CSS v4**. Features a modern design with violet and white theme colors, smooth animations, and mobile-first responsive layouts.

## 🎨 Features Implemented

### 1. **Button Component** (`src/components/Button.tsx`)
- Reusable button component with customizable props
- **Variants**: `primary` (violet bg, white text) and `secondary` (white bg, violet border)
- **Sizes**: `sm`, `md`, `lg` with appropriate padding and font sizes
- **Hover Effects**: Scale animation (1.05x) with color transitions
- **Accessibility**: Focus states with ring styling
- **Responsive**: Adapts well on mobile and desktop

### 2. **Header/Navigation Component** (`src/components/Header.tsx`)
- Sticky top navigation bar with violet background
- **Desktop**: Horizontal links (Home, Portfolio, Blogs, Contact) with underline hover effect
- **Mobile**: Hamburger menu that collapses/expands with smooth slide-down animation
- Responsive breakpoint at `md` (768px)
- Logo/brand link that navigates to home
- Active state styling using Tailwind classes

### 3. **Footer Component** (`src/components/Footer.tsx`)
- Full-width footer with violet background
- **Three Columns**:
  - About section with brand description
  - Quick links navigation
  - Social media icons (Facebook, Twitter, LinkedIn, GitHub, Email)
- **Bottom Section**: Copyright text, Privacy Policy, and Terms of Service links
- **Responsive**: Stacks vertically on mobile, 3 columns on desktop
- Hover effects on all interactive elements
- Uses Lucide React icons for social media

### 4. **Slider Component** (`src/components/Slider.tsx`)
- Image carousel with multiple features
- **Navigation**: Prev/Next buttons with violet styling and hover scale effect
- **Indicators**: Dot navigation that shows current slide and allows jumping to any slide
- **Auto-play**: Configurable auto-play feature that cycles through images (default 5s)
- **Slide Counter**: Top-right display showing "current / total" slides
- **Hover Pause**: Auto-play pauses on hover and resumes when mouse leaves
- **Responsive**: Touch-friendly button sizes, adjusts padding for mobile
- **Animations**: Smooth opacity transitions between slides
- Image optimization using Next.js Image component

### 5. **Contact Form Component** (`src/components/ContactForm.tsx`)
- Form with three input fields:
  - **Name**: Text input with required validation
  - **Email**: Email input with required validation
  - **Message**: Textarea (6 rows) with required validation
- **Submit Button**: Violet primary button with loading state
- **Form States**:
  - `idle`: Normal state
  - `success`: Green success message displays for 3 seconds
  - `error`: Red error message with retry option
- **Form Reset**: Clears all fields after successful submission
- **Responsive**: Full-width on mobile, max-width container on desktop
- Smooth transitions and focus states for all inputs

### 6. **Home Page** (`src/app/page.tsx`)
- **Hero Banner Section**:
  - Full-width gradient background (violet-600 to violet-800)
  - Headline: "Welcome to My Portfolio"
  - Subtext with compelling call-to-action
  - Two buttons: "View My Work" (primary) and "Get In Touch" (secondary)
  - Responsive grid layout with decorative image on desktop
  - Mobile-optimized with single column layout

- **Featured Projects Slider**:
  - Uses the Slider component with dummy images
  - Section title and description
  - Auto-playing carousel of project images

- **Recent Works Grid**:
  - 3-column responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)
  - Project cards with:
    - Image hover zoom effect (scale 1.1x)
    - Overlay appears on hover with "View Details" button
    - Category label in violet
    - Project title

- **Stats Section**:
  - 4 stat boxes (Projects, Clients, Experience, Satisfaction)
  - Violet background with white text
  - Responsive 1-2 columns on mobile, 4 columns on desktop

- **Contact Form Section**:
  - Integrated ContactForm component at the bottom

### 7. **Portfolio Page** (`src/app/portfolio/page.tsx`)
- **Page Header**:
  - Gradient background (violet-600 to violet-800)
  - Title and descriptive subtitle

- **Category Filter**:
  - Filter buttons for different project categories
  - Active state styling (violet background)
  - Smooth content filtering

- **Portfolio Grid**:
  - Responsive 3-column grid (1 on mobile, 2 on tablet, 3 on desktop)
  - Portfolio cards with:
    - Image with hover zoom effect
    - Gradient overlay on hover showing title and description
    - Category label
    - Technology tags (showing first 3, with "+X more" indicator)
    - "View Project" button

- **Blog Section**:
  - Integrated blog cards section on the portfolio page
  - 3 featured blog posts
  - "View All Blog Posts" button links to blog page

- **CTA Section**:
  - Call-to-action section encouraging users to start a project
  - "Contact Me" button

### 8. **Blog Listing Page** (`src/containers/BlogPage/BlogListingPage.tsx`)
- **Page Header**: Gradient background with title and description
- **Search Bar**: Filter blog posts by title, excerpt, or category
- **Blog Grid**: 2-column responsive layout (1 column on mobile)
- **Blog Cards**:
  - Featured image with hover zoom
  - Category badge
  - Date and read time (in minutes)
  - Title with hover color change
  - Excerpt (clamped to 2 lines)
  - Author name
  - "Read Article" button

- **Newsletter Subscription**:
  - Email input field
  - Subscribe button
  - Violet background with white text

### 9. **Root Layout** (`src/app/layout.tsx`)
- Wraps entire application with Header and Footer
- Uses CSS flexbox to ensure footer sticks to bottom
- Sets up global metadata (title, description)
- Imports global styles

### 10. **Global Styles** (`src/app/globals.css`)
- Tailwind CSS imports
- Custom animations:
  - `fadeIn`: Opacity transition
  - `slideUp`: Upward movement with fade
  - `slideDown`: Downward movement with fade
  - `scaleIn`: Scale and fade combined
- Smooth scroll behavior for HTML
- Selection color set to violet (#7c3aed)
- Global transitions for interactive elements (300ms duration)

---

## 🎯 Design System

### Color Palette
- **Primary**: Violet (#7c3aed) - `bg-violet-600`, `text-violet-600`
- **Primary Dark**: Violet Dark (#6d28d9) - `bg-violet-700`
- **Primary Light**: Violet Light (#ede9fe) - `bg-violet-100`
- **Secondary**: White (#ffffff)
- **Backgrounds**: Gray (#f3f4f6) - `bg-gray-50`
- **Text Dark**: Gray Dark (#111827) - `text-gray-900`
- **Text Light**: Gray Light (#4b5563) - `text-gray-600`

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Headings**: Bold weights (600-700+)
- **Body**: Regular weight (400)

### Spacing
- Uses Tailwind's default spacing scale
- Padding: 4px, 8px, 12px, 16px, 24px, 32px, etc.
- Margins: Same scale with 32px+ for sections

### Responsive Breakpoints
- **Mobile**: 0px - 767px (single column layouts)
- **Tablet**: 768px - 1023px (2 columns, medium elements)
- **Desktop**: 1024px+ (3-4 columns, full features)

---

## 📦 Project Structure

```
src/
├── app/
│   ├── globals.css              # Global styles and animations
│   ├── layout.tsx               # Root layout with Header & Footer
│   ├── page.tsx                 # Home page
│   ├── portfolio/
│   │   └── page.tsx             # Portfolio page with blog section
│   └── blog/
│       └── page.tsx             # Blog listing page wrapper
├── components/
│   ├── Button.tsx               # Reusable button component
│   ├── Header.tsx               # Navigation header with mobile menu
│   ├── Footer.tsx               # Footer with links and social icons
│   ├── Slider.tsx               # Image carousel component
│   └── ContactForm.tsx          # Contact form with validation
└── containers/
    └── BlogPage/
        └── BlogListingPage.tsx  # Blog listing with search
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- TypeScript knowledge (optional)

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

---

## 🎬 Components Usage

### Button Component
```tsx
import Button from '@/components/Button';

<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="secondary" size="lg">
  Secondary Action
</Button>
```

### Slider Component
```tsx
import Slider from '@/components/Slider';

const images = [
  'https://...',
  'https://...',
];

<Slider images={images} autoPlay={true} autoPlayInterval={5000} />
```

### ContactForm Component
```tsx
import ContactForm from '@/components/ContactForm';

<ContactForm />
```

---

## 🎨 Animations

All components feature smooth animations:
- **Button Hover**: Scale 1.05x with color transition
- **Slider**: Smooth opacity transitions between images
- **Header Mobile Menu**: Slide-down animation on open
- **Portfolio Cards**: Scale image on hover, overlay fade
- **Links**: Underline animation on hover (nav links)
- **Form Inputs**: Border color transition on focus

---

## 📱 Responsiveness

All pages and components are fully responsive:

- **Home Page**: Hero grid adapts from 2 columns (desktop) to 1 (mobile)
- **Portfolio Page**: Grid adjusts from 3 columns → 2 columns → 1 column
- **Blog Page**: Similar responsive grid with search functionality
- **Header**: Hamburger menu appears on mobile (< 768px)
- **Footer**: Stacks vertically on mobile, 3 columns on desktop
- **Images**: Optimized using Next.js Image component for automatic sizing
- **Touch-Friendly**: All buttons and interactive elements sized for touch

---

## 🔧 Customization

### Change Theme Colors
Edit `globals.css` or modify Tailwind classes in components. Currently using `violet-600` (#7c3aed).

### Add Navigation Links
Edit the `navigationLinks` array in `src/components/Header.tsx`

### Add Portfolio Items
Add items to the `portfolioItems` array in `src/app/portfolio/page.tsx`

### Add Blog Posts
Add items to the `blogPosts` array in `src/containers/BlogPage/BlogListingPage.tsx`

### Modify Slider Images
Update the `sliderImages` array in `src/app/page.tsx`

---

## 🐛 Known Issues

- The warning about `images.domains` being deprecated can be fixed by updating `next.config.ts` to use `remotePatterns` instead
- Lucide React is using legacy peer deps for React 19 compatibility

---

## 📝 Notes

- All dummy image URLs use Unsplash (free stock photos)
- Forms currently log to console; integrate with backend as needed
- Blog and Portfolio data are hardcoded; connect to CMS (Sanity) as mentioned in project goals
- All components are client-ready (`'use client'` directives where needed)

---

## 🎯 Future Enhancements

1. Connect to Sanity CMS for dynamic content
2. Add page transitions with Framer Motion
3. Implement dark mode toggle
4. Add 404 and loading pages
5. Setup API routes for form submissions
6. Add image optimization for portfolio items
7. Create individual blog post pages with [slug] routing
8. Add filtering/searching to portfolio grid

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
