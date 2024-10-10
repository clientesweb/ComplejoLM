document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize Swiper for hero slider
    const heroSwiper = new Swiper('.hero .swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Initialize Swiper for top banner
    const topBannerSwiper = new Swiper('#top-banner .swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        direction: 'vertical',
    });

    // Dynamic content for cabañas
    const cabanasContainer = document.querySelector('#cabanas .grid');
    const cabanas = [
        { name: 'Cabaña Familiar', description: 'Perfecta para familias, con capacidad para 6 personas.', image: 'https://source.unsplash.com/800x600/?cabin,family' },
        { name: 'Cabaña Romántica', description: 'Ideal para parejas, con jacuzzi privado.', image: 'https://source.unsplash.com/800x600/?cabin,romantic' },
        { name: 'Cabaña Aventura', description: 'Para los amantes de la naturaleza, cerca de senderos.', image: 'https://source.unsplash.com/800x600/?cabin,adventure' }
    ];

    cabanas.forEach(cabana => {
        const cabanaElement = document.createElement('div');
        cabanaElement.className = 'bg-white rounded-lg shadow-md overflow-hidden hover-lift';
        cabanaElement.innerHTML = `
            <img src="${cabana.image}" alt="${cabana.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${cabana.name}</h3>
                <p class="text-gray-600">${cabana.description}</p>
            </div>
        `;
        cabanasContainer.appendChild(cabanaElement);
    });

    // Dynamic content for servicios
    const serviciosContainer = document.querySelector('#servicios .grid');
    const servicios = [
        { name: 'Wi-Fi Gratis', icon: 'fas fa-wifi' },
        { name: 'Estacionamiento', icon: 'fas fa-parking' },
        { name: 'Piscina', icon: 'fas fa-swimming-pool' },
        { name: 'Parrilla', icon: 'fas fa-fire' }
    ];

    servicios.forEach(servicio => {
        const servicioElement = document.createElement('div');
        servicioElement.className = 'text-center hover-grow';
        servicioElement.innerHTML = `
            <i class="${servicio.icon} text-4xl text-indigo-600 mb-4"></i>
            <h3 class="text-xl font-semibold">${servicio.name}</h3>
        `;
        serviciosContainer.appendChild(servicioElement);
    });

    // Dynamic content for gallery
    const galleryContainer = document.querySelector('#galeria .grid');
    for (let i = 1; i <= 8; i++) {
        const imgElement = document.createElement('div');
        imgElement.className = 'relative overflow-hidden rounded-lg aspect-square hover-grow';
        imgElement.innerHTML = `
            <img src="https://source.unsplash.com/800x800/?cabin,nature&sig=${i}" alt="Galería ${i}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
        `;
        galleryContainer.appendChild(imgElement);
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });

    // Intersection Observer for fade-in animations
    const fadeElems = document.querySelectorAll('.fade-in, .animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });
});

// Initialize Google Maps
function initMap() {
    const complejolm = { lat: -34.6157, lng: -68.3382 }; // San Rafael, Mendoza coordinates
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: complejolm,
    });
    const marker = new google.maps.Marker({
        position: complejolm,
        map: map,
        title: 'Complejo LM'
    });
}
