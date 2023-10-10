

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

/* suggestion list */
const searchInput = document.getElementById('search_bar');
const suggestionList = document.getElementById('suggestionList');

// List of words to suggest from
const words = [
    'Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang', 'Okhaldhunga', 'Panchthar', 'Sankhuwasabha',
    'Solukhumbu', 'Sunsari', 'Taplejung', 'Terhathum', 'Udayapur', 'Bara', 'Dhanusa', 'Mahottari', 'Parsa', 'Rautahat',
    'Saptari', 'Sarlahi', 'Siraha', 'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 'Kavrepalanchok',
    'Lalitpur', 'Makwanpur', 'Nuwakot', 'Ramechhap', 'Rasuwa', 'Sindhuli', 'Sindhupalchok', 'Gorkha', 'Kaski', 'Lamjung',
    'Manang', 'Mustang', 'Myagdi', 'Nawalparasi (Bardaghat Susta East)', 'Parbat', 'Syangja', 'Tanahu', 'Arghakhanchi',
    'Banke', 'Bardiya', 'Dang', 'Eastern Rukum', 'Gulmi', 'Kapilvastu', 'Palpa', 'Pyuthan', 'Rolpa', 'Rupandehi', 'Dolpa',
    'Humla', 'Jumla', 'Kalikot', 'Mugu', 'Salyan', 'Surkhet', 'Western Rukum', 'Achham', 'Baitadi', 'Bajhang', 'Bajura'
  ];

  searchInput.addEventListener('input', function () {
    const inputValue = this.value.toLowerCase();
    suggestionList.innerHTML = '';
    const filteredWords = words.filter(word => word.toLowerCase().startsWith(inputValue));
  
    if (filteredWords.length > 0) {
      suggestionList.style.display = 'block';
      filteredWords.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        suggestionList.appendChild(li);
  
        li.addEventListener('click', function () {
          searchInput.value = this.textContent;
          suggestionList.style.display = 'none';
        });
      });
    } else if (filteredWords.length === 0) {
      suggestionList.style.display = 'none';
    }
  });
  
  document.body.addEventListener('click', function (event) {
    if (
      event.target !== searchInput && 
      event.target !== suggestionList 
    ) {
      suggestionList.style.display = 'none';
    }
  });
  
  searchInput.addEventListener('blur', function () {
    suggestionList.style.display = 'none';
  });
  
  if (searchInput !== document.activeElement) {
    suggestionList.style.display = 'none';
  }





