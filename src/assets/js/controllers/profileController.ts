import { createAPIUrl } from "../modules/domHelpers";
import { NO_AVATAR_IMG } from "../constants/index";

function createUserProperty(type: string, title: string, currentUser: IUser | null): IUserProperty {
    if (currentUser && type in currentUser && typeof currentUser[type] === "string") {
        const value = currentUser[type];
        if (typeof value === "string") {
            return { type, title, value };
        }
    }
    return { type, title, value: "" };
}

export default function createExistingUser(currentUser: IUser | null): ICurrentUserDetails {
    const avatar =
        currentUser && currentUser.avatar ? { isEmpty: false, url: createAPIUrl(currentUser.avatar) } : { isEmpty: true, url: NO_AVATAR_IMG };
    const fullname = currentUser && currentUser.first_name && currentUser.second_name ? `${currentUser.first_name} ${currentUser.second_name}` : "";
    const infoBlock = [];

    infoBlock.push(createUserProperty("email", "Email", currentUser));
    infoBlock.push(createUserProperty("login", "Login", currentUser));
    infoBlock.push(createUserProperty("first_name", "First name", currentUser));
    infoBlock.push(createUserProperty("second_name", "Last name", currentUser));
    infoBlock.push(createUserProperty("display_name", "Display name", currentUser));
    infoBlock.push(createUserProperty("phone", "Phone", currentUser));

    return {
        avatar,
        fullname,
        infoBlock
    };
}
