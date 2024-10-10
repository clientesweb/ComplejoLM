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

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    mobileMenuBtn.textContent = mobileNav.classList.contains('hidden') ? 'Menú' : 'Cerrar';
});

// Hero Slider
const heroSlider = document.getElementById('hero-slider');
const heroImages = [
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
];
let currentHeroIndex = 0;

function rotateHeroImage() {
    heroSlider.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
}

setInterval(rotateHeroImage, 5000);
rotateHeroImage(); // Initial call

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

function createCabinSlide(cabin) {
    const slide = document.createElement('div');
    slide.className = 'cabin-slide';
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
    return slide;
}

function rotateCabinSlide() {
    const slides = cabinSlider.getElementsByClassName('cabin-slide');
    for (let slide of slides) {
        slide.classList.remove('active');
    }
    slides[currentCabinIndex].classList.add('active');
    currentCabinIndex = (currentCabinIndex + 1) % cabins.length;
}

cabins.forEach(cabin => {
    cabinSlider.appendChild(createCabinSlide(cabin));
});

setInterval(rotateCabinSlide, 5000);
rotateCabinSlide(); // Initial call

function sendWhatsAppMessage(cabinName) {
    const message = encodeURIComponent(`Hola, me gustaría reservar la ${cabinName} en Complejo LM.`);
    window.open(`https://wa.me/5492604445678?text=${message}`, '_blank');
}

// Promo Banner
const promoBanner = document.getElementById('promo-banner');
const promoContent = document.getElementById('promo-content');
const promos = [
    {
        title: "Oferta de Primavera",
        description: "¡20% de descuento en reservas de 4 noches o más!",
        bgColor: "#059669"
    },
    {
        title: "Paquete Romántico",
        description: "Cena a la luz de las velas y spa incluidos",
        bgColor: "#DC2626"
    },
    {
        title: "Aventura Familiar",
        description: "Actividades para niños gratis con tu reserva",
        bgColor: "#2563EB"
    }
];
let currentPromoIndex = 0;

function rotatePromo() {
    const promo = promos[currentPromoIndex];
    promoContent.innerHTML = `
        <h3 class="text-3xl font-bold mb-4">${promo.title}</h3>
        <p class="text-xl mb-6">${promo.description}</p>
        <a href="#contacto" class="btn bg-white text-green-600">Reserva Ahora</a>
    `;
    promoBanner.style.backgroundColor = promo.bgColor;
    currentPromoIndex = (currentPromoIndex + 1) % promos.length;
}

setInterval(rotatePromo, 5000);
rotatePromo(); // Initial call

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();