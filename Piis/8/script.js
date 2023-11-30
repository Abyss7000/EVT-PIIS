document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drawing = false;
    let shape = null;
    let startPoint = null;
    let shapes = [];

    document.getElementById('drawCircle').addEventListener('click', () => shape = 'circle');
    document.getElementById('drawSquare').addEventListener('click', () => shape = 'square');
    document.getElementById('drawTriangle').addEventListener('click', () => shape = 'triangle');
    document.getElementById('resetCanvas').addEventListener('click', clearCanvas);

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        startPoint = { x: e.offsetX, y: e.offsetY };
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!drawing || !shape) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawCanvas();
        drawShape(shape, startPoint, e.offsetX, e.offsetY, true);
    });

    canvas.addEventListener('mouseup', (e) => {
        if (drawing) {
            shapes.push({shape, start: startPoint, endX: e.offsetX, endY: e.offsetY});
            redrawCanvas();
        }
        drawing = false;
    });

    function drawShape(shape, start, endX, endY, temp = false) {
        switch (shape) {
            case 'circle':
                drawCircle(start, endX, endY);
                break;
            case 'square':
                drawSquare(start, endX, endY);
                break;
            case 'triangle':
                drawTriangle(start, endX, endY);
                break;
        }
    }

    function drawCircle(start, endX, endY) {
        let radius = Math.sqrt(Math.pow(endX - start.x, 2) + Math.pow(endY - start.y, 2));
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    function drawSquare(start, endX, endY) {
        let sideLength = Math.max(Math.abs(endX - start.x), Math.abs(endY - start.y));
        ctx.beginPath();
        ctx.rect(start.x, start.y, sideLength, sideLength);
        ctx.stroke();
    }

    function drawTriangle(start, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(endX, endY);
        ctx.lineTo(2 * start.x - endX, endY);
        ctx.closePath();
        ctx.stroke();
    }

    function clearCanvas() {
        shapes = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function redrawCanvas() {
        shapes.forEach(({ shape, start, endX, endY }) => {
            drawShape(shape, start, endX, endY);
        });
    }
});