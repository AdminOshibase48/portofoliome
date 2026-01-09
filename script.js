// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
  
  // Initialize all components
  initNavbar();
  initScrollAnimations();
  initScrollProgress();
  initBackToTop();
  initContactForm();
  initLanguageToggle();
  initModal();
});

// ===== NAVBAR =====
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
      }
    });
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    });
  }
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('show', window.scrollY > 500);
    });
    
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const subject = this.querySelector('input[placeholder="Subjek"]').value;
      const message = this.querySelector('textarea').value;
      
      // Validate form
      if (!name || !email || !message) {
        alert('Harap isi semua field yang diperlukan');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Show success message
        alert('Pesan berhasil dikirim! Saya akan menghubungi Anda segera.');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Store in localStorage (for demo)
        const formData = {
          name: name,
          email: email,
          subject: subject,
          message: message,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('last_contact', JSON.stringify(formData));
        
      }, 1500);
    });
  }
}

// ===== LANGUAGE TOGGLE =====
function initLanguageToggle() {
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'id';
  
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'id' ? 'en' : 'id';
      langToggle.textContent = currentLang === 'id' ? 'ID / EN' : 'EN / ID';
      
      // Update all elements with data attributes
      document.querySelectorAll('[data-id]').forEach(element => {
        if (element.dataset[currentLang]) {
          element.textContent = element.dataset[currentLang];
        }
      });
    });
  }
}

// ===== MODAL =====
function initModal() {
  const closeModalBtn = document.querySelector('.close-modal');
  const modal = document.getElementById('certModal');
  
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }
}

// ===== CERTIFICATE DETAILS MODAL =====
function showCertDetails(type) {
  const modal = document.getElementById('certModal');
  const modalBody = document.getElementById('modalBody');
  
  const certData = {
    'dm': {
      title: 'Full Stack Digital Marketing',
      issuer: 'RevoU',
      date: 'December 2023',
      description: 'Sertifikasi lengkap digital marketing meliputi SEO, Social Media Marketing, Google Analytics, Content Strategy, dan Performance Marketing.',
      skills: ['SEO Optimization', 'Social Media Strategy', 'Google Analytics', 'Content Creation', 'Performance Marketing', 'Campaign Management'],
      verification: 'Dapat diverifikasi melalui LinkedIn profile atau dengan menghubungi RevoU langsung.'
    },
    'coding': {
      title: 'Coding Camp',
      issuer: 'RevoU', 
      date: '2023',
      description: 'Bootcamp intensif web development dengan fokus pada HTML, CSS, JavaScript, dan best practices pengembangan website modern.',
      skills: ['HTML5 & CSS3', 'JavaScript Fundamentals', 'Responsive Design', 'Git Version Control', 'Web Development', 'Debugging'],
      verification: 'Dapat diverifikasi melalui LinkedIn profile atau portfolio proyek yang dikerjakan selama bootcamp.'
    }
  };
  
  const data = certData[type];
  
  modalBody.innerHTML = `
    <div class="cert-modal-details">
      <h3 style="margin-bottom: 1rem; color: var(--primary);">${data.title}</h3>
      <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <span style="background: rgba(56, 189, 248, 0.1); color: var(--primary); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
          <i class="fas fa-university"></i> ${data.issuer}
        </span>
        <span style="background: rgba(255, 255, 255, 0.05); color: var(--text); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
          <i class="fas fa-calendar"></i> ${data.date}
        </span>
      </div>
      
      <p style="margin-bottom: 1.5rem; line-height: 1.7; color: var(--muted);">${data.description}</p>
      
      <h4 style="margin-bottom: 1rem; color: var(--text);">Skills & Kompetensi:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${data.skills.map(skill => `
          <span style="background: rgba(56, 189, 248, 0.1); color: var(--primary); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem;">
            ${skill}
          </span>
        `).join('')}
      </div>
      
      <div style="background: rgba(56, 189, 248, 0.05); padding: 1.5rem; border-radius: 10px; border-left: 4px solid var(--primary);">
        <h4 style="margin-bottom: 0.5rem; color: var(--text);">
          <i class="fas fa-shield-check"></i> Verifikasi
        </h4>
        <p style="margin: 0; color: var(--muted); font-size: 0.95rem;">${data.verification}</p>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <a href="https://www.linkedin.com/in/" target="_blank" style="
            background: #0a66c2; 
            color: white; 
            padding: 0.75rem 1.5rem; 
            border-radius: 8px; 
            text-decoration: none; 
            display: inline-flex; 
            align-items: center; 
            gap: 0.5rem; 
            font-size: 0.9rem;
          ">
            <i class="fab fa-linkedin"></i> LinkedIn Profile
          </a>
          <button onclick="closeModal()" style="
            background: transparent; 
            color: var(--text); 
            padding: 0.75rem 1.5rem; 
            border-radius: 8px; 
            border: 1px solid rgba(255, 255, 255, 0.2); 
            cursor: pointer; 
            font-size: 0.9rem;
          ">
            Tutup
          </button>
        </div>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SKILL BARS ANIMATION =====
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-level');
      skillBars.forEach(bar => {
        // Trigger reflow to restart animation
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = bar.parentElement.nextElementSibling.textContent;
        }, 100);
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}
