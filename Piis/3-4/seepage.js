let currentSide = 'front'; // Переменная для отслеживания текущей стороны майки

function loadShirtDetails() {
    const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));
    if (!selectedShirt) {
        console.error('No shirt selected.');
        return;
    }

    const shirtDetailsContainer = document.getElementById('shirt-details');
    const firstColorKey = Object.keys(selectedShirt.colors)[0];
    const firstColor = selectedShirt.colors[firstColorKey];

    shirtDetailsContainer.innerHTML = `
        <h2>${selectedShirt.name}</h2>
        <p>${selectedShirt.description}</p>
        <p>Price: ${selectedShirt.price}</p>
        <div class="shirt-image-container">
            <img src="${firstColor[currentSide]}" alt="${selectedShirt.name} - ${firstColorKey}" id="shirt-image">
            <button onclick="changeShirtSide('front')">Front</button>
            <button onclick="changeShirtSide('back')">Back</button>
        </div>
        <div class="shirt-colors-container">
            ${Object.keys(selectedShirt.colors).map(color => `
                <button style="background-color: ${color};" onclick="changeShirtColor('${color}')">${color}</button>
            `).join('')}
        </div>
    `;
}

function changeShirtColor(color) {
    const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));
    if (selectedShirt && selectedShirt.colors[color]) {
        const shirtImage = document.getElementById('shirt-image');
        shirtImage.src = selectedShirt.colors[color][currentSide];
        shirtImage.alt = `${selectedShirt.name} - ${color}`;
    }
}

function changeShirtSide(side) {
    currentSide = side; // Обновляем текущую сторону майки
    const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));
    const currentColorKey = document.getElementById('shirt-image').alt.split(' - ')[1];
    const currentColor = selectedShirt.colors[currentColorKey];

    if (currentColor) {
        const shirtImage = document.getElementById('shirt-image');
        shirtImage.src = currentColor[currentSide];
    }
}

window.onload = loadShirtDetails;
