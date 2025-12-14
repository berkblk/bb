# A Day Somewhere Else

An anti-stimulation web experience. Open it, and watch another life loop forever.

No choices. No buttons. No bullshit.

Just one fullscreen 24-hour life loop, synced to your real time.

## The Concept

You open the site. A video starts playing.

It's someone's entire day:

- 5:00 AM → Wake up
- 9:00 AM → Work
- 12:00 PM → Lunch
- 3:00 PM → Afternoon routine
- 6:00 PM → Evening wind-down
- 11:00 PM → Sleep
- 12:00 AM → Night silence
- Back to 5:00 AM → Loop

The video loops forever. You watch. No interaction. No UI clutter.

A tiny label at the top shows which life you're watching and what day it is.

That's it.

## Why This Works

**Time Sync**: At 14:00 in real life, you see the 14:00 part of the loop.

Come back at 3:00 AM? You see the sleep phase.

Same loop, different context.

It becomes a window into another existence.

**Anti-Dopamine**: 

- No notifications
- No infinite scroll
- No choices
- No metrics
- No goals

Just passive observation. Weirdly calming.

## Project Structure

```
public/
├── index.html           # Single fullscreen page
├── styles.css           # Minimal CSS (black bg, fullscreen)
├── app.js               # Core logic: video sync, labels, autoplay
└── video/
    └── day-loop.mp4     # 24-hour looped video (YOU ADD THIS)
```

## How to Use

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:3000`

### What You'll See

**Without a video file** (right now): A colored gradient background with the current time in HH:MM:SS format. It changes throughout the day (morning orange, noon blue, evening red, night dark). The label "Office Worker • [Day]" appears at the top.

**With a video file**: Your 24-hour loop playing fullscreen, synced to your local time. Same label at top.

---

## Getting a Video (Real Solutions)

Don't know where to get a 24-hour video? Read `/public/video/CREATE_VIDEO_EASY.md` for actual, practical options.

**TL;DR options:**

### Fastest (1 minute)

Use the fallback. It already works and looks cool.

### Super Fast (5 minutes)

Generate a test video automatically:

**macOS/Linux:**
```bash
chmod +x scripts/generate-test-video.sh
./scripts/generate-test-video.sh
```

**Windows/All platforms:**
```bash
node scripts/generate-test-video.js
```

Both scripts will ask how long you want the video (10 sec to 24 hours) and generate it for you.

### Easy (1-2 hours)

Stitch together free stock video clips:
- Download clips from Pexels, Pixabay, or Unsplash
- Combine them with FFmpeg or iMovie
- Result: A real, beautiful 24-hour loop

See `/public/video/CREATE_VIDEO_EASY.md` for detailed instructions.

### Smart (30 minutes, costs $5-15)

Use AI video generation (Runway.ml, Synthesia, etc.):
- Write a prompt about the life you want
- Generate 30-second clip
- Use our scripts to extend it
- Get a professional-looking video

See `/public/video/CREATE_VIDEO_EASY.md` for specific tools and how to use them.

---

### Manually Adding a Video

If you already have a video file:

1. Place it at `/public/video/day-loop.mp4`
2. Restart the dev server
3. Video plays automatically, synced to your local time

**Requirements:**

- Format: MP4 (H.264 video)
- Duration: Any length (will loop and time-sync)
- Dimensions: 1920x1080 or higher
- Frame rate: 24fps or 30fps
- Aspect ratio: Any (will cover fullscreen)

**Video Content Ideas:**

- Stock footage montages synced to 24h cycle
- AI-generated scenes
- Stylized animation loop
- Stitched real footage with time-lapse
- Cinematic ambient scenes

### Customizing the Life Name

Edit `app.js`:

```javascript
this.lifeName = 'Office Worker';  // Change this
```

### Customizing Day Names

The day is auto-detected from your system date (Monday, Tuesday, etc.).

To override, edit the `dayNames` array in `app.js`.

## How the Time Sync Works

When you load the page:

1. Get current time: 14:35:22
2. Calculate seconds since midnight: (14 × 3600) + (35 × 60) + 22 = 52522
3. Seek video to that position
4. Play from there
5. When video loops, sync again

Result: Users always see the correct "time of day" in the loop.

If the video is 24 hours long (86400 seconds), perfect alignment.

If shorter, it loops more frequently (still time-synced).

## Browser Support

Works on:
- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- HTML5 video element
- ES6 JavaScript
- CORS support for video files

## No Dependencies

- No Node.js framework
- No build process
- No external libraries
- Pure vanilla HTML/CSS/JavaScript

## Styling Notes

**Black background**: No visual distractions.

**Fullscreen video**: `object-fit: cover` fills the entire viewport, maintaining aspect ratio.

**Minimal label**: Small text at top center, semi-transparent background.

**No controls**: Video plays silently, loops endlessly.

**No interactions**: User cannot pause, seek, or change volume.

## Performance

- Lightweight: ~5KB gzipped (HTML + CSS + JS)
- No rendering overhead
- Efficient DOM
- Browser handles video decoding
- Works on low-end devices

## Future Ideas

**Multiple Lives**:
- Office Worker
- Café Barista
- Night Security Guard
- Flight Attendant
- Small-Town Farmer

Pick on landing page (if you want interactivity later).

**Ambient Soundscapes**:
- Optional audio packs
- Muted by default
- Different moods per life

**Offline Mode**:
- Download loop locally
- Service Worker caching
- Works without internet

**Time-Zone Support**:
- Sync to any timezone
- Travel vibe
- See "foreign" time flow

## Notes

- Video must be properly encoded for web
- CORS headers required for CDN hosting
- Preloading strategy: lazy load on page focus
- Idle detection possible (pause if inactive)
- Mobile: Works fullscreen, respects notches

## Philosophy

This app is intentionally:

❌ Not a game
❌ Not productive
❌ Not social
❌ Not quantified
❌ Not infinite-scroll
❌ Not algorithmic

✅ Meditative
✅ Low-pressure
✅ Immersive
✅ Time-aware
✅ Hypnotic
✅ Honest

It's a fake window.

That's the point.
