/* =====================================
   PRIVATE ATLAS
===================================== */

const workspaces = document.querySelectorAll(".workspace");

workspaces.forEach(workspace => {

    workspace.addEventListener("click", () => {

        // Si ya estaba seleccionado, vuelve al inicio
        if (workspace.classList.contains("selected")) {

            workspaces.forEach(item => {

                item.classList.remove("selected");
                item.classList.remove("hidden");

            });

            return;

        }

        // Oculta los demás
        workspaces.forEach(item => {

            if (item !== workspace) {

                item.classList.add("hidden");

            } else {

                item.classList.remove("hidden");

            }

            item.classList.remove("selected");

        });

        workspace.classList.add("selected");

    });

});

/* =====================================
   PERSONALIZAR
===================================== */

const customize = document.querySelector(".customize-btn");
const appearancePanel = document.querySelector(".appearance-panel");
const closeAppearance = document.querySelector(".close-appearance");

if (customize && appearancePanel) {

    customize.addEventListener("click", (e) => {

        e.stopPropagation();

        appearancePanel.classList.toggle("active");

    });

}

if (closeAppearance) {

    closeAppearance.addEventListener("click", () => {

        appearancePanel.classList.remove("active");

    });

}

/* =====================================
   CERRAR PANEL
===================================== */

document.addEventListener("click", (e) => {

    if (
        appearancePanel &&
        !appearancePanel.contains(e.target) &&
        !customize.contains(e.target)
    ) {

        appearancePanel.classList.remove("active");

    }

});

/* =====================================
   CAMBIAR FONDO
===================================== */

const inputBackground = document.getElementById("background-input");
const uploadButton = document.querySelector(".upload-background");

if (uploadButton && inputBackground) {

    uploadButton.addEventListener("click", () => {

        inputBackground.click();

    });

    inputBackground.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            document.body.style.backgroundImage = `url('${e.target.result}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";

            localStorage.setItem(
                "privateAtlasBackground",
                e.target.result
            );

        };

        reader.readAsDataURL(file);

    });

}

/* =====================================
   FONDO CLÁSICO
===================================== */

const defaultTheme = document.querySelector(".theme-btn");

if (defaultTheme) {

    defaultTheme.addEventListener("click", () => {

        document.body.style.backgroundImage =
        "url('./assets/images/default.jpg')";

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        localStorage.removeItem("privateAtlasBackground");

    });

}

/* =====================================
   CARGAR FONDO
===================================== */

const savedBackground = localStorage.getItem("privateAtlasBackground");

if (savedBackground) {

    document.body.style.backgroundImage = `url('${savedBackground}')`;

} else {

    document.body.style.backgroundImage =
    "url('assets/images/default.jpg')";

}

document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";

/* =====================================
   PERFIL
===================================== */

const profileBtn = document.querySelector(".profile-btn");

if(profileBtn){

    profileBtn.addEventListener("click",()=>{

        e.stopPropagation();

        profileBtn.classList.toggle("active");

    });

    const profilePanel =
        document.querySelector(".profile-panel"
        );
    const closeProfile =
        document.querySelector(".close-profile"
        );

    if(closeProfile){
        closeProfile.addEventListener("click",
            ()=>{
                profileBtn.classList.remove("active");
            });
    }

}