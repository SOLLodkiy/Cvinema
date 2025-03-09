document.addEventListener("DOMContentLoaded", async () => {
    const moviesContainer = document.getElementById("movies-container");

    // Загружаем список фильмов из JSON
    const response = await fetch("movies.json");
    const movies = await response.json();

    // Определяем, на какой странице мы находимся
    const currentHash = window.location.hash.replace("#", "");

    if (currentHash === "home" || !currentHash) {
        // Главная страница — отображаем афишу
        moviesContainer.innerHTML = ""; // Очищаем контейнер

        movies.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie-card");
            movieElement.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>Рейтинг: ${movie.rating}</p>
            `;
            movieElement.addEventListener("click", () => {
                window.location.hash = encodeURIComponent(movie.title);
            });
            moviesContainer.appendChild(movieElement);
        });
    } else {
        // Если выбран фильм — загружаем его данные
        loadMoviePage(currentHash, movies);
    }
});

// Функция загрузки страницы фильма
function loadMoviePage(movieTitle, movies) {
    const movie = movies.find(m => encodeURIComponent(movie.title) === movieTitle);
    if (!movie) {
        document.body.innerHTML = "<h1>Фильм не найден</h1>";
        return;
    }

    // Случайное назначение зала (если ещё не назначен)
    if (!localStorage.getItem(`hall_${movie.title}`)) {
        const randomHall = Math.floor(Math.random() * 6) + 1;
        localStorage.setItem(`hall_${movie.title}`, randomHall);
    }

    const hallNumber = localStorage.getItem(`hall_${movie.title}`);

    document.body.innerHTML = `
        <header>
            <div class="logo">
                <a href="#home"><img src="images/logo_cvinema.png" alt="Cvinema" width="350"></a>
            </div>
        </header>
        <button class="back-button" onclick="window.location.hash='home'">← Назад</button>
        <main>
            <h1>${movie.title}</h1>
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <p>${movie.description}</p>
            <p><strong>Рейтинг:</strong> ${movie.rating}</p>
            <p><strong>Зал:</strong> ${hallNumber}</p>
            <h2>Выберите место</h2>
            <div id="seats-container"></div>
            <button class="book-button" onclick="confirmBooking('${movie.title}')">Забронировать</button>
        </main>
    `;

    generateSeats(movie.title);
}

// Функция генерации мест
function generateSeats(movieTitle) {
    const seatsContainer = document.getElementById("seats-container");
    seatsContainer.innerHTML = ""; // Очищаем контейнер

    for (let row = 0; row < 5; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("seat-row");

        for (let seat = 0; seat < 10; seat++) {
            const seatId = `${row}-${seat}`;
            const seatDiv = document.createElement("div");
            seatDiv.classList.add("seat");
            seatDiv.dataset.seat = seatId;

            // Проверяем, забронировано ли место
            let bookedSeats = JSON.parse(localStorage.getItem(`booked_${movieTitle}`) || "[]");
            if (bookedSeats.includes(seatId)) {
                seatDiv.classList.add("booked");
            }

            seatDiv.addEventListener("click", () => toggleSeat(seatDiv, movieTitle));
            rowDiv.appendChild(seatDiv);
        }

        seatsContainer.appendChild(rowDiv);
    }
}

// Функция выбора места
function toggleSeat(seat, movieTitle) {
    const seatId = seat.dataset.seat;
    let bookedSeats = JSON.parse(localStorage.getItem(`booked_${movieTitle}`) || "[]");

    if (bookedSeats.includes(seatId)) {
        bookedSeats = bookedSeats.filter(s => s !== seatId);
        seat.classList.remove("booked");
    } else {
        bookedSeats.push(seatId);
        seat.classList.add("booked");
    }

    localStorage.setItem(`booked_${movieTitle}`, JSON.stringify(bookedSeats));
}

// Подтверждение бронирования
function confirmBooking(movieTitle) {
    alert("Места забронированы!");
}
