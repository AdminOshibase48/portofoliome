// Language toggle
let lang = 'id';
document.getElementById('langToggle').addEventListener('click', () => {
  lang = lang === 'id' ? 'en' : 'id';
  document.querySelectorAll('[data-id]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
});

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
