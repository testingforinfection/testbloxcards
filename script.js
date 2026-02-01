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
    const left = item.dataset.left || 0;
    const top = item.dataset.top || 0;
    item.style.left = left + 'px';
    item.style.top = top + 'px';

    const img = item.querySelector('img');
    const size = item.dataset.size || 300;
    img.style.width = size + 'px';

    observer.observe(item);

    if (item.dataset.card !== 'true') {
      img.addEventListener('click', () => {
        const link = item.dataset.link;
        if (link) window.open(link, '_blank');
      });
    }
  });

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

  const overlay = document.querySelector('.card-overlay');
  const popupImg = overlay.querySelector('.card-popup img');
  const popupText = overlay.querySelector('.card-text');

  scrollItems.forEach(item => {
    if (item.dataset.card === 'true') {
      const img = item.querySelector('img');
      img.addEventListener('click', e => {
        e.stopPropagation();
        popupImg.src = img.src;
        popupText.textContent = item.dataset.text || '';
        overlay.style.display = 'flex';
        popupImg.style.transform = 'translateX(-100vw)';
        popupText.style.transform = 'translateX(100vw)';

        requestAnimationFrame(() => {
          popupImg.style.transform = 'translateX(0)';
          popupText.style.transform = 'translateX(0)';
        });

        if (item.dataset.parallax === 'true') {
          if (popupImg.vanillaTilt) popupImg.vanillaTilt.destroy();
          VanillaTilt.init(popupImg, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.05,
            perspective: 800
          });
        }
      });
    }
  });

  overlay.addEventListener('click', () => {
    popupImg.style.transform = 'translateX(-100vw)';
    popupText.style.transform = 'translateX(100vw)';
    setTimeout(() => {
      overlay.style.display = 'none';
      popupImg.src = '';
      popupText.textContent = '';
    }, 300);
  });
});
