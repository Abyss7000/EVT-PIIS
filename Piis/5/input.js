let targets = document.querySelectorAll(".target");

let dragging = false; 
let sticky = false; 
let offsetX, offsetY; 
let originalX, originalY; 
let currentTarget; 

for (let target of targets) {
    target.style.backgroundColor = 'red'; // Set initial color to red

    target.addEventListener("mousedown", function(event) {
        dragging = true;
        currentTarget = target;
        originalX = target.offsetLeft;
        originalY = target.offsetTop;
        offsetX = event.clientX - target.offsetLeft;
        offsetY = event.clientY - target.offsetTop;
        target.classList.add("selected");
        if (sticky && currentTarget === target) {
            target.style.backgroundColor = 'green'; // Change color to green when dragging in sticky mode
        }
    });

    target.addEventListener("mouseup", function(event) {
        dragging = false;
        target.classList.remove("selected");
        if (sticky && currentTarget === target) {
            target.style.backgroundColor = 'green'; // Reset color to red when mouse is up in sticky mode
        }
    });

    target.addEventListener("dblclick", function(event) {
        // Turn on sticky mode
        sticky = true;
        currentTarget = target;
        originalX = target.offsetLeft;
        originalY = target.offsetTop;
        offsetX = event.clientX - target.offsetLeft;
        offsetY = event.clientY - target.offsetTop;
        target.classList.add("sticky");
        if (sticky && currentTarget === target) {
            target.style.backgroundColor = 'green'; // Reset color to red when mouse is up in sticky mode
        }
    });

    target.addEventListener("click", function(event) {
        if (sticky && currentTarget === target) {
            // Turn off sticky mode
            sticky = false;
            currentTarget.style.backgroundColor = 'red'; // Reset color to red
            currentTarget.classList.remove("sticky");
        }
    });
}

document.addEventListener("mousemove", function(event) {
    if (dragging || (sticky && currentTarget)) {
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;
        currentTarget.style.left = newX + "px";
        currentTarget.style.top = newY + "px";
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        dragging = false;
        sticky = false;
        currentTarget.classList.remove("selected");
        currentTarget.classList.remove("sticky");
        currentTarget.style.backgroundColor = 'red'; // Reset color to red when escape is pressed
        currentTarget.style.left = originalX + "px";
        currentTarget.style.top = originalY + "px";
    }
});
