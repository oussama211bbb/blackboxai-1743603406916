// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.classList.toggle('dark', savedTheme === 'dark');

// Theme toggle event listener
themeToggle?.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Language Switching Functionality
const languageButtons = document.querySelectorAll('[data-lang]');
const translatableElements = document.querySelectorAll('[data-translate]');

// Sample translations (will be moved to translations.json later)
const translations = {
  en: {
    welcome: "Welcome to my portfolio",
    about: "About Me",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact"
  },
  fr: {
    welcome: "Bienvenue sur mon portfolio",
    about: "À propos",
    projects: "Projets",
    skills: "Compétences",
    contact: "Contact"
  },
  ar: {
    welcome: "مرحبًا بكم في ملفي الشخصي",
    about: "معلومات عني",
    projects: "المشاريع",
    skills: "المهارات",
    contact: "اتصل بي"
  }
};

// Language switch event listeners
languageButtons.forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    updateContent(lang);
    localStorage.setItem('language', lang);
  });
});

function updateContent(lang) {
  translatableElements.forEach(element => {
    const key = element.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// Initialize with saved language or default to English
const savedLanguage = localStorage.getItem('language') || 'en';
updateContent(savedLanguage);

// Contact Form Handling
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
      // In a real app, you would send this to your backend
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    }
  });
}
