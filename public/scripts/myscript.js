

document.getElementById("toggleButton").addEventListener("click", function() {
    var notificationPanel = document.getElementById("notification_panel");
    if (notificationPanel.classList.contains("hidden")) {
        notificationPanel.classList.remove("hidden");
        notificationPanel.style.right = "0"; 
    } else {
        notificationPanel.classList.add("hidden");
        notificationPanel.style.right = "-350px"; 
    }
});

/* for nav animation */
const navbar = document.querySelector('.navbar');
const intermediateContainer = document.querySelector('.Container_for_datacard');
let prevScrollPos = window.pageYOffset;
let isNavbarHidden = false;
/* ---------------- */

window.addEventListener("scroll", function() {
    var notificationPanel = document.getElementById("notification_panel");
    notificationPanel.classList.add("hidden");
    notificationPanel.style.right = "-350px";

    /* for nav bar animation */
    const currentScrollPos = window.pageYOffset;
  
    if (currentScrollPos > intermediateContainer.offsetTop) {
      if (!isNavbarHidden) {
        navbar.style.transform = 'scale(0)';
        dropDownMenu.style.transform = 'scale(0)';
        isNavbarHidden = true;
      }
    } else {
      if (isNavbarHidden) {
        navbar.style.transform = 'scale(1)';
        dropDownMenu.style.transform = 'scale(1)';
        isNavbarHidden = false;
      }
    }
  
    if (currentScrollPos < prevScrollPos) {
      navbar.style.transform = 'scale(1)';
      dropDownMenu.style.transform = 'scale(1)';
      isNavbarHidden = false;
    }
  
    prevScrollPos = currentScrollPos;
  }
);

