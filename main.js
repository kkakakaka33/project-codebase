// =============================================
//   Good Space LP — main.js
// =============================================

const nav = document.getElementById('nav');

const handleNavScroll = () => {
  if (window.scrollY > 30) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } catch (err) {}
  });
});

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    // FormSubmitに実際の送信を任せる（e.preventDefault()は不要）
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;
  });
}

const numberEls = document.querySelectorAll('.gs-numbers__val');
const numObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        numObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

numberEls.forEach((el) => numObserver.observe(el));

function animateNumber(el) {
  const small = el.querySelector('small');
  const smallText = small ? small.textContent : '';
  const numText = el.textContent.replace(smallText, '').trim();
  const target = parseFloat(numText);
  if (isNaN(target)) return;

  const isDecimal = numText.includes('.');
  const duration = 1200;
  const start = performance.now();

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    const display = isDecimal ? current.toFixed(1) : Math.floor(current);
    el.childNodes[0].textContent = display;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// ---- Service Carousel ----
(function () {
  const carousel = document.getElementById('serviceCarousel');
  if (!carousel) return;

  const pills = carousel.querySelectorAll('.gs-carousel__pill');
  const cards = carousel.querySelectorAll('.gs-carousel__card');
  const total = pills.length;
  let current = 0;
  let isPaused = false;
  let interval;

  function getCircularOffset(i, index, total) {
    let offset = i - index;
    const half = Math.floor(total / 2);
    if (offset > half) offset -= total;
    if (offset < -half) offset += total;
    return offset;
  }

  function getPillStep() {
    const firstPill = pills[0];
    if (!firstPill) return 64;
    return firstPill.offsetHeight + 12;
  }

  function positionPills(index) {
    const pillsContainer = carousel.querySelector('.gs-carousel__pills');
    if (!pillsContainer) return;
    const containerH = pillsContainer.offsetHeight;
    const centerY = containerH / 2;
    const step = getPillStep();

    pills.forEach((pill, i) => {
      const offset = getCircularOffset(i, index, total);
      const y = centerY + offset * step;
      pill.style.top = y + 'px';

      const dist = Math.abs(offset);
      if (dist >= 3) {
        pill.style.opacity = '0';
      } else if (dist === 2) {
        pill.style.opacity = '0.3';
      } else if (dist === 1) {
        pill.style.opacity = '0.6';
      } else {
        pill.style.opacity = '1';
      }

      const scale = dist === 0 ? 1 : Math.max(0.8, 1 - dist * 0.08);
      pill.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
    });
  }

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { positionPills(current); }, 100);
  });

  function setActive(index) {
    const prev = ((index - 1) + total) % total;
    const next = (index + 1) % total;

    pills.forEach((pill, i) => {
      pill.classList.toggle('gs-carousel__pill--active', i === index);
    });

    cards.forEach((card, i) => {
      card.classList.remove('gs-carousel__card--active', 'gs-carousel__card--prev', 'gs-carousel__card--next');
      if (i === index) {
        card.classList.add('gs-carousel__card--active');
      } else if (i === prev) {
        card.classList.add('gs-carousel__card--prev');
      } else if (i === next) {
        card.classList.add('gs-carousel__card--next');
      }
    });

    positionPills(index);
    current = index;
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      setActive(parseInt(pill.dataset.index, 10));
    });
    pill.addEventListener('mouseenter', () => { isPaused = true; });
    pill.addEventListener('mouseleave', () => { isPaused = false; });
  });

  const rightPanel = carousel.querySelector('.gs-carousel__right');
  if (rightPanel) {
    rightPanel.addEventListener('mouseenter', () => { isPaused = true; });
    rightPanel.addEventListener('mouseleave', () => { isPaused = false; });
  }

  function startAutoPlay() {
    interval = setInterval(() => {
      if (!isPaused) {
        setActive((current + 1) % total);
      }
    }, 3000);
  }

  setActive(0);
  startAutoPlay();
})();