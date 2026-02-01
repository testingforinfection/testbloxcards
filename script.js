// Fade-in on scroll
const scrollItems = document.querySelectorAll('.scroll-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

scrollItems.forEach(item => {
  // Set initial left/top from data attributes
  const left = item.dataset.left || 0;
  const top = item.dataset.top || 0;
  item.style.left = left + "px";
  item.style.top = top + "px";

  observer.observe(item);
});

// Click to open link
scrollItems.forEach(item => {
  item.addEventListener('click', () => {
    const link = item.dataset.link;
    if(link) window.open(link, "_blank");
  });
});

// Parallax effect (away from cursor) for selected items
document.addEventListener('mousemove', e => {
  scrollItems.forEach(item => {
    if(item.dataset.parallax === "true") {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width/2;
      const centerY = rect.top + rect.height/2;

      const moveX = (centerX - e.clientX) * 0.03; // negative: moves away
      const moveY = (centerY - e.clientY) * 0.03;

      item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });
});
