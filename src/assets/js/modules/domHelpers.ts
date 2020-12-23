import Router from "./Router.js";
import Login from "../pages/Login/index.js";
import Register from "../pages/Register/index.js";
import Chats from "../pages/Chats/index.js";
import Conversation from "../pages/Conversation/index.js";
import Profile from "../pages/Profile/index.js";
import ProfileEditInfo from "../pages/ProfileEditInfo/index.js";
import ProfileChangePassword from "../pages/ProfileChangePassword/index.js";
import NotFound from "../pages/404/index.js";
import ServerError from "../pages/500/index.js";

export function initInterface(): void {
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

export function renderInterface(query: string, block: IBlock): void {
    console.log('[RENDER INTERFACE]');
    const rootElement = document.querySelector(query) as HTMLElement;
    const pageElement = block.getContent();
    if (rootElement && pageElement) {
        rootElement.appendChild(pageElement);
        connectBlockWithDom(rootElement, block);
    }
}

export function connectBlockWithDom(domElement: HTMLElement, block: any): void {
    if (block.uniqueId !== undefined) {
        const exactElement = domElement.querySelector(`.uid${block.uniqueId}`) as HTMLElement;
        if (exactElement) {
            block.connectElement(exactElement);

            Object.values(block.props).forEach(prop => connectBlockWithDom(domElement, prop));
        }
    } else if (Array.isArray(block)) {
        block.forEach(element => {
            if (typeof element === "object") {
                Object.values(element).forEach((value) => connectBlockWithDom(domElement, value))
            }
        });
    }
}

export function setImageUpload(event: Event, callback: (avatar: File) => unknown): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files !== null && files.length !== undefined) {
        const image = files[0];
        console.log("[INFO] Image uploaded", image);
        callback(files[0]);
    }
}