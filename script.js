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



  // Clarity Smart Events Tracking
  const trackEvent = (name) => {
    if (typeof clarity === "function") {
      clarity("event", name);
    }
  };

  // 3. Track Mail clicks & Copy actions
  const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
  mailLinks.forEach(link => {
    link.addEventListener("click", () => trackEvent("mail_click"));
  });

  const mailCopyButtons = document.querySelectorAll('button[aria-label="Copy Email"]');
  mailCopyButtons.forEach(btn => {
    btn.addEventListener("click", () => trackEvent("mail_click"));
  });

  // 4. Track LinkedIn clicks in "Let's Connect" section
  const connectSection = document.getElementById("connect");
  if (connectSection) {
    const linkedinLinks = connectSection.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener("click", () => trackEvent("connect_linkedin_click"));
    });
  }

  // 5. Track View Resume CTAs
  const resumeLinks = document.querySelectorAll('a[href*="Ashik_Shihab.pdf"]');
  resumeLinks.forEach(link => {
    link.addEventListener("click", () => trackEvent("resume_cta_click"));
  });
});
