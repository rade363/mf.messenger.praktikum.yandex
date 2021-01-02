import HTTPRequest from "../modules/HTTPRequest.js";

const userAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/user",
    headers: {
        "Content-Type": "application/json"
    }
});

export default class UserAPI {
    editProfile(data: IUpdateUserProps): Promise<XMLHttpRequest> {
        return userAPIInstance.put("/profile", {data});
    }

    changePassword(data: IUpdatePasswordProps): Promise<XMLHttpRequest> {
        return userAPIInstance.put("/password", {data});
    }

    searchUserByLogin(data: ISearchRequestProps): Promise<XMLHttpRequest> {
        return userAPIInstance.post("/search", {data});
    }

    getUserById(id: number): Promise<XMLHttpRequest> {
        return userAPIInstance.get(`/${id}`, {});
    }
}