// NAVBAR LOADING
function loadNavbar() {
  fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
      const placeholder = document.getElementById('navbar-placeholder');
      placeholder.innerHTML = data;
  
      const toggle = document.getElementById("menu-toggle");
      const nav = document.getElementById("nav-links");
  
      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          nav.classList.toggle("active");
        });
      }
    })
    .catch(error => console.error('Error loading navbar:', error));
}

// FOOTER LOADING
function loadFooter() {
  fetch("/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
}

// SECTION FADE-IN
function fadeSections() {
  const sections = document.querySelectorAll('.fade-section');
  if (!sections.length) return;

  // Step 1: prepare elements (hide them)
  sections.forEach((section, index) => {
    section.classList.add('fade-init');
    section.style.transitionDelay = `${index * 0.1}s`;
  });

  // Step 2: observe
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // optional: only animate once
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
}

// DROPDOWN MENU
function initDropdown(order) {
  
  const dropdown = document.getElementById("sort-dropdown");
  const label = document.getElementById("sort-label");
  
  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }
  
  label.addEventListener("click", (e) => {
    if (!isMobile()) return; // ignore desktop
  
    e.preventDefault();
    dropdown.classList.toggle("open");
  });
}
                   
// SECTION SORTING
function sortSections(order) {
  const container = document.getElementById("sections-container");
  if (!container) return;

  const sections = Array.from(container.querySelectorAll(".section[data-date]"));
  if (sections.length === 0) return;

  sections.sort((a, b) => {
    const dateA = new Date(a.dataset.date);
    const dateB = new Date(b.dataset.date);

    return order === "newest"
      ? dateB - dateA
      : dateA - dateB;
  });

  sections.forEach(section => container.appendChild(section));

  localStorage.setItem("sortOrder", order);

  const label = document.getElementById("sort-label");
  if (label) {
    label.textContent =
      order === "newest"
        ? "Sort: Newest"
        : "Sort: Chronological";
  }
}

// WRAP SECTIONS IF TEXT IS MUCH TALLER THAN IMAGE
function wrapSections() {

  const sections = document.querySelectorAll('.section.wrap');

  if (!sections.length) return;

  function updateWrapSections() {

    // disable wrapped mode on mobile
    if (window.innerWidth <= 768) {

      sections.forEach(section => {
        section.classList.remove('needs-wrap');
      });

      return;
    }

    sections.forEach(section => {

      const img = section.querySelector('img');
      const text = section.querySelector('.section-text');

      if (!img || !text) return;

      // reset before measuring
      section.classList.remove('needs-wrap');
      
      const imageHeight = img.getBoundingClientRect().height;
      const textHeight = text.scrollHeight;

      // amount text must exceed image by
      let lineHeight = parseFloat(getComputedStyle(text).lineHeight);
      if (isNaN(lineHeight)) {
        lineHeight =
          parseFloat(getComputedStyle(text).fontSize) * 1.6;
      }
      const maxAllowedOverflow = lineHeight * 3; // allow ~3 extra lines
      
      if (textHeight - imageHeight > maxAllowedOverflow) {
        section.classList.add('needs-wrap');
      }
    });
  }

  // initial run
  updateWrapSections();

  // resize updates
  window.addEventListener('resize', updateWrapSections);

  // image load updates
  sections.forEach(section => {

    const img = section.querySelector('img');
    
    if (img) {
      img.addEventListener('load', updateWrapSections);
    }
  
  });
  
  window.addEventListener('load', updateWrapSections);
}

// CONTACT FORM REDIRECT
function formRedirect() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop redirect

    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.innerHTML = "Thanks for your message!";
      form.reset();
    } else {
      status.innerHTML = "Oops! Something went wrong. Please reload the page and try again.";
    }
  });
}

// CLOSE BANNER
function closeBanner() {
  
  const banner = document.getElementById("announcement-banner");
  const closeBtn = document.getElementById("banner-close");
  
  closeBtn.addEventListener("click", () => {
    banner.classList.add("fade-out");
  });
}
  
// COUNTDOWN
function doCountdown() {

  const targetDate = new Date("August 4, 2026 07:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    let countdownText = "";

    if (distance <= 0) {
      countdownText = "Started!";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      countdownText =
        `${days} DAYS • ${hours} HOURS • ${minutes} MIN • ${seconds} SEC`;
    }

    document.querySelectorAll(".countdown").forEach(el => {
      el.innerHTML = countdownText;
    });
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// INITIALIZE EVERYTHING
document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadFooter();

  if (document.querySelector('.section')) fadeSections();
  if (document.querySelector('.section.wrap')) wrapSections();
  if (document.querySelector('#sort-dropdown')) initDropdown();
  if (document.querySelector('#contact-form')) formRedirect();
  if (document.querySelector('#announcement-banner')) closeBanner();
  if (document.querySelector('.countdown')) doCountdown();

  const saved = localStorage.getItem("sortOrder") || "newest";
  if (document.querySelector(".section[data-date]")) {
    sortSections(saved);
  }
});
