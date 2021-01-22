import HTTPRequest from "../modules/HTTPRequest/HTTPRequest";

const authAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

export default class AuthAPI {
    signUp = (data: ISignUpProps): Promise<ISignUpResponse> => {
        return authAPIInstance.post("/signup", { data });
    };

    signIn = (data: ISignIpProps): Promise<TOkResponse> => {
        return authAPIInstance.post("/signin", { data });
    };

    getCurrentUser = (): Promise<IUser> => {
        return authAPIInstance.get("/user");
    };

    logOut = (): Promise<TOkResponse> => {
        return authAPIInstance.post("/logout");
    };
}
