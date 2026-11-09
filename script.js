/* ==========================================================================
   JAHIDUL ISLAM (SHANTO) — PORTFOLIO INTERACTIVITY & FUNNEL ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('shanto_portfolio_theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('shanto_portfolio_theme', next);
      updateThemeIcon(next);
      showToast(`Switched to ${next.charAt(0).toUpperCase() + next.slice(1)} Mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-clear-line';
  }

  // 2. Mobile Navigation Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('open') ? 'ri-close-line' : 'ri-menu-4-line';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'ri-menu-4-line';
      });
    });
  }

  // 3. Hero Portrait Switcher (Switch between Shanto's real photos)
  const heroMainPortrait = document.getElementById('heroMainPortrait');
  const portraitBtns = document.querySelectorAll('.portrait-thumb-btn');

  portraitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newSrc = btn.getAttribute('data-img');
      if (!newSrc || !heroMainPortrait) return;

      portraitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      heroMainPortrait.style.opacity = '0.35';
      setTimeout(() => {
        heroMainPortrait.src = newSrc;
        heroMainPortrait.style.opacity = '1';
      }, 140);
    });
  });

  // 4. Core Services Category Filter (08 Services)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-bento-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive Campaign & Funnel ROI Calculator (Khalid Farhan Style)
  const budgetSlider = document.getElementById('budgetSlider');
  const funnelSlider = document.getElementById('funnelSlider');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const funnelLevelDisplay = document.getElementById('funnelLevelDisplay');
  const estReach = document.getElementById('estReach');
  const estLeads = document.getElementById('estLeads');
  const estRoas = document.getElementById('estRoas');

  const funnelLabels = {
    1: 'Starter (Social + Basic Ads)',
    2: 'Growth (Landing Page + Paid Ads)',
    3: 'Full-Stack (Web + SEO + Ads)'
  };

  function updateRoiCalculator() {
    if (!budgetSlider || !funnelSlider) return;
    const budget = parseInt(budgetSlider.value, 10);
    const level = parseInt(funnelSlider.value, 10);

    budgetDisplay.textContent = `$${budget.toLocaleString()} / mo`;
    funnelLevelDisplay.textContent = funnelLabels[level] || funnelLabels[3];

    // Calculate realistic marketing & conversion projections
    const reachMultiplier = level === 1 ? 65 : level === 2 ? 80 : 95;
    const rawReach = Math.round((budget * reachMultiplier) / 1000);
    estReach.textContent = `${rawReach}K+`;

    const leadFactor = level === 1 ? 0.22 : level === 2 ? 0.30 : 0.38;
    const rawLeads = Math.max(15, Math.round(budget * leadFactor));
    estLeads.textContent = `${rawLeads.toLocaleString()}+`;

    const roasVal = level === 1 ? '2.4x ↑' : level === 2 ? '3.1x ↑' : '3.8x ↑';
    estRoas.textContent = roasVal;
  }

  if (budgetSlider && funnelSlider) {
    budgetSlider.addEventListener('input', updateRoiCalculator);
    funnelSlider.addEventListener('input', updateRoiCalculator);
    updateRoiCalculator();
  }

  // 6. Project Brief Form -> WhatsApp & Email Dispatcher
  const briefForm = document.getElementById('projectBriefForm');
  const sendEmailBtn = document.getElementById('sendEmailBtn');

  function getFormPayload() {
    const name = document.getElementById('clientName')?.value.trim() || 'Prospective Client';
    const contact = document.getElementById('clientContact')?.value.trim() || 'Not specified';
    const service = document.getElementById('serviceSelect')?.value || 'Digital Solutions';
    const message = document.getElementById('projectMessage')?.value.trim() || 'I would like to discuss a project.';
    return { name, contact, service, message };
  }

  if (briefForm) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { name, contact, service, message } = getFormPayload();
      const waText = `Hello Jahidul Islam (Shanto)! 👋\n\n*New Project Inquiry*\n• *Name:* ${name}\n• *Contact:* ${contact}\n• *Service Needed:* ${service}\n• *Project Details:* ${message}`;
      const waUrl = `https://wa.me/8801780962637?text=${encodeURIComponent(waText)}`;
      showToast('Opening WhatsApp with your project brief...');
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const { name, contact, service, message } = getFormPayload();
      if (!document.getElementById('clientName')?.value.trim()) {
        showToast('Please enter your name & project details first.');
        document.getElementById('clientName')?.focus();
        return;
      }
      const subject = `Project Inquiry: ${service} — from ${name}`;
      const body = `Hello Jahidul Islam (Shanto),\n\nI visited your portfolio and would love to work together.\n\nName: ${name}\nContact: ${contact}\nService Needed: ${service}\n\nProject Details:\n${message}\n\nBest regards,\n${name}`;
      window.location.href = `mailto:jahidulislam141611416@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast('Opening your email client...');
    });
  }

  // 7. Scroll Spy for Active Nav Link
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = 'home';
    const scrollY = window.scrollY + 140;

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  });

  // Toast Helper
  function showToast(text) {
    const toast = document.getElementById('toastMsg');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(window._shantoToastTimer);
    window._shantoToastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
