VanillaTilt.init(document.querySelectorAll(".scroll-item img"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

document.querySelectorAll('.scroll-item img').forEach(img => {
  img.addEventListener('click', () => {
    const link = img.dataset.link;
    if(link) window.open(link, '_blank'); // opens the link
  });
});

const scrollItems = document.querySelectorAll('.scroll-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

scrollItems.forEach(item => observer.observe(item));
