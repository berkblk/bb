#!/bin/bash

# Simple script to generate a test video for "A Day Somewhere Else"
# Run: chmod +x scripts/generate-test-video.sh && ./scripts/generate-test-video.sh

VIDEO_DIR="public/video"
OUTPUT="$VIDEO_DIR/day-loop.mp4"

echo "🎬 Generating test video..."
echo ""

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Install it first:"
    echo ""
    echo "   macOS:   brew install ffmpeg"
    echo "   Ubuntu:  sudo apt-get install ffmpeg"
    echo "   Windows: Download from https://ffmpeg.org/download.html"
    exit 1
fi

# Prompt user for duration
echo "How long should the video be?"
echo "  1) 10 seconds (instant, tiny file)"
echo "  2) 1 minute (quick test)"
echo "  3) 5 minutes (good test)"
echo "  4) 1 hour (full loop test)"
echo "  5) 24 hours (production, will take time)"
echo ""
read -p "Choose (1-5): " choice

case $choice in
    1) duration=10; name="10-second" ;;
    2) duration=60; name="1-minute" ;;
    3) duration=300; name="5-minute" ;;
    4) duration=3600; name="1-hour" ;;
    5) duration=86400; name="24-hour" ;;
    *) echo "Invalid choice"; exit 1 ;;
esac

echo ""
echo "Generating $name video ($duration seconds)..."
echo "This may take a moment..."
echo ""

mkdir -p "$VIDEO_DIR"

# Generate video with drawtext overlay showing time
ffmpeg -f lavfi -i "color=c=black:s=1920x1080" \
  -vf "drawtext=text='Test Loop':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2-50,\
drawtext=text='%{pts\:hms}':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2+50" \
  -t "$duration" \
  -c:v libx264 -preset fast -crf 28 \
  -y "$OUTPUT" 2>&1 | grep -E "frame|time|built"

if [ -f "$OUTPUT" ]; then
    size=$(du -h "$OUTPUT" | cut -f1)
    echo ""
    echo "✅ Video generated successfully!"
    echo "📁 File: $OUTPUT ($size)"
    echo ""
    echo "To test:"
    echo "  npm run dev"
    echo "  Open http://localhost:3000"
    echo ""
else
    echo "❌ Failed to generate video"
    exit 1
fi
