(function () {
    let view = {};
    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        view = initView();

        view.logoutButton.addEventListener("click", logOut)
    }

    function initView() {
        return {
            logoutButton: document.querySelector(".profile__log-out-button")
        };
    }

    function logOut(event) {
        event.preventDefault();
        console.log("[INFO] Logging out will be implemented later in the course");
    }
})();