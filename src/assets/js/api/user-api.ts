import HTTPRequest from "../modules/HTTPRequest/HTTPRequest";

const userAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/user",
    headers: {
        "Content-Type": "application/json"
    }
});

export default class UserAPI {
    editProfile = (data: IUpdateUserProps): Promise<IUser> => {
        return userAPIInstance.put("/profile", { data });
    };

    changePassword = (data: IUpdatePasswordProps): Promise<TOkResponse> => {
        return userAPIInstance.put("/password", { data });
    };

    searchUserByLogin = (data: ISearchRequestProps): Promise<IUser[]> => {
        return userAPIInstance.post("/search", { data });
    };
}
