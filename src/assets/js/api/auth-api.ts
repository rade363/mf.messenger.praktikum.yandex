import HTTPRequest from "../modules/HTTPRequest";

const authAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

export default class AuthAPI {
    signUp(data: ISignUpProps): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/signup", {data});
    }

    signIn(data: ISignIpProps): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/signin", {data});
    }

    getCurrentUser(): Promise<XMLHttpRequest> {
        return authAPIInstance.get("/user");
    }

    logOut(): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/logout");
    }
}