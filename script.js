document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId !== "#") {
        const target = document.querySelector(targetId);

        if (target) {
          event.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // Add a small system-style active state to navigation
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  };

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // Portfolio system status
  const status = document.querySelector(".system-status");

  if (status) {
    status.textContent = "CREATIVE SYSTEM ACTIVE";
  }

  // Current year
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
