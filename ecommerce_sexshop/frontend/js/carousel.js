document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.getElementById('carousel-images');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentIndex = 0;
  let images = [];
  let interval;

  async function fetchCarouselImages() {
    try {
      const response = await fetch('/api/carousel_images');
      images = await response.json();
      if (images.length > 0) {
        displayImage();
        startCarousel();
      }
    } catch (error) {
      console.error("Error al obtener imágenes del carrusel:", error);
    }
  }

  // ... resto del código ...

  fetchCarouselImages(); // ✅ Esto inicia el carrusel correctamente
});

async function fetchCarouselImages() {
  const response = await fetch('/api/carousel_images');
  const images = await response.json();
  // lógica del carrusel...
}