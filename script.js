// NAVBAR
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
toggle.onclick = () => menu.classList.toggle('active');

// REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
});
reveals.forEach(r => observer.observe(r));

// MODAL CERT
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
document.querySelectorAll('.certificate').forEach(c => {
  c.onclick = () => {
    modal.style.display = 'flex';
    modalImg.src = c.dataset.img;
  };
});
document.querySelector('.close').onclick = () => modal.style.display = 'none';
