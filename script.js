const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('mobile-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('mobile-open');
  });
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button');
  button.textContent = 'Mensagem enviada ✓';
  button.disabled = true;
});

const revealItems = document.querySelectorAll('.video-story, .story-grid, .menu-cards, .experience-grid, .gallery, .contact-grid, .faq-grid');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const galleryMedia = [...document.querySelectorAll('.gallery img, .gallery video')];
let activeMedia = 0;

const showLightboxMedia = (index) => {
  activeMedia = (index + galleryMedia.length) % galleryMedia.length;
  const media = galleryMedia[activeMedia];
  lightboxContent.replaceChildren();
  const preview = media.tagName === 'VIDEO' ? document.createElement('video') : document.createElement('img');
  preview.src = media.currentSrc || media.src || media.querySelector('source')?.src;
  preview.alt = media.alt || 'Pré-visualização do Tapas nas Costas';
  if (preview.tagName === 'VIDEO') {
    preview.controls = true;
    preview.autoplay = true;
    preview.playsInline = true;
  }
  lightboxContent.append(preview);
  lightboxCaption.textContent = media.alt || 'Tapas nas Costas';
};

galleryMedia.forEach((media, index) => media.addEventListener('click', () => {
  showLightboxMedia(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}));

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lightboxContent.replaceChildren();
};

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => showLightboxMedia(activeMedia - 1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => showLightboxMedia(activeMedia + 1));
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showLightboxMedia(activeMedia - 1);
  if (event.key === 'ArrowRight') showLightboxMedia(activeMedia + 1);
});
