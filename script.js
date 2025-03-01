document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.getElementById('seats-container');
    const totalSeats = 32;
    const seatsPerRow = 12;
    
    seatsContainer.innerHTML = ''; // Очищаем контейнер
    let fullRows = Math.floor(totalSeats / seatsPerRow);
    let remainingSeats = totalSeats % seatsPerRow;
    
    // Создаём кнопку "Забронировать"
    const bookButton = document.createElement("button");
    bookButton.textContent = "Забронировать";
    bookButton.classList.add("book-button");
    bookButton.style.display = "none"; // Скрываем кнопку изначально
    document.body.appendChild(bookButton);

    // Всплывающая цена
    const priceTooltip = document.createElement("div");
    priceTooltip.classList.add("price-tooltip");
    priceTooltip.textContent = "1200 тг";
    document.body.appendChild(priceTooltip);

    let selectedSeats = new Set(); // Храним выбранные места

    // Обновление кнопки "Забронировать"
    function updateBookButton() {
        if (selectedSeats.size > 0) {
            bookButton.style.display = "block";
        } else {
            bookButton.style.display = "none";
        }
    }

    // Функция обновления позиции ценника
    function updateTooltipPosition(event) {
        priceTooltip.style.left = event.pageX + 10 + "px";
        priceTooltip.style.top = event.pageY + 10 + "px";
    }

    // Генерируем полные ряды
    for (let i = 0; i < fullRows; i++) {
        let row = document.createElement('div');
        row.classList.add('seat-row');

        for (let j = 0; j < seatsPerRow; j++) {
            let seat = createSeat(i * seatsPerRow + j + 1);
            row.appendChild(seat);
        }

        seatsContainer.appendChild(row);
    }

    // Генерируем оставшиеся места
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

    // Функция создания места
    function createSeat(number) {
        let seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = number;

        // Наведение (показываем цену)
        seat.addEventListener("mouseenter", function () {
            if (!seat.classList.contains("booked")) {
                priceTooltip.style.display = "block";
            }
        });

        seat.addEventListener("mouseleave", function () {
            priceTooltip.style.display = "none";
        });

        seat.addEventListener("mousemove", updateTooltipPosition);

        // Клик по месту (выбор)
        seat.addEventListener("click", function () {
            if (seat.classList.contains("booked")) return; // Заблокированные места нельзя нажимать

            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected"); // Убираем выбор (зеленый)
                selectedSeats.delete(number);
            } else {
                seat.classList.add("selected"); // Выбираем (желтый)
                selectedSeats.add(number);
            }

            updateBookButton();
        });

        return seat;
    }

    // Нажатие на кнопку "Забронировать"
    bookButton.addEventListener("click", function () {
        selectedSeats.forEach((seatNumber) => {
            let seat = [...document.querySelectorAll('.seat')].find(s => s.textContent == seatNumber);
            if (seat) {
                seat.classList.add("booked"); // Делаем место красным
                seat.classList.remove("selected");
            }
        });

        selectedSeats.clear();
        updateBookButton();
    });
});
