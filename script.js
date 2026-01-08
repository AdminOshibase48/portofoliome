// LANGUAGE
let lang = 'id';
const toggle = document.getElementById('langToggle');

toggle.addEventListener('click', () => {
  lang = lang === 'id' ? 'en' : 'id';
  document.querySelectorAll('[data-id]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
});

// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
