#!/usr/bin/env node

/**
 * Generate a test video for "A Day Somewhere Else"
 * Works on Windows, Mac, and Linux
 * 
 * Usage: node scripts/generate-test-video.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('🎬 Generating test video for "A Day Somewhere Else"\n');

  // Check if ffmpeg is installed
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
  } catch {
    console.error('❌ FFmpeg not found. Install it first:');
    console.error('');
    console.error('   macOS:   brew install ffmpeg');
    console.error('   Ubuntu:  sudo apt-get install ffmpeg');
    console.error('   Windows: Download from https://ffmpeg.org/download.html');
    process.exit(1);
  }

  console.log('How long should the video be?');
  console.log('  1) 10 seconds (instant, tiny file)');
  console.log('  2) 1 minute (quick test)');
  console.log('  3) 5 minutes (good test)');
  console.log('  4) 1 hour (full loop test)');
  console.log('  5) 24 hours (production, will take time)');
  console.log('');

  const choice = await question('Choose (1-5): ');

  let duration;
  let name;

  switch (choice.trim()) {
    case '1':
      duration = 10;
      name = '10-second';
      break;
    case '2':
      duration = 60;
      name = '1-minute';
      break;
    case '3':
      duration = 300;
      name = '5-minute';
      break;
    case '4':
      duration = 3600;
      name = '1-hour';
      break;
    case '5':
      duration = 86400;
      name = '24-hour';
      break;
    default:
      console.error('Invalid choice');
      process.exit(1);
  }

  rl.close();

  const videoDir = path.join(__dirname, '..', 'public', 'video');
  const output = path.join(videoDir, 'day-loop.mp4');

  console.log('');
  console.log(`Generating ${name} video (${duration} seconds)...`);
  console.log('This may take a moment...');
  console.log('');

  // Create video directory if it doesn't exist
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  try {
    const cmd =
      `ffmpeg -f lavfi -i "color=c=black:s=1920x1080" ` +
      `-vf "drawtext=text='Test Loop':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2-50,` +
      `drawtext=text='%{pts\\:hms}':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2+50" ` +
      `-t ${duration} ` +
      `-c:v libx264 -preset fast -crf 28 ` +
      `-y "${output}"`;

    execSync(cmd, { stdio: 'inherit' });

    if (fs.existsSync(output)) {
      const stats = fs.statSync(output);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log('');
      console.log('✅ Video generated successfully!');
      console.log(`📁 File: ${output} (${sizeInMB} MB)`);
      console.log('');
      console.log('To test:');
      console.log('  npm run dev');
      console.log('  Open http://localhost:3000');
      console.log('');
    } else {
      console.error('❌ Failed to generate video');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating video:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
