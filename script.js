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
  });
  