// NAVBAR + FOOTER LOADING
function loadPartials() {
  fetch('/navbar.html')
    .then(res => res.text())
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
    });

  fetch("/footer.html")
    .then(res => res.text())
    .then(data => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = data;
    });
}

// SECTION FADE-IN

// DROPDOWN MENU

// SECTION SORTING

// CONTACT FORM REDIRECT

// COUNTDOWN
