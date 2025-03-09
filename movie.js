document.addEventListener("DOMContentLoaded", function () {
    const movieInfoContainer = document.getElementById("movie-info");

    // Получаем название фильма из URL (query-параметры)
    const urlParams = new URLSearchParams(window.location.search);
    const movieName = decodeURIComponent(urlParams.get("name"))
        .toLowerCase()
        .replace(/\s/g, "-"); // Убираем пробелы и приводим к нижнему регистру

    console.log("Название фильма из URL:", movieName);

    // Данные о фильмах
    const moviesData = {
        "дюна-часть-вторая": {
            title: "Дюна: Часть вторая",
            poster: "https://ru-images.kinorium.com/movie/300/2808886.jpg?1736334495",
            description: "Продолжение эпической саги о Пола Атрейдесе.",
            rating: 8.9
        },
        "оппенгеймер": {
            title: "Оппенгеймер",
            poster: "https://ru-images.kinorium.com/movie/300/2828885.jpg?1690229381",
            description: "История создания атомной бомбы.",
            rating: 9.2
        },
        "барби": {
            title: "Барби",
            poster: "https://ru-images-s.kinorium.com/movie/300/501616.jpg?1694458556",
            description: "История Барби в реальном мире.",
            rating: 7.8
        },
        "аватар-путь-воды": {
            title: "Аватар: Путь воды",
            poster: "https://ru-images-s.kinorium.com/movie/300/528138.jpg?1683110297",
            description: "Продолжение истории на Пандоре.",
            rating: 8.2
        },
        "человек-паук-через-вселенные": {
            title: "Человек-паук: Через вселенные",
            poster: "https://ru-images.kinorium.com/movie/300/1446885.jpg?1654075889",
            description: "Майлз Моралес отправляется в мультивселенную.",
            rating: 8.7
        },
        "соник-3": {
            title: "Соник 3",
            poster: "https://ru-images-s.kinorium.com/movie/300/8663323.jpg?1731588344",
            description: "Анимационный фильм про Соника.",
            rating: 7.5
        }
    };

    function getRandomHall() {
        return Math.floor(Math.random() * 6) + 1;
    }

    if (movieName && moviesData[movieName]) {
        const movie = moviesData[movieName];

        let savedHall = localStorage.getItem(`hall_${movieName}`);
        if (!savedHall) {
            savedHall = getRandomHall();
            localStorage.setItem(`hall_${movieName}`, savedHall);
        }

        movieInfoContainer.innerHTML = `
            <h1>${movie.title}</h1>
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <p>${movie.description}</p>
            <p><strong>Рейтинг:</strong> ${movie.rating}</p>
            <p><strong>Зал:</strong> ${savedHall}</p>
        `;

        localStorage.setItem("currentMovieHall", savedHall);
    } else {
        movieInfoContainer.innerHTML = `<h1>Фильм не найден</h1>`;
    }
});
