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
        { 
            name: 'Cabaña Malbec', 
            description: 'Perfecta para parejas, con vista a los viñedos y jacuzzi privado.', 
            image: 'https://source.unsplash.com/800x600/?cabin,romantic', 
            price: '$150 por noche'
        },
        { 
            name: 'Cabaña Familiar Andes', 
            description: 'Espaciosa cabaña para 6 personas, con terraza y parrilla.', 
            image: 'https://source.unsplash.com/800x600/?cabin,family', 
            price: '$250 por noche'
        },
        { 
            name: 'Cabaña Lago Diamante', 
            description: 'Con vista al lago, ideal para los amantes de la naturaleza y la pesca.', 
            image: 'https://source.unsplash.com/800x600/?cabin,lake', 
            price: '$200 por noche'
        }
    ];

    cabanas.forEach(cabana => {
        const cabanaElement = document.createElement('div');
        cabanaElement.className = 'cabin-card hover-lift';
        cabanaElement.innerHTML = `
            <img src="${cabana.image}" alt="${cabana.name}" class="cabin-image w-full">
            <div class="cabin-details">
                <h3 class="cabin-name">${cabana.name}</h3>
                <p class="cabin-description">${cabana.description}</p>
                <p class="cabin-price">${cabana.price}</p>
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
        { name: 'Tour de Bodegas', icon: 'fas fa-wine-glass-alt' }
    ];

    servicios.forEach(servicio => {
        const servicioElement = document.createElement('div');
        servicioElement.className = 'text-center hover-grow';
        servicioElement.innerHTML = `
            <i class="${servicio.icon} service-icon"></i>
            <h3 class="text-xl font-semibold">${servicio.name}</h3>
        `;
        serviciosContainer.appendChild(servicioElement);
    });

    // Dynamic content for gallery
    const galleryContainer = document.querySelector('#galeria .grid');
    const galleryImages = [
        'https://source.unsplash.com/800x800/?vineyard',
        'https://source.unsplash.com/800x800/?winery',
        'https://source.unsplash.com/800x800/?san-rafael-argentina',
        'https://source.unsplash.com/800x800/?cabin-interior',
        'https://source.unsplash.com/800x800/?mountain-view',
        'https://source.unsplash.com/800x800/?wine-tasting',
        'https://source.unsplash.com/800x800/?argentina-landscape',
        'https://source.unsplash.com/800x800/?cozy-cabin'
    ];

    galleryImages.forEach((image, index) => {
        const imgElement = document.createElement('div');
        imgElement.className = 'gallery-image relative overflow-hidden rounded-lg aspect-square';
        imgElement.innerHTML = `
            <img src="${image}" alt="Galería ${index + 1}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
        `;
        galleryContainer.appendChild(imgElement);
    });

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
        zoom: 13,
        center: complejolm,
    });
    const marker = new google.maps.Marker({
        position: complejolm,
        map: map,
        title: 'Complejo LM'
    });
}