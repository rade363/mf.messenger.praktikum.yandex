import Router from "../modules/Router/Router";
import Login from "../pages/Login/index";
import Register from "../pages/Register/index";
import Chats from "../pages/Chats/index";
import Conversation from "../pages/Conversation/index";
import Profile from "../pages/Profile/index";
import ProfileEditInfo from "../pages/ProfileEditInfo/index";
import ProfileChangePassword from "../pages/ProfileChangePassword/index";
import NotFound from "../pages/404/index";
import ServerError from "../pages/500/index";

export default function initInterface(): void {
    const router = new Router("#root");
    router
        .use("/login/", Login)
        .use("/register/", Register)
        .use("/chats/", Chats)
        .use("/conversation/", Conversation)
        .use("/profile/", Profile)
        .use("/profile-edit-info/", ProfileEditInfo)
        .use("/profile-change-password/", ProfileChangePassword)
        .use("/404/", NotFound)
        .use("/500/", ServerError)
        .start();
}
