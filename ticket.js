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