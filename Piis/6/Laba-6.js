let targets = document.querySelectorAll(".target");

let dragging = false;
let sticky = false; 
let offsetX, offsetY; 
let originalX, originalY; 
let currentTarget; 
let touchStartTime; 
let touchStartX, touchStartY; 
let touchEndX, touchEndY; 
let touchThreshold = 300; 
let touchDistance = 10; 

for (let target of targets) {
    target.addEventListener("touchstart", function(event) {
    event.preventDefault();
    let touch = event.touches[0];
    touchStartTime = Date.now();
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    dragging = true;
    currentTarget = target;
    originalX = target.offsetLeft;
    originalY = target.offsetTop;
    offsetX = touch.clientX - target.offsetLeft;
    offsetY = touch.clientY - target.offsetTop;
    target.classList.add("selected");
  });

  target.addEventListener("touchend", function(event) {
    event.preventDefault();
    let touch = event.changedTouches[0];
    touchEndX = touch.clientX;
    touchEndY = touch.clientY;
    let touchTime = Date.now() - touchStartTime;
    let touchDistanceX = Math.abs(touchEndX - touchStartX);
    let touchDistanceY = Math.abs(touchEndY - touchStartY);
    if (touchTime < touchThreshold && touchDistanceX < touchDistance && touchDistanceY < touchDistance) {
      sticky = !sticky;
      originalX = target.offsetLeft;
      originalY = target.offsetTop;
      offsetX = touch.clientX - target.offsetLeft;
      offsetY = touch.clientY - target.offsetTop;
      target.classList.toggle("sticky");
    }
    dragging = false;
    target.classList.remove("selected");
  });
}


document.addEventListener("touchmove", function(event) {
  if (dragging || sticky) {
    event.preventDefault();
    let touch = event.touches[0];
    let newX = touch.clientX - offsetX;
    let newY = touch.clientY - offsetY;
    currentTarget.style.left = newX + "px";
    currentTarget.style.top = newY + "px";
  }
});

document.addEventListener("touchstart", function(event) {
  if (event.touches.length > 1) {
    dragging = false;
    sticky = false;
    currentTarget.classList.remove("selected");
    currentTarget.classList.remove("sticky");
    currentTarget.style.left = originalX + "px";
    currentTarget.style.top = originalY + "px";
  }
});
