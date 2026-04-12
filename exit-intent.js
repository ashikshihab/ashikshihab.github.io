document.addEventListener("DOMContentLoaded", () => {
  const exitPopup = document.getElementById("exit-popup");
  const closeBtn = document.getElementById("close-exit-popup");
  
  if (!exitPopup || !closeBtn) return;

  // Check if we've already shown the popup this session
  const hasShown = sessionStorage.getItem("exitIntentShown");
  
  // Ensure we only show on desktop devices (width > 768px)
  const isDesktop = () => window.innerWidth > 768;

  const showPopup = () => {
    if (!sessionStorage.getItem("exitIntentShown") && isDesktop()) {
      exitPopup.classList.add("show");
      sessionStorage.setItem("exitIntentShown", "true"); 
      
      // Clarity: Track popup opening
      if (typeof clarity === "function") {
        clarity("event", "popup_opened");
      }
    }
  };

  // Trigger when cursor leaves the top of the browser window
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0) {
      showPopup();
    }
  });

  // Track LinkedIn clicks on popup
  const popupLinkedin = exitPopup.querySelector(".btn-simple-linkedin");
  if (popupLinkedin) {
    popupLinkedin.addEventListener("click", () => {
        if (typeof clarity === "function") {
            clarity("event", "popup_linkedin_click");
        }
    });
  }

  // Close functionality
  const closePopup = () => {
    exitPopup.classList.remove("show");
  };

  closeBtn.addEventListener("click", closePopup);
  
  // Close if clicking outside the popup modal container
  exitPopup.addEventListener("click", (e) => {
    if (e.target === exitPopup) {
      closePopup();
    }
  });
});
