document.addEventListener("DOMContentLoaded", function () {
    const moviesContainer = document.getElementById("moviesContainer");

    if (!moviesContainer) {
        console.error("Ошибка: не найден контейнер #moviesContainer!");
        return;
    }

    const movies = [
        {
            "title": "Дюна: Часть вторая",
            "poster": "https://ru-images.kinorium.com/movie/300/2808886.jpg?1736334495",
        },
        {
            "title": "Оппенгеймер",
            "poster": "https://ru-images.kinorium.com/movie/300/2828885.jpg?1690229381",
        },
        {
            "title": "Барби",
            "poster": "https://ru-images-s.kinorium.com/movie/300/501616.jpg?1694458556",
        },
        {
            "title": "Аватар: Путь воды",
            "poster": "https://ru-images-s.kinorium.com/movie/300/528138.jpg?1683110297",
        },
        {
            "title": "Человек-паук: Через вселенные",
            "poster": "https://ru-images.kinorium.com/movie/300/1446885.jpg?1654075889",
        },
        {
            "title": "Соник 3",
            "poster": "https://ru-images-s.kinorium.com/movie/300/8663323.jpg?1731588344",
        }
    ];

    // Заполняем страницу фильмами
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" draggable="false">
            <p class="movie-title">${movie.title}</p>
        `;

        // Обработчик клика
        movieCard.addEventListener("click", () => {
            const movieName = movie.title
                .toLowerCase()
                .replace(/[^a-zа-я0-9\s]/g, "") // Удаляем лишние символы
                .trim()
                .replace(/\s+/g, "-"); // Пробелы заменяем на "-"

            window.location.href = `/Cvinema/movie.html?name=${movieName}`;
        });

        moviesContainer.appendChild(movieCard);
    });

    console.log("Фильмы загружены!");
});
