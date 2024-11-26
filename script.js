document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            navMenu.classList.toggle("hidden");
            navMenu.classList.toggle("flex");
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(n => n.addEventListener("click", function() {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            navMenu.classList.add("hidden");
            navMenu.classList.remove("flex");
        }));
    }

    // Hero Swiper
    new Swiper('.mySwiper', {
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

    // Reviews Swiper
    new Swiper('.reviewsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Cabin Modal Functionality
    function openModal(modal) {
        if (modal == null) return;
        modal.classList.remove('hidden');
        initModalSwiper(modal);
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.add('hidden');
    }

    function initModalSwiper(modal) {
        new Swiper(modal.querySelector('.swiper-container'), {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Top Banner Swiper
    new Swiper('.top-banner-swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // Close Top Banner
    const closeBannerBtn = document.getElementById('close-banner');
    const topBanner = document.querySelector('#top-banner');

    if (closeBannerBtn && topBanner) {
        closeBannerBtn.addEventListener('click', function() {
            topBanner.style.display = 'none';
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to your server
            // For this example, we'll just show an alert
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gallery image modal
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const body = document.body;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-75', 'flex', 'items-center', 'justify-center', 'z-50');
            modal.innerHTML = `
                <div class="relative">
                    <img src="${item.src}" alt="${item.alt}" class="max-w-full max-h-90vh">
                    <button class="absolute top-4 right-4 text-white text-2xl">&times;</button>
                </div>
            `;
            body.appendChild(modal);
            body.style.overflow = 'hidden';

            modal.querySelector('button').addEventListener('click', () => {
                body.removeChild(modal);
                body.style.overflow = '';
            });
        });
    });

    // Load cabins dynamically
    function cargarCabanas() {
        fetch('cabanas.json')
            .then(response => response.json())
            .then(data => {
                const cabanasContainer = document.querySelector('#cabanas .grid');
                cabanasContainer.innerHTML = '';

                data.cabanas.forEach(cabana => {
                    const cabanaHTML = `
                        <div class="cabana-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105" data-aos="fade-up">
                            <img src="${cabana.imagen}" alt="${cabana.nombre}" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-xl font-bold mb-2">${cabana.nombre}</h3>
                                <p class="mb-4">${cabana.descripcion}</p>
                                <ul class="mb-4">
                                    <li><i class="fas fa-user mr-2"></i> ${cabana.capacidad} personas</li>
                                    <li><i class="fas fa-dollar-sign mr-2"></i> $${cabana.precio} por noche</li>
                                </ul>
                                <button class="btn btn-secondary block w-full text-center" data-modal-target="#modal-${cabana.id}">Ver más</button>
                            </div>
                        </div>
                    `;
                    cabanasContainer.innerHTML += cabanaHTML;
                });

                crearModales(data.cabanas);
                inicializarModales();
            });
    }

    function crearModales(cabanas) {
        const body = document.body;
        cabanas.forEach(cabana => {
            const modal = document.createElement('div');
            modal.id = `modal-${cabana.id}`;
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center hidden';
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-8 max-w-3xl w-full mx-4">
                    <h3 class="text-2xl font-bold mb-4">${cabana.nombre}</h3>
                    <div class="swiper-container mb-4">
                        <div class="swiper-wrapper">
                            ${cabana.imagenes.map(img => `<div class="swiper-slide"><img src="${img}" alt="${cabana.nombre}" class="w-full h-64 object-cover rounded-lg"></div>`).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                    <p class="mb-4">${cabana.descripcion}</p>
                    <ul class="mb-4">
                        ${cabana.detalles.map(detalle => `<li><i class="fas fa-check mr-2"></i>${detalle}</li>`).join('')}
                    </ul>
                    <button class="btn btn-primary mr-2">Reservar ahora</button>
                    <button class="btn btn-secondary modal-close">Cerrar</button>
                </div>
            `;
            body.appendChild(modal);
        });
    }

    function inicializarModales() {
        const modalButtons = document.querySelectorAll('[data-modal-target]');
        const modalCloseButtons = document.querySelectorAll('.modal-close');

        modalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.fixed');
                closeModal(modal);
            });
        });
    }

    cargarCabanas();

    // Gallery filter functionality
    const galleryFilter = document.getElementById('gallery-filter');
    const galleryContainer = document.getElementById('gallery-container');

    if (galleryFilter && galleryContainer) {
        galleryFilter.addEventListener('change', function() {
            const selectedZone = this.value;
            const galleryItems = galleryContainer.querySelectorAll('.gallery-item');

            galleryItems.forEach(item => {
                if (selectedZone === 'all' || item.dataset.zone === selectedZone) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Dynamically add filter options
    const zones = ['villa-del-dique', 'villa-rumipal', 'el-torreon'];
    zones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        galleryFilter.appendChild(option);
    });

    // Add data-zone attribute to gallery items
    const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const randomZone = zones[Math.floor(Math.random() * zones.length)];
        item.dataset.zone = randomZone;
    });
});