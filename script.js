document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.getElementById('seats-container');
    const hallSelect = document.getElementById("hall-select");
    const totalSeats = 52;
    const seatsPerRow = 14;
    const seatPrice = 1200;

    // Объект для хранения информации о каждом зале
    const hallsData = {
        1: new Set(),
        2: new Set(),
        3: new Set(),
        4: new Set(),
        5: new Set(),
        6: new Set()
    };

    let selectedSeats = new Set();
    let currentHall = hallSelect.value;

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

    // Всплывающая цена
    const priceTooltip = document.createElement("div");
    priceTooltip.classList.add("price-tooltip");
    priceTooltip.textContent = "1200 тг";
    document.body.appendChild(priceTooltip);

    function updateUI() {
        if (selectedSeats.size > 0) {
            bookButton.style.display = "block";
            totalPrice.style.display = "block";
            totalPrice.textContent = `Общая сумма: ${selectedSeats.size * seatPrice} тг`;
        } else {
            bookButton.style.display = "none";
            totalPrice.style.display = "none";
        }
    }

    function updateTooltipPosition(event) {
        priceTooltip.style.left = event.pageX + 10 + "px";
        priceTooltip.style.top = event.pageY + 10 + "px";
    }

    function renderSeats() {
        seatsContainer.innerHTML = "";
        let fullRows = Math.floor(totalSeats / seatsPerRow);
        let remainingSeats = totalSeats % seatsPerRow;
        selectedSeats = new Set(hallsData[currentHall]); // Загружаем данные текущего зала

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
    }

    function createSeat(number) {
        let seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = number;

        if (hallsData[currentHall].has(number)) {
            seat.classList.add("booked");
        }

        seat.addEventListener("mouseenter", function () {
            if (!seat.classList.contains("booked")) {
                priceTooltip.style.display = "block";
            }
        });

        seat.addEventListener("mouseleave", function () {
            priceTooltip.style.display = "none";
        });

        seat.addEventListener("mousemove", updateTooltipPosition);

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
                hallsData[currentHall].add(seatNumber); // Сохраняем данные для текущего зала
            }
        });

        selectedSeats.clear();
        updateUI();
    });

    hallSelect.addEventListener("change", function () {
        currentHall = hallSelect.value;
        renderSeats(); // Перерисовываем места для выбранного зала
    });

    renderSeats(); // Начальный рендеринг
});
