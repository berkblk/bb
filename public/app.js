class DayViewer {
  constructor() {
    this.video = document.getElementById('lifeVideo');
    this.lifeNameEl = document.getElementById('lifeName');
    this.dayNameEl = document.getElementById('dayName');
    this.fallback = document.getElementById('fallback');

    this.lifeName = 'Office Worker';
    this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.videoSrc = 'video/day-loop.mp4';
    this.videoDuration = 86400;

    this.synced = false;
    this.videoLoaded = false;

    this.init();
  }

  init() {
    this.setLabels();
    this.setupVideo();
    this.setupEventListeners();
    this.syncTimeOnce();
    this.updateFallback();
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
      this.videoLoaded = true;
      this.syncTimeOnce();
      this.updateFallback();
    });

    this.video.addEventListener('ended', () => {
      this.syncTimeOnce();
    });

    this.video.addEventListener('error', () => {
      this.videoLoaded = false;
      this.updateFallback();
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
    if (!this.videoLoaded) {
      return;
    }

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

  updateFallback() {
    if (!this.videoLoaded) {
      this.fallback.style.display = 'flex';
      this.updateFallbackGradient();
      this.updateFallbackTime();
      setInterval(() => this.updateFallbackTime(), 1000);
    } else {
      this.fallback.style.display = 'none';
    }
  }

  updateFallbackGradient() {
    const now = new Date();
    const hours = now.getHours();
    let gradient = '';

    if (hours >= 5 && hours < 12) {
      gradient = 'linear-gradient(135deg, #FFB347 0%, #FFD700 50%, #87CEEB 100%)';
    } else if (hours >= 12 && hours < 14) {
      gradient = 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)';
    } else if (hours >= 14 && hours < 18) {
      gradient = 'linear-gradient(135deg, #87CEEB 0%, #FFD700 50%, #FFA500 100%)';
    } else if (hours >= 18 && hours < 21) {
      gradient = 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 50%, #2C3E50 100%)';
    } else {
      gradient = 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)';
    }

    this.fallback.style.background = gradient;
  }

  updateFallbackTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeEl = document.getElementById('fallback-time');
    if (timeEl) {
      timeEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.viewer = new DayViewer();
  });
} else {
  window.viewer = new DayViewer();
}
