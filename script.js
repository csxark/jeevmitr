function openTab(tabName, event) {
  var i, tabContent, tabButtons;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove("active");
  }

  tabButtons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  event.currentTarget.classList.add("active");
}

// Menu Toggle
function toggleMenu() {
    const menuDropdown = document.querySelector('.menu-dropdown');
    menuDropdown.classList.toggle('active');

    // Close other dropdowns
    document.querySelector('.auth-dropdown')?.classList.remove('active');
    document.querySelector('.profile-menu')?.classList.remove('active');

    // Click outside to close
    document.addEventListener('click', function closeMenu(e) {
        if (!e.target.closest('.menu-container')) {
            menuDropdown.classList.remove('active');
            document.removeEventListener('click', closeMenu);
        }
    });
}

// Auth Form Toggle
function toggleAuthForm() {
    const authDropdown = document.querySelector('.auth-dropdown');
    authDropdown.classList.toggle('active');

    // Close other dropdowns
    document.querySelector('.menu-dropdown')?.classList.remove('active');
    document.querySelector('.profile-menu')?.classList.remove('active');

    // Click outside to close
    document.addEventListener('click', function closeAuth(e) {
        if (!e.target.closest('.auth-container')) {
            authDropdown.classList.remove('active');
            document.removeEventListener('click', closeAuth);
        }
    });
}

// Toggle between Login and Signup forms
function toggleAuthMode() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
    }
}

// Handle Authentication
function handleAuth(event, type) {
    event.preventDefault();
    
    // Here you would typically make an API call to your backend
    // For demo purposes, we'll just show the profile dropdown
    document.querySelector('.auth-dropdown').classList.remove('active');
    document.getElementById('authButton').style.display = 'none';
    document.getElementById('profileDropdown').style.display = 'block';
}

// Profile Menu Toggle
function toggleProfileMenu() {
    const profileMenu = document.querySelector('.profile-menu');
    profileMenu.classList.toggle('active');

    // Close other dropdowns
    document.querySelector('.menu-dropdown')?.classList.remove('active');
    document.querySelector('.auth-dropdown')?.classList.remove('active');

    // Click outside to close
    document.addEventListener('click', function closeProfile(e) {
        if (!e.target.closest('.profile-dropdown')) {
            profileMenu.classList.remove('active');
            document.removeEventListener('click', closeProfile);
        }
    });
}

// Handle Logout
function handleLogout() {
    // Here you would typically make an API call to your backend
    document.getElementById('profileDropdown').style.display = 'none';
    document.getElementById('authButton').style.display = 'block';
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.menu-container, .auth-container, .profile-dropdown')) {
        document.querySelector('.menu-dropdown')?.classList.remove('active');
        document.querySelector('.auth-dropdown')?.classList.remove('active');
        document.querySelector('.profile-menu')?.classList.remove('active');
    }
});
