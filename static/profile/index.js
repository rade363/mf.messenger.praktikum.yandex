(function () {
    let view = {};
    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        view = initView();

        view.avatarInput.addEventListener("change", submitAvatarChange);
    }

    function initView() {
        return {
            avatarInput: document.querySelector(".profile-pic__input")
        };
    }

    function submitAvatarChange(event) {
        const {files} = event.target;
        console.log("[INFO] Image will be changed later in the course", files);
    }
})();