import HTTPRequest from "../modules/HTTPRequest/HTTPRequest";

const avatarAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/user/profile"
});

export default class AvatarAPI {
    changeAvatar = (data: FormData): Promise<XMLHttpRequest> => {
        return avatarAPIInstance.put("/avatar", { data });
    };
}
