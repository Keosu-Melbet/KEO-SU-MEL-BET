# Overview

This is a Vietnamese sports betting landing page built with Flask, specifically promoting MelBet services with a focus on football betting tips ("soi kèo bóng đá"). The application serves as a marketing website for "Kèo Sư MelBet" (MelBet Betting Expert), targeting Vietnamese users with professional sports betting guidance, withdrawal instructions, and partnership opportunities. The site features a modern dark theme with golden accents, responsive design, and includes chatbot functionality for 24/7 user support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a traditional server-side rendered approach with Flask serving HTML templates. The frontend stack includes:

- **Template Engine**: Jinja2 templates with Bootstrap 5 for responsive layout
- **Styling**: Custom CSS with CSS variables for theming, featuring a dark background with golden color scheme
- **JavaScript**: Vanilla JavaScript for interactive features including form validation, smooth scrolling, and chatbot functionality
- **External Libraries**: Bootstrap 5.3.0, Font Awesome 6.4.0, and Google Fonts (Roboto)

The design follows a single-page application pattern with smooth scrolling navigation and animated elements to enhance user experience.

## Backend Architecture
The backend is built with Flask using a minimal architecture:

- **Framework**: Flask web framework with session management
- **Configuration**: Environment-based secret key management for sessions
- **Routing**: Single route serving the main landing page
- **Static Assets**: Organized into CSS, JavaScript, and images directories

The application follows a simple MVC pattern where Flask handles routing and template rendering, while the business logic remains lightweight for this marketing-focused application.

## Security and Configuration
- Session secret key management through environment variables with fallback defaults
- Debug mode enabled for development environment
- Host configuration set to accept connections from any IP (0.0.0.0)

# External Dependencies

## Frontend Dependencies
- **Bootstrap 5.3.0**: CSS framework for responsive design and UI components
- **Font Awesome 6.4.0**: Icon library for visual elements
- **Google Fonts (Roboto)**: Typography with multiple font weights

## Backend Dependencies
- **Flask**: Python web framework for application structure and routing
- **Python Standard Library**: os module for environment variable management

## Deployment Requirements
- **Port Configuration**: Application runs on port 5000
- **Environment Variables**: SESSION_SECRET for secure session management
- **Static File Serving**: Flask's built-in static file handling for CSS, JavaScript, and images

The application is designed to be lightweight and easily deployable, with minimal external dependencies and straightforward configuration requirements.