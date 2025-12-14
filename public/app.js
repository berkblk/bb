// Simple Single Page Application using Vanilla JavaScript

class SPA {
  constructor() {
    this.pages = new Map();
    this.currentPage = 'home';
    this.init();
  }

  init() {
    this.cacheElements();
    this.registerPages();
    this.setupEventListeners();
    this.handleInitialRoute();
  }

  cacheElements() {
    this.appContainer = document.getElementById('app');
    this.navMenu = document.querySelector('.nav-menu');
    this.contactForm = document.getElementById('contact-form');
  }

  registerPages() {
    this.pages.set('home', 'page-home');
    this.pages.set('about', 'page-about');
    this.pages.set('contact', 'page-contact');
  }

  setupEventListeners() {
    // Navigation click handlers
    this.navMenu.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (link) {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigateTo(page);
      }
    });

    // Contact form submission
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => {
        this.handleFormSubmit(e);
      });
    }
  }

  handleInitialRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    if (this.pages.has(hash)) {
      this.navigateTo(hash, false);
    }
  }

  navigateTo(page, updateHistory = true) {
    if (!this.pages.has(page)) {
      console.warn(`Page "${page}" not found`);
      return;
    }

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active');
    });

    // Add active class to current nav link
    const activeLink = document.querySelector(`[data-page="${page}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach((pageEl) => {
      pageEl.classList.remove('active');
    });

    // Show current page
    const pageElement = document.getElementById(this.pages.get(page));
    if (pageElement) {
      pageElement.classList.add('active');
    }

    this.currentPage = page;

    // Update URL hash if needed
    if (updateHistory) {
      window.location.hash = page;
    }

    // Reset form if navigating away from contact page
    if (page !== 'contact' && this.contactForm) {
      this.resetContactForm();
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.contactForm);
    const data = Object.fromEntries(formData);

    // Validate form data
    if (!this.validateFormData(data)) {
      this.showFormMessage('Please fill in all fields correctly', 'error');
      return;
    }

    // Simulate form submission
    this.submitForm(data);
  }

  validateFormData(data) {
    const { name, email, message } = data;

    if (!name.trim() || !email.trim() || !message.trim()) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }

  submitForm(data) {
    // Simulate an async operation
    const button = this.contactForm.querySelector('.btn-submit');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending...';

    // Simulate network delay
    setTimeout(() => {
      this.showFormMessage('Message sent successfully! Thank you for contacting us.', 'success');
      this.resetContactForm();
      button.disabled = false;
      button.textContent = originalText;

      // Log form data (in a real app, this would be sent to a server)
      console.log('Form submitted with data:', data);
    }, 1000);
  }

  showFormMessage(message, type) {
    const messageEl = document.getElementById('form-message');
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;

    // Clear message after 5 seconds
    setTimeout(() => {
      messageEl.className = 'form-message';
      messageEl.textContent = '';
    }, 5000);
  }

  resetContactForm() {
    if (this.contactForm) {
      this.contactForm.reset();
    }
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
      messageEl.className = 'form-message';
      messageEl.textContent = '';
    }
  }
}

// Initialize the SPA when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new SPA();
  });
} else {
  window.app = new SPA();
}
