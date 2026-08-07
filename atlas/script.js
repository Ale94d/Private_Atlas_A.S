const mapContainer = document.getElementById("map-container");

let isDragging = false;

let startX = 0;
let startY = 0;

let currentX = 0;
let currentY = 0;

mapContainer.addEventListener("mousedown",(e)=>{

    isDragging = true;

    startX = e.clientX - currentX;
    startY = e.clientY - currentY;

    mapContainer.style.cursor="grabbing";

});

document.addEventListener("mouseup",()=>{

    isDragging = false;

    mapContainer.style.cursor="grab";

});

document.addEventListener("mousemove",(e)=>{

    if(!isDragging) return;

    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    const limitX = 1200;
    const limitY = 700;

    currentX = Math.max(-limitX,Math.min(limitX,currentX));
    currentY = Math.max(-limitY,Math.min(limitY,currentY));

    mapContainer.style.transform =
    `translate(${currentX}px,${currentY}px) scale(${scale})`;

});

let scale = 1;

document.addEventListener("wheel",(e)=>{

    e.preventDefault();

    if(e.deltaY<0){

        scale+=0.08;

    }else{

        scale-=0.08;

    }

    scale=Math.max(.6,Math.min(scale,4));

    mapContainer.style.transform=
    `translate(${currentX}px,${currentY}px) scale(${scale})`;

},{passive:false});

window.addEventListener("load",()=>{

    currentX = -900;
    currentY = -350;

    mapContainer.style.transform=
    `translate(${currentX}px,${currentY}px) scale(${scale})`;

});

mapContainer.addEventListener("dblclick",()=>{

    currentX = -900;
    currentY = -350;
    scale = 1;

    mapContainer.style.transform =
    `translate(${currentX}px,${currentY}px) scale(${scale})`;

});

const worldMap = document.getElementById("world-map");

worldMap.addEventListener("load",()=>{

    console.log("Mapa cargado correctamente.");

});

const memoryWindow =
document.getElementById("country-memory");

const closeMemory =
document.getElementById("close-memory");

closeMemory.addEventListener("click",()=>{

    memoryWindow.style.display="none";

});