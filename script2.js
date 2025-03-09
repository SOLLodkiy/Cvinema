document.addEventListener("DOMContentLoaded", () => {
    const movies = [
        { "title": "Дюна: Часть вторая", "poster": "https://ru-images.kinorium.com/movie/300/2808886.jpg?1736334495", "slug": "Dune-Part-Two" },
        { "title": "Оппенгеймер", "poster": "https://ru-images.kinorium.com/movie/300/2828885.jpg?1690229381", "slug": "Oppenheimer" },
        { "title": "Барби", "poster": "https://ru-images-s.kinorium.com/movie/300/501616.jpg?1694458556", "slug": "Barbie" },
        { "title": "Аватар: Путь воды", "poster": "https://ru-images-s.kinorium.com/movie/300/528138.jpg?1683110297", "slug": "Avatar-Way-of-Water" },
        { "title": "Человек-паук: Через вселенные", "poster": "https://ru-images.kinorium.com/movie/300/1446885.jpg?1654075889", "slug": "Spider-Man-Across-the-Spider-Verse" },
        { "title": "Соник 3", "poster": "https://ru-images-s.kinorium.com/movie/300/8663323.jpg?1731588344", "slug": "Sonic-3" }
    ];

    const posterGrid = document.querySelector(".poster-grid");

    movies.forEach(movie => {
        const poster = document.createElement("img");
        poster.src = movie.poster;
        poster.alt = movie.title;
        poster.addEventListener("click", () => {
            window.location.href = `/Cvinema/${movie.slug}`;
        });

        posterGrid.appendChild(poster);
    });
});
