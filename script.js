// ===== Mobile Menu =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// ===== Sticky Nav =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('nav-scrolled', window.scrollY > 50);
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('active'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => observer.observe(el));

// ===== Typing Effect =====
const typingEl = document.getElementById('typingText');
const words = ['ذكية وعلاجية', 'متوازنة ومدروسة', 'صحية ومستدامة', 'طبيعية وآمنة'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingEl.innerHTML = currentWord.substring(0, charIndex - 1) + '<span class="typing-cursor"></span>';
    charIndex--;
  } else {
    typingEl.innerHTML = currentWord.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 2500; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 300;
  } else {
    typingSpeed = isDeleting ? 60 : 120;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ===== Cursor Glow Effect =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// ===== Floating Particles =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 4 + 3) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    container.appendChild(particle);
  }
}
createParticles();

// ===== BMI Calculator =====
document.getElementById('calcBtn').addEventListener('click', () => {
  const h = parseFloat(document.getElementById('height').value);
  const w = parseFloat(document.getElementById('weight').value);
  const result = document.getElementById('bmiResult');
  const valEl = document.getElementById('bmiValue');
  const catEl = document.getElementById('bmiCategory');
  const advEl = document.getElementById('bmiAdvice');

  if (!h || !w || h <= 0 || w <= 0) {
    alert('يرجى إدخال قيم صحيحة للطول والوزن');
    return;
  }

  const bmi = (w / ((h / 100) ** 2)).toFixed(1);
  let cat, color, advice;

  if (bmi < 18.5) {
    cat = 'نقص في الوزن'; color = '#3b82f6';
    advice = 'وزنك أقل من الطبيعي. برنامج غذائي متخصص يمكن أن يساعدك في الوصول للوزن الصحي بطريقة آمنة.';
  } else if (bmi < 25) {
    cat = 'وزن طبيعي'; color = '#22c55e';
    advice = 'تهانينا! وزنك في النطاق الصحي. استشارة غذائية ستساعدك في الحفاظ على هذا التوازن.';
  } else if (bmi < 30) {
    cat = 'زيادة في الوزن'; color = '#f59e0b';
    advice = 'لديك زيادة طفيفة في الوزن. برنامج غذائي مدروس سيساعدك في العودة للوزن المثالي.';
  } else {
    cat = 'سمنة'; color = '#ef4444';
    advice = 'مؤشر كتلة جسمك يشير للسمنة. استشارة طبية متخصصة ستساعدك في وضع خطة علاجية فعّالة.';
  }

  valEl.textContent = bmi;
  catEl.textContent = cat;
  catEl.style.color = color;
  advEl.textContent = advice;
  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ===== Testimonials Carousel =====
const track = document.getElementById('carouselTrack');
const slides = track.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;
let slidesPerView = 1;

function getSlidesPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function buildDots() {
  const totalDots = Math.max(1, slides.length - slidesPerView + 1);
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === currentIndex ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
}

function goTo(index) {
  const maxIndex = slides.length - slidesPerView;
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  const pct = (currentIndex * (100 / slidesPerView));
  track.style.transform = `translateX(${pct}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function initCarousel() {
  slidesPerView = getSlidesPerView();
  currentIndex = Math.min(currentIndex, slides.length - slidesPerView);
  buildDots();
  goTo(currentIndex);
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(currentIndex - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(currentIndex + 1));
window.addEventListener('resize', initCarousel);
initCarousel();

// Auto-slide
setInterval(() => {
  const maxIndex = slides.length - slidesPerView;
  goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
}, 5000);

// ===== Booking Form =====
document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const program = document.getElementById('program').value;

  if (!name || !phone || !program) {
    msg.className = 'text-center p-4 rounded-xl bg-red-50 text-red-600 border border-red-200';
    msg.textContent = 'يرجى ملء جميع الحقول المطلوبة';
    msg.classList.remove('hidden');
    return;
  }

  msg.className = 'text-center p-4 rounded-xl bg-green-50 text-green-700 border border-green-200';
  msg.innerHTML = '✅ تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.';
  msg.classList.remove('hidden');
  e.target.reset();

  setTimeout(() => msg.classList.add('hidden'), 5000);
});

// ===== Smooth Scroll for all anchors =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Parallax on Scroll =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroWrapper = document.querySelector('.hero-image-wrapper');
  if (heroWrapper && scrolled < window.innerHeight) {
    heroWrapper.style.transform = `translateY(${-15 + scrolled * 0.03}px)`;
  }
});
