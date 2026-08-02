/* ======================================
   PRIVATE ATLAS A.S.
   HOME V1.0
====================================== */

const workspaces = document.querySelectorAll(".workspace");

workspaces.forEach(workspace => {

    workspace.addEventListener("click", () => {

        // Reiniciar estado
        workspaces.forEach(item => {

            item.classList.remove("selected");
            item.classList.remove("hidden");

        });

        // Seleccionar el workspace
        workspace.classList.add("selected");

        // Ocultar los demás
        workspaces.forEach(item => {

            if(item !== workspace){

                item.classList.add("hidden");

            }

        });

        // Nombre del Workspace
        const workspaceName =
            workspace.classList[1];

        console.log("Workspace:", workspaceName);

        // Aquí irá la animación de entrada
        // y la carga del Workspace.

    });

});