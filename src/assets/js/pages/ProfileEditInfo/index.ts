import Block from "../../modules/Block/Block";
import BackButton from "../../components/BackButton/index";
import template from "./template.handlebars";
import compile from "../../modules/templator/templator";
import Router from "../../modules/Router/Router";
import validateAuth from "../../controllers/authValidationController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";
import createProfileForm from "../../controllers/editProfileController";

const router = new Router("#root");

export default class ProfileEditInfo extends Block {
    constructor() {
        const currentUser: IUser = globalStateInstance.getProp("currentUser");

        super("div", {
            attributes: {
                class: "wrapper wrapper_background_profile"
            },
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/",
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            router.back();
                        }
                    ]
                ]
            }),
            child: createProfileForm(currentUser)
        });
    }

    componentDidMount(): void {
        validateAuth(globalStateInstance)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    throw new Error("Not authorized");
                }

                const currentUser = globalStateInstance.getProp("currentUser");
                const child = createProfileForm(currentUser);
                this.setProps({ child });
            })
            .catch((error: XMLHttpRequest | Error) => {
                console.error("[ERROR] Could not set profile edit info", error);
                if (error instanceof Error) {
                    if (error.message === "Not authorized") {
                        router.go("/login/");
                    }
                }
            });
    }

    render(): Element | null {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton,
            child: this.props.child
        });
    }
}
