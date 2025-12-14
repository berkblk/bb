class DayViewer {
  constructor() {
    this.video = document.getElementById('lifeVideo');
    this.lifeNameEl = document.getElementById('lifeName');
    this.dayNameEl = document.getElementById('dayName');

    this.lifeName = 'Office Worker';
    this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.videoSrc = 'video/day-loop.mp4';
    this.videoDuration = 86400;

    this.synced = false;

    this.init();
  }

  init() {
    this.setLabels();
    this.setupVideo();
    this.setupEventListeners();
    this.syncTimeOnce();
  }

  setLabels() {
    this.lifeNameEl.textContent = this.lifeName;
    const today = new Date();
    const dayIndex = today.getDay();
    this.dayNameEl.textContent = this.dayNames[dayIndex];
  }

  setupVideo() {
    this.video.src = this.videoSrc;
    this.video.muted = true;
    this.video.loop = true;
    this.video.autoplay = true;
    this.video.playsInline = true;
  }

  setupEventListeners() {
    this.video.addEventListener('loadedmetadata', () => {
      this.videoDuration = this.video.duration;
      this.syncTimeOnce();
    });

    this.video.addEventListener('ended', () => {
      this.syncTimeOnce();
    });

    window.addEventListener('focus', () => {
      this.syncTimeOnce();
    });
  }

  getCurrentTimeInDay() {
    const now = new Date();
    const secondsSinceMidnight = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
    return secondsSinceMidnight;
  }

  syncTimeOnce() {
    if (!this.video.paused && this.synced) {
      return;
    }

    const currentSecond = this.getCurrentTimeInDay();
    const playbackPosition = (currentSecond / this.videoDuration) * this.videoDuration;

    this.video.currentTime = playbackPosition;
    this.synced = true;

    this.video.play().catch(() => {
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.viewer = new DayViewer();
  });
} else {
  window.viewer = new DayViewer();
}
