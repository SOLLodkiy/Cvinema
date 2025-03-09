document.addEventListener("DOMContentLoaded", () => {
    router(); // Загружаем контент в зависимости от URL
    window.addEventListener("popstate", router); // Отслеживаем назад/вперед
});

function router() {
    const path = window.location.pathname.split("/").pop();
    
    if (!path || path === "Cvinema") {
        loadMovies(); // Главная страница
    } else {
        loadMovieDetails(path); // Страница фильма
    }
}

// Загружаем список фильмов
function loadMovies() {
    document.body.innerHTML = `
        <header>
            <h1 onclick="goToMain()">Cvinema</h1>
        </header>
        <main>
            <h2>Афиша</h2>
            <div id="movies-container"></div>
        </main>
    `;

    fetch("movies.json")
        .then(response => response.json())
        .then(movies => {
            const container = document.getElementById("movies-container");
            container.innerHTML = "";

            movies.forEach(movie => {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie-card");
                movieDiv.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                `;
                movieDiv.onclick = () => changeURL(movie.id);
                container.appendChild(movieDiv);
            });
        });
}

// Загружаем детали фильма
function loadMovieDetails(movieId) {
    fetch("movies.json")
        .then(response => response.json())
        .then(movies => {
            const movie = movies.find(m => m.id === movieId);
            if (!movie) {
                goToMain();
                return;
            }

            // Меняем title страницы
            document.title = `Cvinema - ${movie.title}`;

            // Создаём разметку фильма
            document.body.innerHTML = `
                <header>
                    <span class="back-arrow" onclick="goToMain()">←</span>
                    <h1 onclick="goToMain()">Cvinema</h1>
                </header>

                <main>
                    <div id="movie-info">
                        <h2>${movie.title}</h2>
                        <p>${movie.description}</p>
                        <img id="movie-image" src="${movie.poster}" alt="Постер фильма">
                        <p>Оценка: ${movie.rating}</p>
                    </div>

                    <div id="booking">
                        <h3>Бронирование мест</h3>
                        <p>Зал: <span id="movie-hall"></span></p>
                        <div id="seats-container"></div>
                        <button onclick="confirmBooking('${movie.id}')">Забронировать</button>
                    </div>
                </main>
            `;

            let hall = localStorage.getItem(`hall-${movie.id}`);
            if (!hall) {
                hall = `Зал ${Math.floor(Math.random() * 5) + 1}`;
                localStorage.setItem(`hall-${movie.id}`, hall);
            }
            document.getElementById("movie-hall").textContent = hall;

            loadSeats(movie.id);
        });
}

// Меняет URL и загружает новый контент
function changeURL(movieId) {
    history.pushState(null, "", `/Cvinema/${movieId}`);
    router();
}

// Возвращает на главную страницу
function goToMain() {
    history.pushState(null, "", "/Cvinema");
    router();
}

// Загружаем и создаём сиденья
function loadSeats(movieId) {
    const seatsContainer = document.getElementById("seats-container");
    seatsContainer.innerHTML = "";
    let seats = JSON.parse(localStorage.getItem(`seats-${movieId}`)) || Array(30).fill(false);

    seats.forEach((isBooked, index) => {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = index + 1;
        if (isBooked) seat.classList.add("booked");
        
        seat.onclick = () => {
            if (!seat.classList.contains("booked")) {
                seat.classList.toggle("selected");
            }
        };

        seatsContainer.appendChild(seat);
    });
}

// Подтверждение бронирования
function confirmBooking(movieId) {
    let seats = JSON.parse(localStorage.getItem(`seats-${movieId}`)) || Array(30).fill(false);
    
    document.querySelectorAll(".seat.selected").forEach(seat => {
        const index = parseInt(seat.textContent) - 1;
        seats[index] = true;
    });

    localStorage.setItem(`seats-${movieId}`, JSON.stringify(seats));
    alert("Места забронированы!");
    loadSeats(movieId);
}
