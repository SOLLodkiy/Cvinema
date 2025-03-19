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

    // Кнопка "Мои билеты"
    const ticketButton = document.getElementById("ticket");
    const modal = document.getElementById("ticket-modal");
    const closeBtn = document.querySelector(".close-btn");
    const ticketList = document.getElementById("ticket-list");
    const noTicketsText = document.getElementById("no-tickets");

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

    // Функция сохранения билета
    function saveTicket(movie, seat, hall) {
        let tickets = JSON.parse(localStorage.getItem("user_tickets")) || [];
        let serial = "CIN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        let expiration = new Date();
        expiration.setDate(expiration.getDate() + 1); // Билет действует 1 день

        tickets.push({ movie, seat, hall, serial, expiration: expiration.toLocaleString() });
        localStorage.setItem("user_tickets", JSON.stringify(tickets));
    }

    bookButton.addEventListener("click", function () {
        selectedSeats.forEach((seatNumber) => {
            let seat = [...document.querySelectorAll('.seat')].find(s => s.textContent == seatNumber);
            if (seat) {
                seat.classList.add("booked");
                seat.classList.remove("selected");
                bookedSeats.add(seatNumber); // Добавляем место в забронированные

                // Сохранение билета
                let movieTitle = document.getElementById("movie-title").textContent;
                let hallNumber = localStorage.getItem("selected_hall") || "1";
                saveTicket(movieTitle, seatNumber, hallNumber);
            }
        });

        selectedSeats.clear(); // Очищаем выбранные места после бронирования
        updateUI();
    });

    // Функция загрузки билетов в модальное окно
    function loadTickets() {
        ticketList.innerHTML = "";
        let tickets = JSON.parse(localStorage.getItem("user_tickets")) || [];

        if (tickets.length === 0) {
            ticketList.appendChild(noTicketsText);
        } else {
            tickets.forEach(ticket => {
                let ticketDiv = document.createElement("div");
                ticketDiv.classList.add("ticket");
                ticketDiv.innerHTML = `
                    <p><strong>Фильм:</strong> ${ticket.movie}</p>
                    <p><strong>Место:</strong> ${ticket.seat}</p>
                    <p><strong>Зал:</strong> ${ticket.hall}</p>
                    <p><strong>Серийный номер:</strong> ${ticket.serial}</p>
                    <p><strong>Действителен до:</strong> ${ticket.expiration}</p>
                `;
                ticketList.appendChild(ticketDiv);
            });
        }
    }

    // Обработчик кнопки "Мои билеты"
    ticketButton.addEventListener("click", () => {
        loadTickets();
        modal.style.display = "flex";
    });

    // Закрытие модального окна
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    renderSeats();
});
