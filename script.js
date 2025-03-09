document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.getElementById('seats-container');
    const totalSeats = 52;
    const seatsPerRow = 14;
    const seatPrice = 1200;

    // Получаем зал из localStorage (он был задан в movie.js)
    const currentHall = localStorage.getItem("currentMovieHall") || "1";
    const currentMovie = new URLSearchParams(window.location.search).get("movie") || "unknown";

    // Уникальный ключ для сохранения мест каждого фильма
    const storageKey = `seats_${currentMovie}_hall${currentHall}`;

    // Загружаем данные о забронированных местах из localStorage
    let bookedSeats = new Set(JSON.parse(localStorage.getItem(storageKey)) || []);
    let selectedSeats = new Set();

    // Кнопка "Забронировать"
    const bookButton = document.createElement("button");
    bookButton.textContent = "Забронировать";
    bookButton.classList.add("book-button");
    bookButton.style.display = "none";
    document.body.appendChild(bookButton);

    // Блок для отображения суммы
    const totalPrice = document.createElement("p");
    totalPrice.classList.add("total-price");
    totalPrice.textContent = "Общая сумма: 0 тг";
    totalPrice.style.display = "none";
    document.body.appendChild(totalPrice);

    function updateUI() {
        const hasSelectedSeats = selectedSeats.size > 0;
        bookButton.style.display = hasSelectedSeats ? "block" : "none";
        totalPrice.style.display = hasSelectedSeats ? "block" : "none";

        if (hasSelectedSeats) {
            totalPrice.textContent = `Общая сумма: ${selectedSeats.size * seatPrice} тг`;
        }
    }

    function renderSeats() {
        seatsContainer.innerHTML = "";
        let fullRows = Math.floor(totalSeats / seatsPerRow);
        let remainingSeats = totalSeats % seatsPerRow;

        for (let i = 0; i < fullRows; i++) {
            let row = document.createElement('div');
            row.classList.add('seat-row');

            for (let j = 0; j < seatsPerRow; j++) {
                let seat = createSeat(i * seatsPerRow + j + 1);
                row.appendChild(seat);
            }

            seatsContainer.appendChild(row);
        }

        if (remainingSeats > 0) {
            let lastRow = document.createElement('div');
            lastRow.classList.add('seat-row');
            lastRow.style.justifyContent = "center";

            for (let k = 0; k < remainingSeats; k++) {
                let seat = createSeat(fullRows * seatsPerRow + k + 1);
                lastRow.appendChild(seat);
            }

            seatsContainer.appendChild(lastRow);
        }

        updateUI();
    }

    function createSeat(number) {
        let seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = number;

        if (bookedSeats.has(number)) {
            seat.classList.add("booked"); // Красный цвет (забронировано)
        } else if (selectedSeats.has(number)) {
            seat.classList.add("selected"); // Жёлтый цвет (выбрано)
        }

        seat.addEventListener("click", function () {
            if (seat.classList.contains("booked")) return;

            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                selectedSeats.delete(number);
            } else {
                seat.classList.add("selected");
                selectedSeats.add(number);
            }

            updateUI();
        });

        return seat;
    }

    bookButton.addEventListener("click", function () {
        selectedSeats.forEach((seatNumber) => {
            let seat = [...document.querySelectorAll('.seat')].find(s => s.textContent == seatNumber);
            if (seat) {
                seat.classList.add("booked");
                seat.classList.remove("selected");
                bookedSeats.add(seatNumber); // Сохраняем бронирование
            }
        });

        selectedSeats.clear(); // Очищаем выбранные места после бронирования
        localStorage.setItem(storageKey, JSON.stringify([...bookedSeats])); // Сохраняем забронированные места
        updateUI();
    });

    renderSeats();
});
