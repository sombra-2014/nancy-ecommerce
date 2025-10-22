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

  function displayImage() {
    carouselContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = images[currentIndex].url;
    img.alt = images[currentIndex].alt;
    img.classList.add('carousel-image');
    carouselContainer.appendChild(img);
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    displayImage();
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    displayImage();
  }

  function startCarousel() {
    interval = setInterval(showNextImage, 4000);
  }

  function stopCarousel() {
    clearInterval(interval);
  }

  nextBtn.addEventListener('click', () => {
    stopCarousel();
    showNextImage();
    startCarousel();
  });

  prevBtn.addEventListener('click', () => {
    stopCarousel();
    showPrevImage();
    startCarousel();
  });

  fetchCarouselImages();
});

