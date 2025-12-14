# 360° Life Viewer

A minimalist fullscreen viewer that displays 360-degree life images synchronized to the user's local time. Shows different perspectives throughout the day based on the current hour.

## Features

- **Fullscreen Display** - Immersive full viewport image experience
- **Time-Synced Images** - Automatically displays the correct image based on current time
- **Minimal UI** - Only a simple text label at the top, no buttons or interactions
- **Automatic Refresh** - Images update every second as time progresses
- **Responsive** - Works seamlessly on all screen sizes
- **Pure Vanilla JavaScript** - No frameworks, no unnecessary overhead

## Project Structure

```
public/
├── index.html          # Main HTML (single page)
├── styles.css          # Minimal CSS styling
├── app.js              # Time-sync logic
└── images/
    ├── morning.svg     # 5 AM - 12 PM
    ├── midday.svg      # 12 PM - 2 PM
    ├── afternoon.svg   # 2 PM - 6 PM
    ├── evening.svg     # 6 PM - 9 PM
    └── night.svg       # 9 PM - 5 AM
```

## How It Works

### Time-Based Image Selection

The viewer automatically selects images based on the current local time:

- **Morning** (5:00 - 11:59): `morning.svg`
- **Midday** (12:00 - 13:59): `midday.svg`
- **Afternoon** (14:00 - 17:59): `afternoon.svg`
- **Evening** (18:00 - 20:59): `evening.svg`
- **Night** (21:00 - 4:59): `night.svg`

### Day Display

The current day of the week (Monday-Sunday) is automatically detected and displayed from the system date.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:3000`

### Usage

Simply open the page. The viewer will:
1. Display the correct image based on your local time
2. Show your life name and the current day at the top
3. Automatically update the image every second as the time changes
4. Require no interaction - just watch

## Styling

The design is intentionally minimal:
- **Black background** - No distractions
- **Fullscreen image** - Fills the entire viewport
- **Small text label** - 14px text at top center
- **No animations** - Pure, clean display
- **No borders or clutter** - Full immersion

## Customization

You can easily customize the viewer by editing `app.js`:

```javascript
this.lifeName = 'Office Worker';  // Change the life name
this.dayNames = [...]              // Days are auto-detected from system
this.images = [...]                // Add or replace image paths
```

## Browser Compatibility

Works on all modern browsers supporting:
- ES6 JavaScript
- CSS Flexbox
- HTML5 Image API

## Notes

- Currently uses SVG placeholder images representing different times of day
- The time sync uses the user's local system time
- Images update every 1 second
- No external dependencies required

## Future Enhancements

- Replace placeholder SVGs with actual 360-degree images
- Add multiple life routines to cycle through
- Implement gesture controls for panoramic viewing
- Add audio based on time of day
- Support for different timezones
