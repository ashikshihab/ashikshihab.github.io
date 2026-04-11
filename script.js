document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navContainer = document.querySelector(".container-nav");
  const header = document.querySelector("header");

  if (!navToggle || !navContainer || !header) return;

  navToggle.addEventListener("click", () => {
    navContainer.classList.toggle("nav-open");
  });

  const navLinks = navContainer.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("nav-open");
    });
  });

  const handleScroll = () => {
    if (window.scrollY > 200) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});
