import HTTPRequest from "../modules/HTTPRequest.js";

const authAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

export default class AuthAPI {
    signUp(data: ISignUpProps) {
        return authAPIInstance.post("/signup", {data});
    }

    signIn(data: ISignIpProps) {
        return authAPIInstance.post("/signin", {data});
    }

    getCurrentUser() {
        return authAPIInstance.get("/user");
    }

    logOut() {
        return authAPIInstance.post("/logout");
    }
}