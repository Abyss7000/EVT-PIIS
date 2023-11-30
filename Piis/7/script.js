document.addEventListener('DOMContentLoaded', () => {
    const svgCanvas = document.getElementById('svgCanvas');
    let drawing = false;
    let shape = null;
    let startPoint = null;
    let tempElement = null;

    document.getElementById('drawCircle').addEventListener('click', () => shape = 'circle');
    document.getElementById('drawSquare').addEventListener('click', () => shape = 'square');
    document.getElementById('drawTriangle').addEventListener('click', () => shape = 'triangle');

    svgCanvas.addEventListener('mousedown', (e) => {
        drawing = true;
        startPoint = { x: e.offsetX, y: e.offsetY };
    });

    svgCanvas.addEventListener('mousemove', (e) => {
        if (!drawing || !shape) return;

        if (tempElement) {
            tempElement.remove();
        }

        switch (shape) {
            case 'circle':
                tempElement = drawCircle(startPoint, e.offsetX, e.offsetY, true);
                break;
            case 'square':
                tempElement = drawSquare(startPoint, e.offsetX, e.offsetY, true);
                break;
            case 'triangle':
                tempElement = drawTriangle(startPoint, e.offsetX, e.offsetY, true);
                break;
        }
    });

    svgCanvas.addEventListener('mouseup', (e) => {
        if (drawing && tempElement) {
            tempElement.remove();
            switch (shape) {
                case 'circle':
                    drawCircle(startPoint, e.offsetX, e.offsetY);
                    break;
                case 'square':
                    drawSquare(startPoint, e.offsetX, e.offsetY);
                    break;
                case 'triangle':
                    drawTriangle(startPoint, e.offsetX, e.offsetY);
                    break;
            }
        }
        drawing = false;
        tempElement = null;
    });

    function drawCircle(start, endX, endY, temp = false) {
        let radius = Math.sqrt(Math.pow(endX - start.x, 2) + Math.pow(endY - start.y, 2));
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", start.x);
        circle.setAttribute("cy", start.y);
        circle.setAttribute("r", radius);
        circle.setAttribute("stroke", "black");
        circle.setAttribute("fill", "none");
        svgCanvas.appendChild(circle);
        return temp ? circle : null;
    }

    function drawSquare(start, endX, endY, temp = false) {
        let sideLength = Math.max(Math.abs(endX - start.x), Math.abs(endY - start.y));
        let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        square.setAttribute("x", start.x);
        square.setAttribute("y", start.y);
        square.setAttribute("width", sideLength);
        square.setAttribute("height", sideLength);
        square.setAttribute("stroke", "black");
        square.setAttribute("fill", "none");
        svgCanvas.appendChild(square);
        return temp ? square : null;
    }
    document.getElementById('resetCanvas').addEventListener('click', () => {
        clearCanvas();
    });
    
    function clearCanvas() {
        while (svgCanvas.firstChild) {
            svgCanvas.removeChild(svgCanvas.firstChild);
        }
    }

    function drawTriangle(start, endX, endY, temp = false) {
        let dx = endX - start.x;
        let dy = endY - start.y;
        let points = `${start.x},${start.y} ${start.x + dx},${start.y + dy} ${start.x - dx},${start.y + dy}`;
        let triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        triangle.setAttribute("points", points);
        triangle.setAttribute("stroke", "black");
        triangle.setAttribute("fill", "none");
        svgCanvas.appendChild(triangle);
        return temp ? triangle : null;
    }
});
