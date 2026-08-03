/* =====================================
   PRIVATE ATLAS
   HOME V2
===================================== */

const workspaces = document.querySelectorAll(".workspace");

workspaces.forEach(workspace => {

    workspace.addEventListener("click", () => {

        if(workspace.classList.contains("selected")){

            workspaces.forEach(item => {

                item.classList.remove("selected");
                item.classList.remove("hidden");

            });

            return;

        }

        workspaces.forEach(item => {

            item.classList.remove("selected");

            if(item !== workspace){

                item.classList.add("hidden");

            }else{

                item.classList.remove("hidden");

            }

        });

        workspace.classList.add("selected");

        console.log(
            workspace.querySelector("span").textContent
        );

    });

});

// Botón de personalización

const customize =
document.querySelector(".customize-btn");
const appearancePanel = 
document.querySelector(".appearance-panel");
customize.addEventListener("click",()=>{
    appearancePanel.classList.toggle("active");
});

document
.querySelector(".close-appearance")
.addEventListener("click",() => {

    appearancePanel.classList.remove("active");
});

document.addEventListener("click",(e)=>{
    if(
        !
        appearancePanel.contains(e.target) &&
        !customize.contains(e.target)
    ){
        appearancePanel.classList.remove("active");
    }

});