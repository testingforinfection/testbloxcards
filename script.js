document.addEventListener('DOMContentLoaded', () => {
  const scrollItems = document.querySelectorAll('.scroll-item');

  // Fade-in on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  scrollItems.forEach(item => {
    // Set left/top from data attributes
    const left = item.dataset.left || 0;
    const top = item.dataset.top || 0;
    item.style.left = left + 'px';
    item.style.top = top + 'px';

    // Set image width from data-size
    const img = item.querySelector('img');
    const size = item.dataset.size || 300;
    img.style.width = size + 'px';

    // Observe for fade-in
    observer.observe(item);

    // Clickable links for non-card images
    if (item.dataset.card !== 'true') {
      img.addEventListener('click', () => {
        const link = item.dataset.link;
        if (link) window.open(link, '_blank');
      });
    }
  });

  // Vanilla Tilt 3D Parallax for items with data-parallax="true"
  scrollItems.forEach(item => {
    if (item.dataset.parallax === 'true') {
      const img = item.querySelector('img');
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

  // Card popup elements
  const overlay = document.querySelector('.card-overlay');
  const popupImg = overlay.querySelector('.card-popup img');
  const popupText = overlay.querySelector('.card-text');

  // Card click functionality
  scrollItems.forEach(item => {
    if (item.dataset.card === 'true') {
      const img = item.querySelector('img');
      img.addEventListener('click', e => {
        e.stopPropagation();
        popupImg.src = img.src;
        popupText.textContent = item.dataset.text || '';
        overlay.style.display = 'flex';

        // Slide-in animation from sides
        popupImg.style.transform = 'translateX(-100vw)';
        popupText.style.transform = 'translateX(100vw)';

        requestAnimationFrame(() => {
          popupImg.style.transform = 'translateX(0)';
          popupText.style.transform = 'translateX(0)';
        });
      });
    }
  });

  // Click overlay to close popup
  overlay.addEventListener('click', () => {
    // Slide out
    popupImg.style.transform = 'translateX(-100vw)';
    popupText.style.transform = 'translateX(100vw)';

    // Hide overlay after animation
    setTimeout(() => {
      overlay.style.display = 'none';
      popupImg.src = '';
      popupText.textContent = '';
    }, 300);
  });
});
