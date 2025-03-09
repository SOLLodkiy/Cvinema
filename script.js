document.addEventListener("DOMContentLoaded", async () => {
    const moviesContainer = document.getElementById("movies-container");
    const movieDetails = document.getElementById("movie-details");

    // Загружаем список фильмов из JSON
    const response = await fetch("movies.json");
    const movies = await response.json();

    // Определяем, какая страница загружена
    const pathParts = window.location.pathname.split("/");
    const isMoviePage = pathParts.length > 2 && pathParts[2]; // Если есть название фильма в URL

    if (!isMoviePage && moviesContainer) {
        // 🏠 Главная страница — показываем афишу фильмов
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>Рейтинг: ${movie.rating}</p>
            `;

            // Переход на страницу фильма
            movieCard.addEventListener("click", () => {
                window.location.href = `/Cvinema/${encodeURIComponent(movie.title)}`;
            });

            moviesContainer.appendChild(movieCard);
        });
    } else if (isMoviePage && movieDetails) {
        // 🎬 Страница фильма — загружаем информацию о фильме
        const movieName = decodeURIComponent(pathParts[2]);
        const movie = movies.find(m => m.title === movieName);

        if (movie) {
            document.title = movie.title;
            document.getElementById("movie-title").textContent = movie.title;

            // Генерация зала (используем старый код генерации мест!)
            let seatsHTML = "<div class='seats'>";
            for (let row = 0; row < 5; row++) {
                seatsHTML += "<div class='seat-row'>";
                for (let col = 0; col < 10; col++) {
                    seatsHTML += `<div class="seat" data-seat="${row}-${col}"></div>`;
                }
                seatsHTML += "</div>";
            }
            seatsHTML += "</div>";

            movieDetails.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" style="width: 300px; border-radius: 10px;">
                <p>${movie.description}</p>
                <p><strong>Рейтинг:</strong> ${movie.rating}</p>
                <h3>Выберите место:</h3>
                ${seatsHTML}
                <button onclick="confirmBooking()">Забронировать</button>
            `;

            loadSeats(movieName); // Загружаем сохранённые места
            document.querySelectorAll(".seat").forEach(seat => {
                seat.addEventListener("click", () => toggleSeat(seat, movieName));
            });
        } else {
            movieDetails.innerHTML = "<p>Фильм не найден.</p>";
        }
    }
});

// Функция возврата на главную
function goBack() {
    window.location.href = "/Cvinema";
}

// Функция для выбора места
function toggleSeat(seat, movieName) {
    const seatId = seat.dataset.seat;
    let bookedSeats = JSON.parse(localStorage.getItem(movieName) || "[]");

    if (bookedSeats.includes(seatId)) {
        bookedSeats = bookedSeats.filter(s => s !== seatId);
        seat.classList.remove("booked");
    } else {
        bookedSeats.push(seatId);
        seat.classList.add("booked");
    }

    localStorage.setItem(movieName, JSON.stringify(bookedSeats));
}

// Загружаем сохранённые места
function loadSeats(movieName) {
    const bookedSeats = JSON.parse(localStorage.getItem(movieName) || "[]");
    document.querySelectorAll(".seat").forEach(seat => {
        if (bookedSeats.includes(seat.dataset.seat)) {
            seat.classList.add("booked");
        }
    });
}

// Подтверждение бронирования
function confirmBooking() {
    alert("Места забронированы!");
}
