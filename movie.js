document.addEventListener("DOMContentLoaded", () => {
    const movies = [
        { "title": "Дюна: Часть вторая", "poster": "https://ru-images.kinorium.com/movie/300/2808886.jpg?1736334495", "slug": "Dune-Part-Two", "description": "Продолжение эпической саги о Пола Атрейдесе.", "rating": 8.9 },
        { "title": "Оппенгеймер", "poster": "https://ru-images.kinorium.com/movie/300/2828885.jpg?1690229381", "slug": "Oppenheimer", "description": "История создания атомной бомбы.", "rating": 9.2 },
        { "title": "Барби", "poster": "https://ru-images-s.kinorium.com/movie/300/501616.jpg?1694458556", "slug": "Barbie", "description": "История Барби в реальном мире.", "rating": 7.8 },
        { "title": "Аватар: Путь воды", "poster": "https://ru-images-s.kinorium.com/movie/300/528138.jpg?1683110297", "slug": "Avatar-Way-of-Water", "description": "Продолжение истории на Пандоре.", "rating": 8.2 },
        { "title": "Человек-паук: Через вселенные", "poster": "https://ru-images.kinorium.com/movie/300/1446885.jpg?1654075889", "slug": "Spider-Man-Across-the-Spider-Verse", "description": "Майлз Моралес отправляется в мультивселенную.", "rating": 8.7 },
        { "title": "Соник 3", "poster": "https://ru-images-s.kinorium.com/movie/300/8663323.jpg?1731588344", "slug": "Sonic-3", "description": "Анимационный фильм про соника.", "rating": 7.5 }
    ];

    const path = window.location.pathname.split("/").pop();
    const movie = movies.find(m => m.slug === path);

    if (movie) {
        document.getElementById("movie-info").innerHTML = `
            <h1>${movie.title}</h1>
            <img src="${movie.poster}" alt="${movie.title}">
            <p>${movie.description}</p>
            <p>Рейтинг: ${movie.rating}</p>
        `;
    }
});
