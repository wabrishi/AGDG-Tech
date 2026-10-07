// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Highlight the current page in the nav
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((a) => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Portfolio filters
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('[data-category]').forEach((item) => {
      item.style.display = f === 'all' || item.dataset.category === f ? '' : 'none';
    });
  });
});

// Contact form (static site: opens the visitor's mail client)
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const body = `Name: ${d.get('name')}\nEmail: ${d.get('email')}\nCompany: ${d.get('company')}\nService: ${d.get('service')}\nBudget: ${d.get('budget')}\n\n${d.get('message')}`;
    location.href = `mailto:info@agdgtech.com?subject=${encodeURIComponent('Project enquiry from ' + d.get('name'))}&body=${encodeURIComponent(body)}`;
    document.querySelector('.form-status').textContent = 'Thanks! Your email app should open to send the message.';
    form.reset();
  });
}

// Footer year
document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });
