# Personal Portfolio Website

## Overview

This is a modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. The site features a fall-themed design with dark mode support, showcasing sections for personal links, photo gallery, career information, and fun facts. The architecture emphasizes clean, semantic HTML structure with modular JavaScript components and CSS custom properties for consistent theming.

## User Preferences

- Preferred communication style: Simple, everyday language
- User name: Jack Perkins
- Professional role: Solutions Architect (not Software Engineer)
- Wants playful/funny typing animations rather than professional descriptions
- Prefers clean, engaging UI without unnecessary status cards or quotes

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML/CSS/JavaScript implementation without frameworks
- **Modular JavaScript**: Class-based architecture with separate modules for different features:
  - `PersonalPortfolio` (main.js): Core navigation, dark mode, and typing animations
  - `GalleryManager` (gallery.js): Photo gallery with filtering and lightbox functionality
  - `FactsGenerator` (facts.js): Dynamic content generation for fun facts
- **CSS Architecture**: Custom properties-based theming system with separate responsive design file
- **Component-Based Design**: Reusable UI components with consistent styling patterns

### Styling System
- **CSS Custom Properties**: Centralized theme management with fall color palette
- **Dark Mode Support**: Complete theme switching with localStorage persistence
- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
- **Typography**: Google Fonts integration (Inter + Playfair Display) for modern typography hierarchy

### Data Management
- **Static Data**: Gallery items and facts stored as JavaScript objects within modules
- **Local Storage**: User preferences (dark mode) persisted across sessions
- **No Database**: All content is statically defined within the application

### User Experience Features
- **Smooth Animations**: CSS transitions and JavaScript-powered typing animation
- **Navigation**: Single-page application with smooth scrolling between sections
- **Interactive Components**: Photo gallery with filtering, dynamic fact generation
- **Accessibility**: Semantic HTML structure with proper ARIA labels and keyboard navigation

### Asset Management
- **Placeholder System**: SVG placeholders for images during development
- **Icon Integration**: Font Awesome for consistent iconography
- **Favicon Support**: SVG favicon for modern browser compatibility

## External Dependencies

### CDN Services
- **Font Awesome 6.4.0**: Icon library via CDN for UI icons and social media symbols
- **Google Fonts**: Inter and Playfair Display font families for typography

### Browser APIs
- **Local Storage API**: Persisting user preferences (dark mode settings)
- **Intersection Observer API**: Scroll-based animations and section detection
- **CSS Custom Properties**: Modern browser theming capabilities

### Development Tools
- **No Build Process**: Direct browser execution without compilation or bundling
- **No Package Manager**: All dependencies loaded via CDN links
- **Vanilla JavaScript**: No frontend frameworks or libraries beyond Font Awesome

### Future Integration Points
- The modular architecture supports easy integration of:
  - Content Management System for dynamic gallery and facts
  - Contact form backend service
  - Analytics tracking
  - Social media API integrations