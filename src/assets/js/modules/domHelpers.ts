import Router from "./Router";
import Login from "../pages/Login/index";
import Register from "../pages/Register/index";
import Chats from "../pages/Chats/index";
import Conversation from "../pages/Conversation/index";
import Profile from "../pages/Profile/index";
import ProfileEditInfo from "../pages/ProfileEditInfo/index";
import ProfileChangePassword from "../pages/ProfileChangePassword/index";
import NotFound from "../pages/404/index";
import ServerError from "../pages/500/index";
import {API_URL} from "../constants/index";

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

export function setImageUpload(event: Event, callback: (avatar: File, context: IBlock) => unknown, context: IBlock): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files !== null && files.length !== undefined) {
        const image = files[0];
        console.log("[INFO] Image uploaded", files);
        callback(image, context);
    }
}

export function createAPIUrl(path: string): string {
    return `${API_URL}${path}`;
}