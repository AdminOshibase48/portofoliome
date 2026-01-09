// Language toggle
let lang = 'id';
const langToggle = document.getElementById('langToggle');

if(langToggle) {
  langToggle.addEventListener('click', () => {
    lang = lang === 'id' ? 'en' : 'id';
    langToggle.textContent = lang === 'id' ? 'ID / EN' : 'EN / ID';
    
    document.querySelectorAll('[data-id]').forEach(el => {
      if(el.dataset[lang]) {
        el.textContent = el.dataset[lang];
      }
    });
    
    // Update testimonial section title
    const testimonialTitle = document.querySelector('#testimonials h2');
    if(testimonialTitle && lang === 'en') {
      testimonialTitle.textContent = 'Testimonials';
    } else if(testimonialTitle) {
      testimonialTitle.textContent = 'Testimoni';
    }
  });
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if(hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });
  
  // Tutup menu ketika klik link di mobile
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.textContent = '☰';
    });
  });
  
  // Tutup menu ketika klik di luar
  document.addEventListener('click', (e) => {
    if(!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.textContent = '☰';
    }
  });
}

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Scroll progress bar
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const scrollProgress = document.getElementById('scrollProgress');
  if(scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }
});

// Back to top
const backBtn = document.getElementById('backToTop');
if(backBtn) {
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 500);
  });
  
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form contact
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Simpan ke localStorage (simulasi)
    const formData = {
      name: name,
      email: email,
      message: contactForm.querySelector('textarea').value,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('contact_submission', JSON.stringify(formData));
    
    // Show success message
    const originalText = contactForm.querySelector('button').textContent;
    contactForm.querySelector('button').textContent = lang === 'id' ? 'Terkirim!' : 'Sent!';
    contactForm.querySelector('button').style.background = '#10b981';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      contactForm.querySelector('button').textContent = originalText;
      contactForm.querySelector('button').style.background = '';
    }, 3000);
  });
}

// Animate skill bars when in view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-bar div');
      skillBars.forEach(bar => {
        bar.style.width = bar.style.width; // Trigger animation
      });
    }
  });
}, {
  threshold: 0.5
});

const skillsSection = document.getElementById('skills');
if(skillsSection) {
  skillObserver.observe(skillsSection);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Add current year to footer
const footerYear = document.getElementById('footerYear');
if(footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
