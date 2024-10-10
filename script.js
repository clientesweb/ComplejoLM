document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Top Banner
    const bannerText = document.getElementById('banner-text');
    const bannerMessages = [
        "¡Oferta especial! 20% de descuento en estadías de 3 noches o más",
        "Nuevo: Paquete romántico para parejas disponible",
        "Reserve ahora y obtenga un tour gratuito por los viñedos"
    ];
    let currentBannerIndex = 0;

    function rotateBannerMessage() {
        bannerText.textContent = bannerMessages[currentBannerIndex];
        currentBannerIndex = (currentBannerIndex + 1) % bannerMessages.length;
    }

    setInterval(rotateBannerMessage, 5000);
    rotateBannerMessage(); // Initial call

    // Hero Slider
    const heroSlider = document.getElementById('hero-slider');
    const heroImages = [
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ];
    let currentHeroIndex = 0;

    function createHeroSlider() {
        heroImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Vista panorámica ${index + 1}`;
            img.className = index === 0 ? 'active' : '';
            heroSlider.appendChild(img);
        });
    }

    function rotateHeroImage() {
        const images = heroSlider.querySelectorAll('img');
        images[currentHeroIndex].classList.remove('active');
        currentHeroIndex = (currentHeroIndex + 1) % images.length;
        images[currentHeroIndex].classList.add('active');
    }

    createHeroSlider();
    setInterval(rotateHeroImage, 5000);

    // Cabin Slider
    const cabinSlider = document.getElementById('cabin-slider');
    const cabins = [
        {
            name: "Cabaña del Bosque",
            description: "Perfecta para parejas, esta cabaña ofrece una experiencia íntima en medio de la naturaleza.",
            image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            capacity: "2 personas",
            price: "$150 por noche"
        },
        {
            name: "Cabaña Familiar",
            description: "Espaciosa y cómoda, ideal para familias que buscan un escape tranquilo.",
            image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
            capacity: "6 personas",
            price: "$250 por noche"
        },
        {
            name: "Cabaña Vista al Lago",
            description: "Con impresionantes vistas al lago, perfecta para los amantes de la naturaleza.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            capacity: "4 personas",
            price: "$200 por noche"
        }
    ];
    let currentCabinIndex = 0;

    function createCabinSlides() {
        cabins.forEach((cabin, index) => {
            const slide = document.createElement('div');
            slide.className = `cabin-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <img src="${cabin.image}" alt="${cabin.name}">
                <h3>${cabin.name}</h3>
                <p>${cabin.description}</p>
                <p><strong>Capacidad:</strong> ${cabin.capacity}</p>
                <p><strong>Precio:</strong> ${cabin.price}</p>
                <button onclick="sendWhatsAppMessage('${cabin.name}')" class="btn">
                    <i class="fab fa-whatsapp"></i> Reservar por WhatsApp
                </button>
            `;
            cabinSlider.appendChild(slide);
        });
    }

    function rotateCabinSlide() {
        const slides = cabinSlider.querySelectorAll('.cabin-slide');
        slides[currentCabinIndex].classList.remove('active');
        currentCabinIndex = (currentCabinIndex + 1) % slides.length;
        slides[currentCabinIndex].classList.add('active');
    }

    createCabinSlides();
    setInterval(rotateCabinSlide, 5000);

    // Gallery
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryImages = [
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1518602164578-cd0074062767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ];

    function createGallery() {
        galleryImages.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${image}" alt="Imagen de galería ${index + 1}">`;
            galleryGrid.appendChild(item);
        });
    }

    createGallery();

    // Promo Banner
    const promoBanner = document.getElementById('promo-banner');
    const promoContent = document.getElementById('promo-content');
    const promos = [
        {
            title: "Oferta de Primavera",
            description: "¡20% de descuento en reservas de 4 noches o más!",
            bgColor: "#4CAF50"
        },
        {
            title: "Paquete Romántico",
            description: "Cena a la luz de las velas y spa incluidos",
            bgColor: "#FF4081"
        },
        {
            title: "Aventura Familiar",
            description: "Actividades para niños gratis con tu reserva",
            bgColor: "#2196F3"
        }
    ];
    let currentPromoIndex = 0;

    function rotatePromo() {
        const promo = promos[currentPromoIndex];
        promoContent.innerHTML = `
            <h3>${promo.title}</h3>
            <p>${promo.description}</p>
            <a href="#contacto" class="btn">Reserva Ahora</a>
        `;
        promoBanner.style.backgroundColor = promo.bgColor;
        currentPromoIndex = (currentPromoIndex + 1) % promos.length;
    }

    setInterval(rotatePromo, 5000);
    rotatePromo(); // Initial call

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// WhatsApp function (outside DOMContentLoaded to be globally accessible)
function sendWhatsAppMessage(cabinName) {
    const message = encodeURIComponent(`Hola, me gustaría reservar la ${cabinName} en Complejo LM.`);
    window.open(`https://wa.me/5492604445678?text=${message}`, '_blank');
}