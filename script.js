const workspaces = document.querySelectorAll(".workspace");

const workspaceLinks = {
    atlas: "atlas/index.html",
    planner: "life-planner/index.html",
    journal: "daily-journal/index.html",
    baul: "baul/index.html",
    timeline: "timeline/index.html"
};

workspaces.forEach(workspace => {
    workspace.addEventListener("click", () => {
        const destination = workspaceLinks[
            [...workspace.classList].find(className =>
                Object.prototype.hasOwnProperty.call(workspaceLinks, className)
            )
        ];

        if (!destination) return;

        workspaces.forEach(item => {
            item.classList.remove("selected");
            item.classList.remove("hidden");
        });

        workspace.classList.add("selected");

        setTimeout(() => {
            window.location.href = destination;
        }, 350);
    });
});

window.addEventListener("pageshow", () => {
    workspaces.forEach(workspace => {
        workspace.classList.remove("selected");
        workspace.classList.remove("hidden");
    });
});

const customize = document.querySelector(".customize-btn");
const appearancePanel = document.querySelector(".appearance-panel");
const closeAppearance = document.querySelector(".close-appearance");

const profileBtn = document.querySelector(".profile-btn");
const closeProfile = document.querySelector(".close-profile");

const inputBackground = document.getElementById("background-input");
const uploadButton = document.querySelector(".upload-background");
const defaultTheme = document.querySelector(".theme-btn");

if (customize && appearancePanel) {
    customize.addEventListener("click", event => {
        event.stopPropagation();

        appearancePanel.classList.toggle("active");

        if (profileBtn) {
            profileBtn.classList.remove("active");
        }
    });
}

if (closeAppearance && appearancePanel) {
    closeAppearance.addEventListener("click", event => {
        event.stopPropagation();
        appearancePanel.classList.remove("active");
    });
}

if (uploadButton && inputBackground) {
    uploadButton.addEventListener("click", event => {
        event.stopPropagation();
        inputBackground.click();
    });

    inputBackground.addEventListener("change", event => {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = event => {
            const background = event.target.result;

            document.body.style.backgroundImage = `url("${background}")`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";

            localStorage.setItem(
                "privateAtlasBackground",
                background
            );
        };

        reader.readAsDataURL(file);
    });
}

if (defaultTheme) {
    defaultTheme.addEventListener("click", event => {
        event.stopPropagation();

        document.body.style.backgroundImage =
            "url('assets/images/default.jpg')";

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        localStorage.removeItem("privateAtlasBackground");
    });
}

const savedBackground =
    localStorage.getItem("privateAtlasBackground");

if (savedBackground) {
    document.body.style.backgroundImage =
        `url("${savedBackground}")`;
} else {
    document.body.style.backgroundImage =
        "url('assets/images/default.jpg')";
}

document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";

if (profileBtn) {
    profileBtn.addEventListener("click", event => {
        event.stopPropagation();

        profileBtn.classList.toggle("active");

        if (appearancePanel) {
            appearancePanel.classList.remove("active");
        }
    });
}

if (closeProfile && profileBtn) {
    closeProfile.addEventListener("click", event => {
        event.stopPropagation();
        profileBtn.classList.remove("active");
    });
}

document.addEventListener("click", event => {
    if (
        appearancePanel &&
        !appearancePanel.contains(event.target) &&
        customize &&
        !customize.contains(event.target)
    ) {
        appearancePanel.classList.remove("active");
    }

    if (
        profileBtn &&
        !profileBtn.contains(event.target)
    ) {
        profileBtn.classList.remove("active");
    }
});