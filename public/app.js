class LifeViewer {
  constructor() {
    this.imageViewer = document.getElementById('imageViewer');
    this.lifeNameEl = document.getElementById('lifeName');
    this.dayNameEl = document.getElementById('dayName');
    
    this.lifeName = 'Office Worker';
    this.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.images = [
      'images/morning.svg',
      'images/midday.svg',
      'images/afternoon.svg',
      'images/evening.svg',
      'images/night.svg'
    ];
    
    this.init();
  }

  init() {
    this.setLabels();
    this.updateImageFromTime();
    setInterval(() => this.updateImageFromTime(), 1000);
  }

  setLabels() {
    this.lifeNameEl.textContent = this.lifeName;
    const today = new Date();
    const dayIndex = today.getDay();
    this.dayNameEl.textContent = this.dayNames[dayIndex];
  }

  getImageIndex() {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours >= 5 && hours < 12) {
      return 0;
    } else if (hours >= 12 && hours < 14) {
      return 1;
    } else if (hours >= 14 && hours < 18) {
      return 2;
    } else if (hours >= 18 && hours < 21) {
      return 3;
    } else {
      return 4;
    }
  }

  updateImageFromTime() {
    const imageIndex = this.getImageIndex();
    this.imageViewer.src = this.images[imageIndex];
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.viewer = new LifeViewer();
  });
} else {
  window.viewer = new LifeViewer();
}
