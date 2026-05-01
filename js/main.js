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
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2 // trigger when 20% is visible
  });

  sections.forEach(section => {
    observer.observe(section);

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.1}s`;
  });
}

// DROPDOWN MENU

// SECTION SORTING

// CONTACT FORM REDIRECT

// COUNTDOWN
