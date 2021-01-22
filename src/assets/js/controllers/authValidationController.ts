import AuthAPI from "../api/auth-api";

const authAPI = new AuthAPI();

export default function validateAuth(globalStateInstance: IGlobalState): Promise<boolean> {
    const existingUser = globalStateInstance.getProp("currentUser");
    if (existingUser) {
        return Promise.resolve(true);
    }

    return authAPI
        .getCurrentUser()
        .then((currentUser: IUser) => {
            globalStateInstance.setProp("currentUser", currentUser);
            return true;
        })
        .catch((error: XMLHttpRequest) => {
            console.error("[ERROR]", error.response);
            return false;
        });
}
