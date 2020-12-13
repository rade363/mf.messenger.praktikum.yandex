type TObjectType = {
    [key: string]: any;
};

interface IFieldState {
    value: [() => unknown, (newState: unknown) => unknown];
    error: [() => unknown, (newState: unknown) => unknown];
    inputField: TObjectType | null;
    errorMessage: TObjectType | null;
    mustEqual?: string | undefined;
}

interface IFileState {
    value: [() => unknown, (newState: unknown) => unknown];
}

interface IFormInputState {
    [key: string]: IFieldState | IFileState;
}

interface IFormObject {
    [key: string]: any;
}

interface IListeners {
    [key: string]: ((...args: unknown[]) => unknown)[]
}

interface IEventBus {
    listeners: IListeners;
    on: (INIT: string, callback: unknown) => void;
    off: (INIT: string, callback: unknown) => void;
    emit: (INIT: string, ...args: unknown[]) => void;
}

interface IBlockEvents {
    [key: string]: string;
}

interface IBlockMeta {
    tagName: string;
    props: unknown
}

interface IBlockProps {
    [key: string]: unknown;
}

interface IAttributes {
    [key: string]: string;
}

interface IInputFieldProps {
    label: string;
    type: string;
    name: string;
    mustEqual?: string;
}

interface IDouble {
    type: string;
    children: unknown[];
    attributes: IAttributes;
}

interface IAvatarInput {
    type: string;
    name: string;
    src: string;
    label: string;
    attributes: IAttributes;
}

interface IFormButtonProps {
    attributes: IAttributes;
    text: string;
    eventListeners?: unknown[]
}

type TActionElement = IFormButtonProps | IDouble | string;
type TFormElement = IInputFieldProps | IDouble | IAvatarInput;

interface IFormProps {
    name: string;
    inputFields: TFormElement[];
    actions: TActionElement[];
    onSubmit: (formObject: IFormObject) => unknown
}

interface IChatListItem {
    avatar: string;
    username: string;
    lastMessage: string;
    lastMessageBy: string;
    time: string;
    unread: number;
    isSelected: boolean;
    url?: string;
}

interface ISearchState {
    searchKey: [() => string, (newState: string) => string];
}

interface IContextMenuItem {
    text: string;
    icon: string;
    name: string;
    eventListeners: unknown[]
}

interface IBackButtonProps {
    url: string;
}

type TEventListener = (event: Event) => unknown;
type TEventListenerTemplate = [string, TEventListener];

interface IAttachmentContextButtonProps {
    text: string;
    icon: string;
    name: string;
    eventListeners: TEventListenerTemplate[];
}

interface IButtonProps {
    text?: string;
    attributes?: IAttributes;
    eventListeners?: TEventListenerTemplate[] | unknown[];
}

interface IChatList {
    attributes?: IAttributes;
    items: IChatListItem[];
}

interface IConfirmMessage {
    message: string;
    actions: TActionElement[] | any[];
}

interface IContextButton {
    text: string;
    icon: string;
    name: string;
    eventListeners: TEventListenerTemplate[];
}

interface IContextMenu {
    attributes?: IAttributes;
    items: TObjectType;
}

interface IUserInfo {
    name: string;
    status: string;
}

interface IMessage {
    outgoing: boolean;
    text: string;
    imageUrl: string;
    time: string;
    status: string;
}

interface IConversationMain {
    user: IUserInfo;
    messagesList: IMessage[];
    addUserModal: TObjectType;
    deleteConversationModal: TObjectType;
}

interface IErrorMessage {
    text?: unknown;
    attributes?: IAttributes;
}

interface IFormInput {
    label: string;
    name: string;
    errorMessage: TObjectType;
    input: TObjectType;
}

interface IImageInput {
    attributes?: IAttributes;
    name: string;
    src: string;
    label: string;
    input: TObjectType;
}

interface IInput {
    attributes?: IAttributes;
    eventListeners?: TEventListenerTemplate[];
}

interface IModal {
    name: string;
    title: string;
    child: any;
}