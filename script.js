document.addEventListener('DOMContentLoaded', () => {
  const scrollItems = document.querySelectorAll('.scroll-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  scrollItems.forEach(item => {
    const left = parseInt(item.dataset.left || 0, 10);
    const top = parseInt(item.dataset.top || 0, 10);

    item.style.left = left + 'px';
    item.style.top = top + 'px';

    const img = item.querySelector('img');
    const size = parseInt(item.dataset.size || 300, 10);
    img.style.width = size + 'px';

    observer.observe(item);

    img.addEventListener('click', () => {
      const link = item.dataset.link;
      if (link) window.open(link, '_blank');
    });

    if (item.dataset.parallax === 'true') {
      VanillaTilt.init(img, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
        perspective: 800
      });
    }
  });
});
