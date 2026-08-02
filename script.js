/* =====================================
   PRIVATE ATLAS
   HOME V2
===================================== */

const workspaces = document.querySelectorAll(".workspace");

workspaces.forEach(workspace => {

    workspace.addEventListener("click", () => {

        // Oculta los demás
        workspaces.forEach(item => {

            if(item !== workspace){

                item.classList.add("hidden");

            }

        });

        // Selecciona el actual
        workspace.classList.add("selected");

        console.log(
            workspace.querySelector("span").textContent
        );

    });

});

// Botón de personalización

const customize =
document.querySelector(".customize-btn");

customize.addEventListener("click",()=>{

    alert("Próximamente podrás personalizar Private Atlas.");

});