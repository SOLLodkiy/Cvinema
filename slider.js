document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector(".slider-container");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".slider-dots");

    let currentIndex = 1; // Начинаем со второго элемента (первый — клон)
    const totalSlides = slides.length;

    // Клонируем первый и последний слайд
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    // Добавляем их в начало и конец
    sliderContainer.appendChild(firstClone);
    sliderContainer.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll(".slide"); // Обновляем список слайдов
    const realSlidesCount = totalSlides; // Количество реальных слайдов (без клонов)

    // Создание точек (индикаторов)
    for (let i = 0; i < realSlidesCount; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.setAttribute("data-index", i);
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".dot");
    let isTransitioning = false; // Флаг для блокировки лишней анимации

    function updateSlider(index, instant = false) {
        if (instant) {
            sliderContainer.style.transition = "none"; // Убираем анимацию
        } else {
            sliderContainer.style.transition = "transform 0.5s ease-in-out";
        }

        let offset = -index * 100;
        sliderContainer.style.transform = `translateX(${offset}%)`;

        // Обновляем активную точку (игнорируем клоны)
        let realIndex = index - 1;
        if (realIndex < 0) realIndex = realSlidesCount - 1;
        if (realIndex >= realSlidesCount) realIndex = 0;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[realIndex].classList.add("active");
    }

    function goToNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex++;
        updateSlider(currentIndex);

        if (currentIndex === allSlides.length - 1) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    updateSlider(1, true); // Мгновенный переход на реальный 1-й слайд
                    currentIndex = 1;
                    isTransitioning = false;
                });
            }, 500);
        } else {
            setTimeout(() => (isTransitioning = false), 500);
        }
    }

    function goToPrevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex--;
        updateSlider(currentIndex);

        if (currentIndex === 0) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    updateSlider(allSlides.length - 2, true); // Мгновенный переход на последний реальный слайд
                    currentIndex = allSlides.length - 2;
                    isTransitioning = false;
                });
            }, 500);
        } else {
            setTimeout(() => (isTransitioning = false), 500);
        }
    }

    // Обработчики кнопок
    nextBtn.addEventListener("click", goToNextSlide);
    prevBtn.addEventListener("click", goToPrevSlide);

    // Обработчики точек
    dots.forEach(dot => {
        dot.addEventListener("click", function () {
            let index = parseInt(this.getAttribute("data-index")) + 1; // Сдвиг из-за клона
            updateSlider(index);
            currentIndex = index;
        });
    });

    // Устанавливаем начальную позицию без анимации
    updateSlider(currentIndex, true);
});
