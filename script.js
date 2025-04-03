let cLanguage = "english";
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.nav-mobile-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlEl = document.documentElement;
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Language toggle
    const langSwitch = document.querySelector('.lang-switch');
    let currentLang = localStorage.getItem('language') || 'english';
    
    // Music controls
    const audio = document.getElementById('background-music');
    const musicToggle = document.querySelector('.music-toggle-button');
    const volumeBtn = document.querySelector('.volume-button');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeRange = document.querySelector('.volume-range');
    let isPlaying = false;
    let isMuted = false;
    let lastVolume = parseFloat(volumeRange.value);
    
    // Animation on scroll elements
    const animatedElements = document.querySelectorAll('.card, .member-card, .event-card, .blog-card, .gallery-item');
    
    // Shayari Display
    const shayariContainer = document.querySelector('.shayari-container');
    const shayariText = document.querySelector('.shayari-text');
    const shayariTheme = document.querySelector('.shayari-theme');
    const shayariLoader = document.querySelector('.shayari-loader');
    let currentShayari = null;
    
    // Initialize
    init();
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    themeToggle.addEventListener('click', toggleTheme);
    langSwitch.addEventListener('click', toggleLanguage);
    musicToggle.addEventListener('click', toggleMusic);
    volumeBtn.addEventListener('click', toggleVolumeSlider);
    volumeRange.addEventListener('input', updateVolume);
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', handleAnimation);
    
    // Gallery Image Enlargement
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
        const img = this.querySelector('.gallery-image');
        const overlay = this.querySelector('.gallery-overlay');
        overlay.style.setProperty('--gallery-image', `url(${img.src})`);
      });
    });
    
    // Functions
    function init() {
      // Apply the stored theme
      htmlEl.classList.add(currentTheme);
      
      // Apply the stored language
      langSwitch.setAttribute('data-state', currentLang);
      if (currentLang === 'hindi') {
        applyLanguage('hindi');
      }
      
      // Initialize volume
      volumeRange.value = localStorage.getItem('volume') || 0.5;
      updateVolume();
      
      // Initial scroll check
      handleScroll();
      
      // Initial animation check
      setTimeout(() => {
        handleAnimation();
      }, 300);
    }
    
    function handleScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    
    function toggleMobileMenu() {
      navMenu.classList.toggle('active');
      nav.classList.toggle('active');
    }
    
    function closeMobileMenu() {
      navMenu.classList.remove('active');
      nav.classList.remove('active');
    }
    
    function toggleTheme() {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlEl.classList.remove('light', 'dark');
      htmlEl.classList.add(currentTheme);
      localStorage.setItem('theme', currentTheme);
    }
    
    function toggleLanguage() {
      currentLang = currentLang === 'english' ? 'hindi' : 'english';
      cLanguage = currentLang;
      console.log(cLanguage);
      langSwitch.setAttribute('data-state', currentLang);
      localStorage.setItem('language', currentLang);
      applyLanguage(currentLang);
    }
    
    function applyLanguage(language) {
      const elements = document.querySelectorAll('[data-en][data-hi]');
      elements.forEach(el => {
        el.textContent = language === 'english' ? el.getAttribute('data-en') : el.getAttribute('data-hi');
      });
      document.documentElement.lang = language === 'english' ? 'en' : 'hi';
    }
    
    function toggleMusic() {
      if (isPlaying) {
        audio.pause();
        document.body.classList.remove('playing');
      } else {
        audio.play().catch(error => {
          console.error("Audio play failed:", error);
        });
        document.body.classList.add('playing');
      }
      isPlaying = !isPlaying;
    }
    
    function toggleVolumeSlider() {
      volumeSlider.classList.toggle('visible');
    }
    
    function updateVolume() {
      const volume = volumeRange.value;
      audio.volume = volume;
      localStorage.setItem('volume', volume);
      
      // Update background gradient to show volume level
      const percentage = volume * 100;
      volumeRange.style.backgroundSize = `${percentage}% 100%`;
      
      // Show/hide volume icon based on level
      if (volume === 0) {
        volumeBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
        isMuted = true;
      } else if (volume < 0.5) {
        volumeBtn.innerHTML = '<i class="ri-volume-down-line"></i>';
        isMuted = false;
      } else {
        volumeBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
        isMuted = false;
      }
      
      lastVolume = isMuted ? volume : volume > 0 ? volume : 0.5;
    }
    
    function handleOutsideClick(event) {
      if (volumeSlider.classList.contains('visible') && 
          !volumeSlider.contains(event.target) && 
          !volumeBtn.contains(event.target)) {
        volumeSlider.classList.remove('visible');
      }
    }
    
    function handleAnimation() {
      animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          if (!el.classList.contains('animate-scale')) {
            el.classList.add('animate-scale');
          }
        }
      });
    }

    // Scroll Animations
    document.addEventListener('DOMContentLoaded', () => {
        // Scroll to Top Button
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        const scrollProgress = document.querySelector('.scroll-progress');

        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }

            // Update scroll progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        });

        // Smooth scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll Reveal Animation
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Add a slight delay for each child element to create a staggered effect
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('revealed');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollRevealElements.forEach(element => {
            observer.observe(element);
        });
    });

    async function fetchShayari(language) {
        try {
            shayariLoader.classList.add('active');
            shayariText.classList.remove('visible');
            
            // Fetch from local JSON file using absolute path
            const response = await fetch('/shayris.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const allShayaris = await response.json();
            
            // Get random shayari from the appropriate language array
            const shayaris = allShayaris[language];
            const randomIndex = Math.floor(Math.random() * shayaris.length);
            let data = shayaris[randomIndex];
            
            // Check if the new shayari is different from the current one
            if (currentShayari && currentShayari.text === data.text) {
                // If it's the same, try fetching again
                return fetchShayari(language);
            }
            
            // Remove previous theme
            if (currentShayari) {
                shayariContainer.removeAttribute('data-theme');
            }
            
            // Set new theme
            shayariContainer.setAttribute('data-theme', data.theme.toLowerCase());
            
            // Update text and theme
            shayariText.textContent = data.text;
            shayariTheme.textContent = data.theme;
            
            // Show with animation
            setTimeout(() => {
                shayariText.classList.add('visible');
                shayariLoader.classList.remove('active');
            }, 300);
            
            currentShayari = data;
        } catch (error) {
            console.error('Error fetching shayari:', error);
            shayariLoader.classList.remove('active');
            shayariText.textContent = language === 'english' ? 
                'Unable to load shayari. Please try again.' : 
                'शायरी लोड करने में समस्या। कृपया पुनः प्रयास करें।';
        }
    }

    function updateShayari() {
        const currentLang = document.documentElement.classList.contains('hindi') ? 'hindi' : 'english';
        fetchShayari(cLanguage);
    }

    // Update shayari every 7 seconds
    setInterval(updateShayari, 7000);

    // Initial shayari display
    updateShayari();

    // Update shayari when language changes
    langSwitch.addEventListener('click', () => {
        setTimeout(updateShayari, 900); // Wait for language switch animation
    });
  });

