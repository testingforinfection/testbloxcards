const scrollItems = document.querySelectorAll('.scroll-item');

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

scrollItems.forEach(item => {
  // Set container left/top from data attributes
  const left = item.dataset.left || 0;
  const top = item.dataset.top || 0;
  item.style.left = left + "px";
  item.style.top = top + "px";

  // Set image width from data-size
  const img = item.querySelector('img');
  const size = item.dataset.size || 300;
  img.style.width = size + "px";

  // Observe for fade-in
  observer.observe(item);

  // Clickable links for non-card images
  if(item.dataset.card !== "true") {
    img.addEventListener('click', () => {
      const link = item.dataset.link;
      if(link) window.open(link, "_blank");
    });
  }
});


scrollItems.forEach(item => {
  const img = item.querySelector('img');
  if(item.dataset.parallax === "true") {
    VanillaTilt.init(img, {
      max: 15,           // max tilt rotation
      speed: 400,        // animation speed
      glare: true,       // shiny glare effect
      "max-glare": 0.3,
      scale: 1.05,       // slight zoom
      perspective: 800   // 3D perspective distance
    });
  }
});


const overlay = document.createElement('div');
overlay.className = 'card-overlay';
document.body.appendChild(overlay);

const popup = document.createElement('div');
popup.className = 'card-popup';
overlay.appendChild(popup);

const popupImg = document.createElement('img');
popup.appendChild(popupImg);

const popupText = document.createElement('div');
popupText.className = 'card-text';
popup.appendChild(popupText);

scrollItems.forEach(item => {
  if(item.dataset.card === "true") {
    const img = item.querySelector('img');
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      // Set image and text
      popupImg.src = img.s
