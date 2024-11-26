document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", mobileMenu);

    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("hidden");
        navMenu.classList.toggle("flex");
        navMenu.classList.toggle("flex-col");
        navMenu.classList.toggle("absolute");
        navMenu.classList.toggle("top-16");
        navMenu.classList.toggle("left-0");
        navMenu.classList.toggle("w-full");
        navMenu.classList.toggle("bg-white");
        navMenu.classList.toggle("shadow-md");
        navMenu.classList.toggle("py-4");
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.add("hidden");
        navMenu.classList.remove("flex", "flex-col", "absolute", "top-16", "left-0", "w-full", "bg-white", "shadow-md", "py-4");
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
                                <button class="btn btn-secondary block w-full text-white bg-secondary hover:bg-primary transition-colors">Reservar</button>
                            </div>
                        </div>
                    `;
                    cabanasContainer.innerHTML += cabanaHTML;
                });
            })
            .catch(error => console.error('Error:', error));
    }

    cargarCabanas();

    // Gallery filter functionality
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            
            galleryFilters.forEach(f => f.classList.remove('active', 'bg-primary', 'text-white'));
            this.classList.add('active', 'bg-primary', 'text-white');
            
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Image viewer functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;

    function createImageViewer() {
        const viewer = document.createElement('div');
        viewer.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
        viewer.innerHTML = `
            <button class="absolute top-4 right-4 text-white text-4xl" id="close-viewer">&times;</button>
            <button class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl" id="prev-image">&lt;</button>
            <img src="" alt="Imagen ampliada" class="max-h-90vh max-w-90vw object-contain">
            <button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl" id="next-image">&gt;</button>
        `;
        document.body.appendChild(viewer);

        const closeBtn = viewer.querySelector('#close-viewer');
        const prevBtn = viewer.querySelector('#prev-image');
        const nextBtn = viewer.querySelector('#next-image');
        const viewerImage = viewer.querySelector('img');

        closeBtn.addEventListener('click', () => viewer.remove());
        prevBtn.addEventListener('click', showPreviousImage);
        nextBtn.addEventListener('click', showNextImage);

        function showImage(index) {
            viewerImage.src = galleryImages[index].src;
            currentImageIndex = index;
        }

        function showPreviousImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentImageIndex);
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showImage(currentImageIndex);
        }

        return showImage;
    }

    const showImageInViewer = createImageViewer();

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => showImageInViewer(index));
    });
});

