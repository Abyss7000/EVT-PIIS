// Предполагается, что массив shirts загружен из файла shirts.js
function generateContent(shirts) {
    const grid = document.getElementById('shirt-grid');

    shirts.forEach(shirt => {
        const card = document.createElement('div');
        card.className = 'shirt-card';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'shirt-image';
        const image = document.createElement('img');
        const firstColor = Object.keys(shirt.colors)[0];
        image.src = shirt.colors[firstColor].front;
        image.alt = shirt.name;
        imageDiv.appendChild(image);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'shirt-details';
        detailsDiv.innerHTML = `<h3>${shirt.name}</h3><p>Available in ${Object.keys(shirt.colors).length} colors</p>`;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'shirt-actions';
        const seePageButton = document.createElement('button');
        seePageButton.textContent = 'See Page';
        seePageButton.onclick = () => {
            localStorage.setItem('selectedShirt', JSON.stringify(shirt));
            window.location.href = 'seePage.html';
        };
        actionsDiv.appendChild(seePageButton);

        card.appendChild(imageDiv);
        card.appendChild(detailsDiv);
        card.appendChild(actionsDiv);
        grid.appendChild(card);
    });
}

window.onload = () => generateContent(shirts);
