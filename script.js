document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.getElementById('seats-container');

    const totalSeats = 32;  // Общее количество мест
    const seatsPerRow = 12; // Максимальное количество мест в одном ряду

    seatsContainer.innerHTML = ''; // Очищаем контейнер

    let fullRows = Math.floor(totalSeats / seatsPerRow);
    let remainingSeats = totalSeats % seatsPerRow;

    // Генерируем полные ряды
    for (let i = 0; i < fullRows; i++) {
        let row = document.createElement('div');
        row.classList.add('seat-row');

        for (let j = 0; j < seatsPerRow; j++) {
            let seat = document.createElement('div');
            seat.classList.add('seat');
            seat.textContent = i * seatsPerRow + j + 1;
            row.appendChild(seat);
        }

        seatsContainer.appendChild(row);
    }

    // Генерируем оставшиеся места и центрируем их
    if (remainingSeats > 0) {
        let lastRow = document.createElement('div');
        lastRow.classList.add('seat-row');
        lastRow.style.justifyContent = "center"; // Центрируем последнюю строку

        for (let k = 0; k < remainingSeats; k++) {
            let seat = document.createElement('div');
            seat.classList.add('seat');
            seat.textContent = fullRows * seatsPerRow + k + 1;
            lastRow.appendChild(seat);
        }

        seatsContainer.appendChild(lastRow);
    }
});
