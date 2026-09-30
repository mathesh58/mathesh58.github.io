document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  const body = document.body;

  // Mobile navigation
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.classList.toggle("active", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      body.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

  // Smooth scrolling with fixed-header offset
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // Active navigation
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav a")];

  const updateActiveNav = () => {
    let current = "home";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 220) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // Artwork filtering
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".art-card");

  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      filters.forEach(item => item.classList.remove("active"));
      filter.classList.add("active");

      const category = filter.dataset.filter;

      cards.forEach(card => {
        const match = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !match);
      });
    });
  });

  // Artwork lightbox
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxType = document.querySelector(".lightbox-type");
  const lightboxDescription = document.querySelector(".lightbox-description");
  const closeButton = document.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("menu-open");
  };

  document.querySelectorAll(".art-open").forEach(button => {
    button.addEventListener("click", () => {
      const image = button.dataset.image;
      const title = button.dataset.title;
      const type = button.dataset.type;
      const description = button.dataset.description;

      lightboxImage.src = image;
      lightboxImage.alt = title;
      lightboxTitle.textContent = title;
      lightboxType.textContent = type;
      lightboxDescription.textContent = description;

      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("menu-open");
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Cursor glow on desktop
  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }

  // Dynamic year
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Subtle hero parallax
  const heroArt = document.querySelector(".hero-art img");

  if (heroArt && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 5;
      heroArt.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});
