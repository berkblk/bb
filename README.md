# Single Page Application - Vanilla JavaScript

A modern single-page application built with vanilla HTML, CSS, and JavaScript. No frameworks, no unnecessary dependencies.

## Features

- **Pure Vanilla JavaScript** - No frameworks or heavy libraries
- **Responsive Design** - Works great on all devices
- **Fast Performance** - Minimal overhead and optimized code
- **Client-side Routing** - URL hash-based navigation
- **Contact Form** - Functional form with validation and submission
- **Clean Architecture** - Well-organized, maintainable code

## Project Structure

```
.
├── public/
│   ├── index.html      # Main HTML entry point
│   ├── styles.css      # Application styles
│   ├── app.js          # Core application logic
│   └── [other assets]
├── package.json        # Project dependencies
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js and npm (optional, for serving the app)

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
```

### Running the Application

You can also open `public/index.html` directly in your browser. For best results with URL routing, use a local server:

```bash
npm start
```

## How It Works

### Routing

The application uses URL hash-based routing for client-side navigation:
- `#home` - Home page
- `#about` - About page
- `#contact` - Contact page

Navigation is handled entirely in JavaScript without page reloads.

### Form Handling

The contact form includes:
- Input validation (required fields, email format)
- Simulated form submission with loading state
- Success/error messaging
- Automatic form reset on successful submission

### Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- HTML5 Form API
- LocalStorage (optional, for future enhancements)

## Code Style

The project follows these conventions:
- Camel case for JavaScript variables and functions
- Kebab case for CSS class names
- Semantic HTML markup
- Mobile-first responsive design

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, CSS variables
- **Vanilla JavaScript (ES6+)** - Core application logic
- **http-server** - Local development server

## Future Enhancements

Potential features that could be added:
- Local storage for form data persistence
- Additional pages and functionality
- Animation improvements
- Offline support with Service Workers
- PWA capabilities
- Unit tests

## License

MIT

## Author

Built as a demonstration of vanilla JavaScript capabilities.