// Function to create glitter particles
// Glitter effect initialization
const initGlitterEffect = () => {
  document.addEventListener("mousemove", function(event) {
    // Only create glitter particles every 3rd mouse move event to improve performance
    if (Math.random() > 0.5) {
      createGlitterParticles(event.clientX, event.clientY);
    }
  });

  // Add touch support for mobile devices
  document.addEventListener("touchmove", function(event) {
    if (event.touches.length > 0) {
      // Only create particles every few pixels moved to avoid overwhelming mobile devices
      if (Math.random() > 0.7) {
        createGlitterParticles(event.touches[0].clientX, event.touches[0].clientY);
      }
    }
  });
};

// Function to create glitter particles
const createGlitterParticles = (x, y) => {
  const particleCount = Math.floor(Math.random() * 3) + 2; // 2-4 particles
  
  for (let i = 0; i < particleCount; i++) {
    const glitter = document.createElement("div");
    glitter.className = "glitter";
    
    // Random size
    const size = Math.random() * 10 + 8; // 8px - 18px
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;

    // Add random color classes for variety
    const colorClasses = ["blue", "purple", "pink", "gold", "teal", "green"];
    const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    glitter.classList.add(randomColorClass);

    // Position with some randomness for a more natural effect
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;
    glitter.style.left = `${x + offsetX}px`;
    glitter.style.top = `${y + offsetY}px`;

    // Add to DOM
    document.body.appendChild(glitter);

    // Random animation duration for more natural effect
    const duration = 800 + Math.random() * 400; // 800-1200ms
    glitter.style.animationDuration = `${duration}ms`;

    // Remove after animation completes
    setTimeout(() => {
      if (glitter.parentNode) {
        glitter.parentNode.removeChild(glitter);
      }
    }, duration);
  }
};

// Initialize the effect
document.addEventListener('DOMContentLoaded', () => {
  initGlitterEffect();
});

document.addEventListener("DOMContentLoaded", function () {
  const customCursor = document.createElement("div");
  customCursor.classList.add("custom-cursor");
  document.body.appendChild(customCursor);

  document.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.pageX}px`;
      customCursor.style.top = `${e.pageY}px`;
  });

  // Hide cursor when outside the window
  document.addEventListener("mouseleave", () => {
      customCursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
      customCursor.style.opacity = "1";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const splashScreen = document.getElementById('splash-screen');
  const homePage = document.getElementById('root');

  // Function to show splash screen and then redirect to home page
  function showSplashAndRedirect() {
    // Show splash screen
    splashScreen.classList.remove('hidden');
    homePage.classList.add('hidden');

    // Set timeout to transition to home page after 5 seconds
    setTimeout(() => {
      // Fade out splash screen
      splashScreen.style.opacity = '0';
      splashScreen.style.pointerEvents = 'none';

      // Show home page
      homePage.classList.remove('hidden');

      // Clean up splash screen after transition
      setTimeout(() => {
        splashScreen.classList.add('hidden');
      }, 500);
    }, 5000);
  }

  // Show splash screen on every page load/refresh
  showSplashAndRedirect();
});