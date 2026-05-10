const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  function animRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a, button, .skill-card, .project-card, .about-card, .ai-tech, .cert-card, .cert-img-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width='56px'; ring.style.height='56px'; ring.style.borderColor='var(--cyan)'; });
    el.addEventListener('mouseleave', () => { ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='var(--blue)'; });
  });
}

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== SCROLL PROGRESS ===== */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ===== BACK TO TOP ===== */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');
const revObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => revObserver.observe(el));

/* ===== ACTIVE NAV ===== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cyan)' : '';
  });
}, { passive: true });

/* ===== COUNTER ANIMATION ===== */
const counters = document.querySelectorAll('.stat-num[data-target]');
let animated = false;
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const counterObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      counters.forEach(el => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const isDecimal = el.dataset.decimal;
        let count = 0;
        const inc = target / 50;
        const timer = setInterval(() => {
          count = Math.min(count + inc, target);
          const display = isDecimal ? count.toFixed(1) : Math.floor(count);
          el.innerHTML = display + '<span style="font-size:1.2rem">' + suffix + '</span>';
          if (count >= target) clearInterval(timer);
        }, 30);
      });
    }
  }, { threshold: 0.4 });
  counterObserver.observe(heroStats);
}

/* ===== CERTIFICATE LIGHTBOX ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.cert-img-wrap').forEach(wrap => {
  wrap.addEventListener('click', () => {
    const img = wrap.querySelector('.cert-img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ===== CONTACT FORM — sends real email via mailto ===== */
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const nameInput  = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const msgInput   = document.getElementById('formMsg');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
      sendBtn.querySelector('span').textContent = 'Please fill all fields';
      sendBtn.style.background = 'rgba(255,100,100,0.3)';
      setTimeout(() => {
        sendBtn.querySelector('span').textContent = 'Send Message →';
        sendBtn.style.background = '';
      }, 2000);
      return;
    }

    // Build mailto link with form values
    const subject = encodeURIComponent('Portfolio Contact from ' + nameInput.value.trim());
    const body    = encodeURIComponent(
      'Name: ' + nameInput.value.trim() + '\n' +
      'Email: ' + emailInput.value.trim() + '\n\n' +
      msgInput.value.trim()
    );
    const mailtoURL = 'mailto:sanjaykumargunasekaran@gmail.com?subject=' + subject + '&body=' + body;

    // Open the mailto link in the mail client
    window.location.href = mailtoURL;

    // Show success feedback
    sendBtn.querySelector('span').textContent = 'Opening Mail Client ✓';
    sendBtn.style.background = 'var(--accent)';
    sendBtn.style.color = 'var(--bg)';
    setTimeout(() => {
      sendBtn.querySelector('span').textContent = 'Send Message →';
      sendBtn.style.background = '';
      sendBtn.style.color = '';
      nameInput.value = ''; emailInput.value = ''; msgInput.value = '';
    }, 3000);
  });
}

/* ===== FOOTER EMAIL BUTTON ===== */
const footerMailBtn = document.getElementById('footerMailBtn');
if (footerMailBtn) {
  // Clicking the footer Email Me button opens a pre-filled mailto
  footerMailBtn.addEventListener('click', e => {
    // Check if the contact form has any pre-filled data to carry forward
    const nameInput  = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const msgInput   = document.getElementById('formMsg');
    const hasFormData = nameInput && nameInput.value.trim();

    if (hasFormData) {
      e.preventDefault();
      const subject = encodeURIComponent('Portfolio Contact from ' + nameInput.value.trim());
      const body    = encodeURIComponent(
        'Name: ' + nameInput.value.trim() + '\n' +
        'Email: ' + (emailInput ? emailInput.value.trim() : '') + '\n\n' +
        (msgInput ? msgInput.value.trim() : '')
      );
      window.location.href = 'mailto:sanjaykumargunasekaran@gmail.com?subject=' + subject + '&body=' + body;
    }
    // If no form data, the default href="mailto:..." on the anchor handles it naturally
  });
}
