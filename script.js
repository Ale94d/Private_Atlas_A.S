const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.getElementById("toggle-sidebar");
const desktop = document.getElementById("desktop");


// COLAPSAR SIDEBAR
toggleBtn.addEventListener("click", () => {

    sidebar.classList.toggle("collapsed");

    if(sidebar.classList.contains("collapsed")){
        desktop.style.marginLeft = "70px";
    } else {
        desktop.style.marginLeft = "250px";
    }

});


// BOTONES DEL MENÚ
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const section = button.dataset.section;

        openWindow(section);

    });

});


// ABRIR VENTANAS
function openWindow(section){

    // TEMPLATE VENTANA
    const windowTemplate =
    document.getElementById("window-template");

    const newWindow =
    windowTemplate.content.firstElementChild.cloneNode(true);



    // TÍTULO
    const title =
    section.charAt(0).toUpperCase() + section.slice(1);

    newWindow.querySelector(".window-title").textContent = title;



    // CONTENIDO
    const contentTemplate =
    document.getElementById(`content-${section}`);

    const content =
    contentTemplate.content.cloneNode(true);

    newWindow
    .querySelector(".window-content")
    .appendChild(content);



    // POSICIÓN
    newWindow.style.top = "100px";
    newWindow.style.left = "100px";



    // CERRAR
    newWindow
    .querySelector(".window-close")
    .addEventListener("click", () => {

        newWindow.remove();

    });

    function dragWindow(windowElement){
        const header =
        windowElement.querySelector(".window-header");

        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        header.addEventListener("mousedown",(e)=>{
            isDragging = true;
            offsetX = 
            e.clientX - windowElement.offsetLeft;
            offsetY =
            e.clienteY - windowElement.offsetTop;
        });
        document.addEventListener("mousemove",(e)=>{
            if(!isDragging) return;
            windowElement.style.left =
            e.clientX - offsetX + "px";
            windowElement.style.top =
            e.clientY - offsetY + "px";
        });
        document.addEventListener("mouseup",()=>{
            isDragging = false;
        });
    }



    // AGREGAR AL DESKTOP
    dragwindow(newWindow);
    desktop.appendChild(newWindow);

}