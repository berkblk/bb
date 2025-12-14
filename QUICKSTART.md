# Quick Start Guide

## 60-Second Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

You'll see a time-based gradient background + digital clock. That's the fallback. It works perfectly as a demo.

---

## Add a Video (5 Minutes)

### Auto-generate a test video:

**macOS/Linux:**
```bash
./scripts/generate-test-video.sh
# Follow the prompts
```

**Windows/All platforms:**
```bash
node scripts/generate-test-video.js
# Follow the prompts
```

Restart dev server, video plays automatically.

---

## What's Happening

1. **Fullscreen experience** - No UI, no buttons
2. **Time-synced** - Shows correct part of the day
3. **Auto-loops** - Plays forever
4. **Minimal label** - "Office Worker • Tuesday" at top
5. **Fallback view** - If no video, shows gradient + clock

---

## Next Steps

- **Want a real 24h video?** → Read `/public/video/CREATE_VIDEO_EASY.md`
- **Want to customize it?** → Edit `public/app.js` (change `lifeName` variable)
- **Want to deploy?** → Push to Vercel/Netlify, make sure `public/video/day-loop.mp4` is included

---

## File Structure

```
public/
├── index.html       # Main page
├── styles.css       # Styling
├── app.js           # Logic
└── video/
    └── day-loop.mp4 # Your video (optional)

scripts/
└── generate-test-video.js  # Video generator
```

---

## That's It

The hard part is finding/creating the video. The app is already done and working.
