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
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
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

    // Load rentals dynamically
    function cargarAlquileres() {
        // This would typically be an API call. For this example, we'll use a static array.
        const alquileres = [
            { id: 1, nombre: "Casa en Villa del Dique", imagen: "https://via.placeholder.com/300x200", descripcion: "Hermosa casa con vista al lago", capacidad: 6, precio: 5000 },
            { id: 2, nombre: "Cabaña en Villa Rumipal", imagen: "https://via.placeholder.com/300x200", descripcion: "Acogedora cabaña en el bosque", capacidad: 4, precio: 4000 },
            { id: 3, nombre: "Departamento en El Torreón", imagen: "https://via.placeholder.com/300x200", descripcion: "Moderno departamento con todas las comodidades", capacidad: 3, precio: 3500 },
        ];

        const alquileresContainer = document.querySelector('#alquileres .grid');
        alquileresContainer.innerHTML = '';

        alquileres.forEach(alquiler => {
            const alquilerHTML = `
                <div class="alquiler-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105" data-aos="fade-up">
                    <img src="${alquiler.imagen}" alt="${alquiler.nombre}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-bold mb-2">${alquiler.nombre}</h3>
                        <p class="mb-4">${alquiler.descripcion}</p>
                        <ul class="mb-4">
                            <li><i class="fas fa-user mr-2"></i> ${alquiler.capacidad} personas</li>
                            <li><i class="fas fa-dollar-sign mr-2"></i> $${alquiler.precio} por noche</li>
                        </ul>
                        <button class="btn btn-secondary block w-full text-center" onclick="mostrarDetalles(${alquiler.id})">Ver más</button>
                    </div>
                </div>
            `;
            alquileresContainer.innerHTML += alquilerHTML;
        });
    }

    // Gallery filter functionality
    const galleryFilter = document.getElementById('gallery-filter');
    const galleryContainer = document.getElementById('gallery-container');

    // This would typically be loaded from a database or API
    const galleryItems = [
        { src: 'https://via.placeholder.com/300x200', alt: 'Villa del Dique', zone: 'villa-del-dique' },
        { src: 'https://via.placeholder.com/300x200', alt: 'Villa Rumipal', zone: 'villa-rumipal' },
        { src: 'https://via.placeholder.com/300x200', alt: 'El Torreón', zone: 'el-torreon' },
        // Add more items as needed
    ];

    function loadGallery(filter = 'all') {
        galleryContainer.innerHTML = '';
        galleryItems.forEach(item => {
            if (filter === 'all' || item.zone === filter) {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.alt;
                img.className = 'w-full h-40 object-cover rounded-lg shadow-md gallery-item';
                img.dataset.aos = 'fade-up';
                galleryContainer.appendChild(img);
            }
        });
    }

    galleryFilter.addEventListener('change', (e) => {
        loadGallery(e.target.value);
    });

    // Load rentals and gallery when the DOM is ready
    cargarAlquileres();
    loadGallery();

    // Function to handle resizing
    function handleResize() {
        // Add any necessary logic for responsive design
        console.log('Window resized');
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Call the function once on page load
    handleResize();
});

function mostrarDetalles(id) {
    // This function would typically fetch more details about the rental and display them
    // For this example, we'll just show an alert
    alert(`Mostrando detalles del alquiler ${id}`);
}

