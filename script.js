document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.getElementById('seats-container');
    const totalSeats = 52;
    const seatsPerRow = 14;
    const seatPrice = 1200;

    let bookedSeats = new Set(); // Забронированные места (только на время сессии)
    let selectedSeats = new Set(); // Выбранные места перед бронированием

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
                bookedSeats.add(seatNumber); // Добавляем место в забронированные
            }
        });

        selectedSeats.clear(); // Очищаем выбранные места после бронирования
        updateUI();
    });

    renderSeats();
});

document.addEventListener("DOMContentLoaded", function () {
    const ticketButton = document.getElementById("ticket");
    const ticketPopup = document.getElementById("ticket-popup");
    const ticketList = document.getElementById("ticket-list");
    const closeButton = document.querySelector(".close-btn");

    ticketButton.addEventListener("click", function () {
        updateTicketsUI();
        ticketPopup.style.display = "flex";
    });

    closeButton.addEventListener("click", function () {
        ticketPopup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === ticketPopup) {
            ticketPopup.style.display = "none";
        }
    });

    function updateTicketsUI() {
        const tickets = JSON.parse(localStorage.getItem("userTickets")) || [];
        ticketList.innerHTML = "";

        if (tickets.length === 0) {
            ticketList.textContent = "На вашем аккаунте нет активных билетов.";
            return;
        }

        tickets.forEach(ticket => {
            const ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");

            ticketDiv.innerHTML = `
                <p><strong>Фильм:</strong> ${ticket.movie}</p>
                <p><strong>Зал:</strong> ${ticket.hall}</p>
                <p><strong>Место:</strong> ${ticket.seat}</p>
                <p><strong>Серийный номер:</strong> <span class="ticket-number">${ticket.serial}</span></p>
                <p><strong>Истекает:</strong> ${ticket.expiry}</p>
            `;

            ticketList.appendChild(ticketDiv);
        });
    }

    function generateSerialNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    function addTicket(movie, seat, hall) {
        let tickets = JSON.parse(localStorage.getItem("userTickets")) || [];
        let expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 2);

        tickets.push({
            movie: movie,
            seat: seat,
            hall: hall,
            serial: generateSerialNumber(),
            expiry: expiryDate.toLocaleString()
        });

        localStorage.setItem("userTickets", JSON.stringify(tickets));
    }

    // Вызов функции при бронировании
    document.querySelector(".book-button").addEventListener("click", function () {
        const movieName = new URLSearchParams(window.location.search).get("name");
        const hall = localStorage.getItem(`hall_${movieName}`) || "Неизвестен";
        
        selectedSeats.forEach(seat => addTicket(movieName, seat, hall));

        updateTicketsUI();
    });
});

