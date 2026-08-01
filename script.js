document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navContainer = document.querySelector(".container-nav");
  const header = document.querySelector("header");

  if (!navToggle || !navContainer || !header) return;

  navToggle.addEventListener("click", () => {
    navContainer.classList.toggle("nav-open");
    const isOpen = navContainer.classList.contains("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  const navLinks = navContainer.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close nav on outside click
  document.addEventListener("click", (e) => {
    if (navContainer.classList.contains("nav-open") && !navContainer.contains(e.target) && !navToggle.contains(e.target)) {
      navContainer.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close nav on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navContainer.classList.contains("nav-open")) {
      navContainer.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
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

  // Copy to clipboard functionality
  const COPY_ICON_SVG = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
  const CHECK_ICON_SVG = '<polyline points="20 6 9 17 4 12"></polyline>';

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (!successful) throw new Error('execCommand failed');
      return Promise.resolve();
    } catch (err) {
      document.body.removeChild(textArea);
      return Promise.reject(err);
    }
  };

  const copyTextToClipboard = (text) => {
    if (!navigator.clipboard) {
      return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text);
  };

  const copyBtns = document.querySelectorAll('.js-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      // Prevent double-clicking
      if (btn.dataset.copying === "true") return;
      
      const email = btn.dataset.copy || 'ashikshihab101@gmail.com';
      const icon = btn.querySelector('.copy-icon');
      const textElem = btn.querySelector('.copy-text') || btn; // Footer buttons are just text
      
      const originalText = textElem.innerText;
      
      btn.dataset.copying = "true";

      try {
        await copyTextToClipboard(email);
        
        // Success
        textElem.innerText = 'Copied!';
        if (icon) icon.innerHTML = CHECK_ICON_SVG;
        
      } catch (err) {
        console.error('Failed to copy', err);
        // Fallback if everything fails
        textElem.innerText = 'Press Ctrl+C to copy';
        
        // Optionally show as selectable text for manual copy (not ideal for buttons, but okay temporarily)
        // btn.innerText = email; 
      }

      // Revert after 2 seconds
      setTimeout(() => {
        textElem.innerText = originalText;
        if (icon) icon.innerHTML = COPY_ICON_SVG;
        btn.dataset.copying = "false";
      }, 2000);
    });
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

  // 6. Lightbox for case study images
  const lightboxOverlay = document.createElement("div");
  lightboxOverlay.className = "lightbox-overlay";
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close full screen image">×</button>
    <img src="" alt="" />
  `;
  document.body.appendChild(lightboxOverlay);

  const lightboxImg = lightboxOverlay.querySelector("img");
  const closeBtn = lightboxOverlay.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightboxOverlay.classList.remove("active");
  };

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxOverlay.classList.add("active");
    closeBtn.focus();
  };

  document.querySelectorAll(".case-image-wrapper img").forEach(img => {
    // Make sure images have tabIndex for accessibility
    img.setAttribute("tabindex", "0");
    img.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img.src, img.alt);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
      closeLightbox();
    }
  });
});
