document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", mobileMenu);

    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    // Close mobile menu when clicking on a nav link
    const navLink = document.querySelectorAll(".nav-link");

    navLink.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }

    // Hero Swiper
    const swiper = new Swiper('.mySwiper', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // WhatsApp Buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cabin = this.getAttribute('data-cabin');
            const message = encodeURIComponent(`Hola, estoy interesado en reservar la ${cabin}. ¿Podrían darme más información?`);
            window.open(`https://wa.me/5492604445678?text=${message}`, '_blank');
        });
    });

    // Advertising Banner Swiper
    const adSwiper = new Swiper('.adSwiper', {
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Top Banner Swiper
    const topBannerSwiper = new Swiper('.top-banner-swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // Close Top Banner
    const closeBannerBtn = document.getElementById('close-banner');
    const topBanner = document.querySelector('.top-banner');

    if (closeBannerBtn && topBanner) {
        closeBannerBtn.addEventListener('click', function() {
            topBanner.style.display = 'none';
        });
    }
});