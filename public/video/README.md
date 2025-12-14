# Video Placeholder

This directory should contain your 24-hour looped video file.

## Required File

Place your video as:
```
public/video/day-loop.mp4
```

## Video Specifications

- **Format**: MP4 (H.264 video)
- **Duration**: 86400 seconds (24 hours) or more
- **Resolution**: 1920x1080 or higher
- **Frame Rate**: 24fps or 30fps
- **Bitrate**: 2-5 Mbps for balance of quality and file size
- **Audio**: Optional (muted by default in app)

## How to Create Your 24-Hour Video

### Option 1: Use Stock Footage
Combine time-lapse and cinematic footage to create a 24-hour narrative:
- 5:00-7:00: Sunrise, morning routine (30 min)
- 7:00-9:00: Commute, morning work (30 min)
- 9:00-12:00: Work focus (60 min)
- 12:00-13:00: Lunch break (30 min)
- 13:00-18:00: Afternoon work (120 min)
- 18:00-20:00: Evening routine (60 min)
- 20:00-23:00: Night wind-down (90 min)
- 23:00-5:00: Sleep phase (360 min)

### Option 2: Use FFmpeg to Create a Test Video

```bash
# Create a simple colored video that represents time progression
ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=86400 \
  -f lavfi -i sine=f=1000:d=86400 \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac \
  day-loop.mp4
```

### Option 3: AI-Generated Content
Use tools like:
- Runway.ml
- Synthesia
- Descript
- Midjourney + image-to-video tools

### Option 4: Compositing in Video Software
- Adobe Premiere Pro
- DaVinci Resolve (free)
- Vegas Pro
- Final Cut Pro

Create segments and blend them into a seamless 24h loop.

## Encoding for Web

Use this FFmpeg command for optimal web delivery:

```bash
ffmpeg -i input_video.mp4 \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -s 1920x1080 \
  -r 30 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  day-loop.mp4
```

Parameters:
- `-preset medium`: Balance quality and speed
- `-crf 23`: Quality (lower = better, range 0-51)
- `-movflags +faststart`: Enables streaming

File size estimate: 100-500 MB for 24 hours at good quality.

## Testing Locally

1. Place `day-loop.mp4` in this directory
2. Run: `npm run dev`
3. Open browser to http://localhost:3000
4. Video should play and be time-synced

## Verification

Check your video:
```bash
ffprobe day-loop.mp4

# Look for:
# Duration: 24:00:00.xx
# Resolution: 1920x1080 or higher
# Codec: h264 for video, aac for audio
```

## Notes

- Video must be properly seekable (fast-start flag)
- Use progressive download MP4, not HLS/DASH
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Ensure smooth loop point (consider fade-to-black transition)

## Troubleshooting

**Video won't load**: Check CORS headers on server, use relative path.

**Video stutters**: Reduce bitrate or resolution, use hardware acceleration.

**No audio**: That's intentional (muted in app), but audio should be encodable.

**Seeking doesn't work**: Ensure `-movflags +faststart` in encoding.
