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
function doDropdown(order) {
  // Remember order on client side
  window.onload = () => {
    const saved = localStorage.getItem("sortOrder") || "newest";
    sortSections(saved);
  };
  
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
    const sections = Array.from(document.querySelectorAll(".section"));
  
    if (sections.length === 0) return;
  
    const parent = sections[0].parentElement;
  
    sections.sort((a, b) => {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);
  
      return order === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  
    sections.forEach(section => parent.appendChild(section));
  
    localStorage.setItem("sortOrder", order);
  
    // update dropdown label
    const label = document.getElementById("sort-label");
    if (label) {
      label.textContent =
        order === "newest"
          ? "Sort: Newest"
          : "Sort: Chronological";
    }
  }
  
// CONTACT FORM REDIRECT
function formRedirect {
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
function closeBanner {
  
  const banner = document.getElementById("announcement-banner");
  const closeBtn = document.getElementById("banner-close");
  
  closeBtn.addEventListener("click", () => {
    banner.classList.add("fade-out");
  });
}
  
// COUNTDOWN
