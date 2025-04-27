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

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('active');
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

// Close sidebar when clicking outside or on overlay
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
});

// Profile menu toggle
function toggleProfileMenu() {
    const profileMenu = document.querySelector('.profile-menu');
    profileMenu.classList.toggle('active');
}

// Handle logout
function handleLogout() {
    // Add logout logic here
    alert('Logging out...');
    window.location.href = 'index.html';
}

// Close profile menu when clicking outside
document.addEventListener('click', function(event) {
    const profileMenu = document.querySelector('.profile-menu');
    const profileButton = document.querySelector('.profile-button');
    
    if (!profileMenu.contains(event.target) && !profileButton.contains(event.target) && profileMenu.classList.contains('active')) {
        profileMenu.classList.remove('active');
    }
});
// Pricing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billingToggle');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            document.querySelectorAll('.amount').forEach(amount => {
                if (this.checked) {
                    // Yearly billing
                    if (amount.classList.contains('yearly')) {
                        amount.style.display = 'inline';
                    } else {
                        amount.style.display = 'none';
                    }
                    toggleOptions[1].classList.add('active');
                    toggleOptions[0].classList.remove('active');
                } else {
                    // Monthly billing
                    if (amount.classList.contains('monthly')) {
                        amount.style.display = 'inline';
                    } else {
                        amount.style.display = 'none';
                    }
                    toggleOptions[0].classList.add('active');
                    toggleOptions[1].classList.remove('active');
                }
            });
        });
    }
    
    // Initialize toggle option classes
    toggleOptions[0].classList.add('active');
    
    // Subscription button click handlers
    const subscribeButtons = document.querySelectorAll('.subscribe-btn');
    if (subscribeButtons.length > 0) {
        subscribeButtons.forEach(button => {
            button.addEventListener('click', function() {
                openCheckoutModal(this.dataset.plan, this.dataset.type);
            });
        });
    }
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModals);
        });
    }
    
    // Confirm subscription button
    const confirmButton = document.getElementById('confirmSubscription');
    if (confirmButton) {
        confirmButton.addEventListener('click', handleSubscriptionConfirmation);
    }
    
    // Close success modal button
    const closeSuccessButton = document.querySelector('.close-success');
    if (closeSuccessButton) {
        closeSuccessButton.addEventListener('click', closeModals);
    }
});

// Modal functions
function openCheckoutModal(plan, type) {
    // Set current date
    const today = new Date();
    document.getElementById('currentDate').textContent = today.toLocaleDateString();
    
    // Format plan name
    let planName = formatPlanName(plan);
    document.getElementById('planName').textContent = planName;
    
    // Set billing cycle
    const billingToggle = document.getElementById('billingToggle');
    const billingCycle = billingToggle.checked ? 'Yearly' : 'Monthly';
    document.getElementById('billingCycle').textContent = billingCycle;
    
    // Set price based on plan and billing cycle
    const price = getPlanPrice(plan, billingToggle.checked);
    document.getElementById('planPrice').textContent = `₹${price}`;
    
    // Show modal
    document.getElementById('checkoutModal').classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}

function handleSubscriptionConfirmation() {
    // Basic validation
    const petName = document.getElementById('petName').value;
    const petType = document.getElementById('petType').value;
    const termsAgreed = document.getElementById('termsAgree').checked;
    
    if (!petName || !petType || !termsAgreed) {
        alert('Please fill in all required fields and agree to the terms and conditions.');
        return;
    }
    
    // Close checkout modal
    document.getElementById('checkoutModal').classList.remove('active');
    
    // Set success modal details
    document.getElementById('successPlanName').textContent = document.getElementById('planName').textContent;
    document.getElementById('successBillingCycle').textContent = document.getElementById('billingCycle').textContent;
    
    // Show success modal
    document.getElementById('successModal').classList.add('active');
}

// Helper functions
function formatPlanName(plan) {
    return plan
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getPlanPrice(plan, isYearly) {
    const prices = {
        'grooming': { monthly: '699', yearly: '7,499' },
        'training': { monthly: '999', yearly: '10,999' },
        'veterinary': { monthly: '1,199', yearly: '12,999' },
        'basic-combo': { monthly: '2,499', yearly: '26,999' },
        'premium-combo': { monthly: '3,499', yearly: '36,999' }
    };
    
    if (prices[plan]) {
        return isYearly ? prices[plan].yearly : prices[plan].monthly;
    }
    
    return isYearly ? '0' : '0';
}

// Sidebar toggle function (if not already defined)
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Toggle auth form function (if not already defined)
function toggleAuthForm() {
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.classList.toggle('active');
    }
}

// Toggle auth mode (login/signup) function (if not already defined)
function toggleAuthMode() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm && signupForm) {
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'flex';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'flex';
        }
    }
}

