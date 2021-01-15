import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./DeleteUsersList.handlebars";
import Button from "../Button/index";
import handleUserClick from "../../controllers/excludeUserController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";

export default class DeleteUsersList extends Block {
    constructor(props: IDeleteUsersListProps) {
        const currentUser = globalStateInstance.getProp("currentUser");
        super("div", {
            ...props,
            users: props.users.reduce((acc: IDeleteUserProps[], user: IUser) => {
                if (user.id !== currentUser.id) {
                    acc.push({
                        login: user.login,
                        deleteButton: new Button("button", {
                            text: "Delete",
                            attributes: {
                                class: "button button_danger button_wide"
                            },
                            eventListeners: [["click", () => handleUserClick(user)]]
                        })
                    });
                }
                return acc;
            }, [])
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
