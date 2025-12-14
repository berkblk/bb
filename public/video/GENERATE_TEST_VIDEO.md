# How to Generate a Test Video

If you don't have a real 24-hour video yet, you can create a simple test video using FFmpeg.

## Quick Test (5-second loop)

Use this command to create a 5-second test video that will still work with time-sync:

```bash
ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=5 \
  -vf "drawtext=text='%{pts\:hms}':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" \
  -c:v libx264 -preset medium -crf 23 \
  day-loop.mp4
```

This creates a black screen with a timer showing elapsed time.

## 24-Hour Test Video

Create a full 24-hour test (86,400 seconds):

```bash
ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=86400 \
  -vf "drawtext=text='Test Loop - Playing':fontsize=36:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" \
  -c:v libx264 -preset veryfast -crf 28 \
  day-loop.mp4
```

**Note**: This will take several minutes and create a large file (~1-2 GB).

## Colored Time-of-Day Video (Better)

Create a gradient that changes based on time:

```bash
ffmpeg -f lavfi \
  -i "color=c=black:s=1920x1080" \
  -vf "
    drawtext=text='Office Worker':fontsize=64:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2-100,
    drawtext=text='%{pts\:hms}':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2+100
  " \
  -t 86400 \
  -c:v libx264 -preset veryfast -crf 28 \
  day-loop.mp4
```

## Fastest Option: 30-second Loop

For faster testing, create a 30-second video:

```bash
ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=30 \
  -vf "drawtext=text='Time: %{pts\:hms}':fontsize=40:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" \
  -c:v libx264 -preset fast -crf 25 \
  day-loop.mp4
```

The app will loop this 30-second video ~2,880 times in 24 hours, but it will still show the correct time in the UI.

## Installation

### macOS (Homebrew)
```bash
brew install ffmpeg
```

### Ubuntu/Debian
```bash
sudo apt-get install ffmpeg
```

### Windows
Download from: https://ffmpeg.org/download.html

## Where to Place the Video

Once you generate the video, place it here:
```
public/video/day-loop.mp4
```

Then run:
```bash
npm run dev
```

And open http://localhost:3000

You should now see the video playing (or the time display if it's a test video).

## What You'll See

- **When video loads**: The video fills the entire screen
- **When video fails**: A time display with "Waiting for video..." message
- **Label**: "Office Worker • [Day]" at the top

The app checks every second for the correct playback position and syncs accordingly.

## Real Video Ideas

Once you're ready for a real 24-hour video:

1. **AI Generated**: Use Runway.ml, Synthesia, or Midjourney
2. **Stock Footage**: Combine clips from Pexels, Pixabay, Unsplash
3. **Stitched Video**: Record multiple clips and splice them together
4. **Animation**: Create in Blender or After Effects
5. **Time-Lapse**: Create a sped-up day from real footage

The key is creating something that feels like 24 continuous hours of a life.
