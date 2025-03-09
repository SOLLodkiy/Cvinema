document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/Cvinema/") {
        loadMovies();
    } else {
        loadMovieDetails();
    }
});

function loadMovies() {
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
                movieDiv.onclick = () => {
                    window.location.href = `/Cvinema/${movie.id}`;
                };
                container.appendChild(movieDiv);
            });
        });
}

function loadMovieDetails() {
    const movieId = window.location.pathname.split("/").pop();
    
    fetch("movies.json")
        .then(response => response.json())
        .then(movies => {
            const movie = movies.find(m => m.id === movieId);
            if (!movie) {
                window.location.href = "/Cvinema/";
                return;
            }

            document.getElementById("movie-title").textContent = movie.title;
            document.getElementById("movie-description").textContent = movie.description;
            document.getElementById("movie-image").src = movie.poster;
            document.getElementById("movie-rating").textContent = movie.rating;
            
            let hall = localStorage.getItem(`hall-${movie.id}`);
            if (!hall) {
                hall = `Зал ${Math.floor(Math.random() * 5) + 1}`;
                localStorage.setItem(`hall-${movie.id}`, hall);
            }
            document.getElementById("movie-hall").textContent = hall;

            loadSeats(movie.id);
        });
}

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

    localStorage.setItem(`seats-${movieId}`, JSON.stringify(seats));
}

function confirmBooking() {
    const movieId = window.location.pathname.split("/").pop();
    let seats = JSON.parse(localStorage.getItem(`seats-${movieId}`)) || Array(30).fill(false);
    
    document.querySelectorAll(".seat.selected").forEach(seat => {
        const index = parseInt(seat.textContent) - 1;
        seats[index] = true;
    });

    localStorage.setItem(`seats-${movieId}`, JSON.stringify(seats));
    alert("Места забронированы!");
    location.reload();
}

function goToMain() {
    window.location.href = "/Cvinema/";
}
