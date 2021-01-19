type TObjectType = {
    [key: string]: any;
};
type TRequestMethod = "GET" | "PUT" | "POST" | "DELETE";
type TActionElement = IFormButtonProps | IDouble | string;
type TFormElement = IInputFieldProps | IDouble | IAvatarInput;
type TEventListener = (event: Event) => any;
type TEventListenerTemplate = [string, TEventListener];
type THandlebarsPrecompiler = (props: TObjectType) => string;

interface IBlock {
    uniqueId: string | null;

    props: TObjectType;
    oldProps: TObjectType;

    eventBus: () => IEventBus;

    _makePropsProxy: (props: TObjectType) => TObjectType;
    _registerEvents: (eventBus: IEventBus) => void;
    _createResources: () => void;
    _createDocumentElement: (tagName: string) => HTMLElement;
    _componentDidMount: () => void;
    _componentDidUpdate: () => void;
    _render: () => void | null;

    init: () => void;
    componentDidMount: () => void;
    componentDidUpdate: (oldProps: TObjectType, newProps: TObjectType) => boolean;
    setProps: (nextProps: TObjectType) => void | boolean;
    element: HTMLElement | null;
    render: () => Element | null;
    getContent: () => HTMLElement | null;
    connectElement: (domElement: HTMLElement | null) => void | null;
    rerenderComponent: () => void;
    show: () => void;
    hide: () => void;
    detach: () => void;
}

interface IBlockConstructable {
    new (tagName: string, props: TObjectType): IBlock;
}

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
    [key: string]: ((...args: unknown[]) => unknown)[];
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
    props: TObjectType;
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
    value?: string;
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
    callback?: (avatar: File, imageInput: IBlock) => void;
}

interface IFormButtonProps {
    attributes: IAttributes;
    text: string;
    eventListeners?: unknown[];
}

interface IFormProps {
    name: string;
    inputFields: TFormElement[];
    actions: TActionElement[];
    onSubmit: (formObject: IFormObject) => unknown;
}

interface IChatListItem {
    avatar: string;
    title: string;
    lastMessage: string;
    lastMessageBy: string;
    time: string;
    unread: number;
    isSelected: boolean;
    id: number;
    url?: string;
}

interface ISearchState {
    searchKey: [() => string, (newState: string) => string];
}

interface IContextMenuItem {
    text: string;
    icon: string;
    name: string;
    eventListeners: unknown[];
}

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

interface IContextMenuProps {
    attributes?: IAttributes;
    items: IBlock[];
}

interface IConversationUserInfo {
    name: string;
    isOnline: boolean;
}

interface IMessage {
    outgoing: boolean;
    text: string;
    imageUrl: string;
    time: string;
    status: "sent" | "read";
    isGroup: boolean;
    username: string;
}

interface IConversationMain {
    userInfo: IConversationUserInfo;
    messagesList: IMessage[];
    addUserModal: IBlock;
    deleteConversationModal: IBlock;
    deleteUserModal: IBlock;
}

interface IConversationActions {
    addUserModal: IBlock;
    deleteConversationModal: IBlock;
    deleteUserModal: IBlock;
}

interface IConversationActionsMenu extends IConversationActions {
    setIsConversationActionsMenuOpen: (isOpen: boolean) => unknown;
}

interface IMessagesList {
    messagesList: IMessage[];
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
    eventListeners?: any[];
}

interface IModal {
    name: string;
    title: string;
    child: any;
}

interface IMethodsList {
    [key: string]: TRequestMethod;
}

interface IRequestHeaders {
    [key: string]: string;
}

interface IRequestOptions {
    method?: TRequestMethod;
    headers?: IRequestHeaders;
    data?: TObjectType;
    timeout?: number;
}

interface IFetchRequestOptions extends IRequestOptions {
    method: TRequestMethod;
}

interface IFetchWithRetryOptions extends IFetchRequestOptions {
    retries: number;
}

interface IRoute {
    _pathname: string;
    _blockClass: IBlockConstructable;
    _block: IBlock;
    _props: TObjectType;

    navigate: (pathName: string) => void;
    leave: () => void;
    match: (pathname: string) => boolean;
}

interface IRootQuery {
    rootQuery: string;
}

interface IRouter {
    __instance?: this;
    _currentRoute: unknown;
    _rootQuery: string;
    _onRoute: (pathname: string) => void;

    routes: IRoute[];
    history: History;

    use: (pathname: string, block: IBlockConstructable, props: IRootQuery) => IRouter;
    start: () => void;
    go: (pathname: string) => void;
    back: () => void;
    forward: () => void;
}

interface ISignUpProps {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

interface ISignIpProps {
    login: string;
    password: string;
}

interface IDefaultOptions {
    url?: string;
    headers?: IRequestHeaders;
}

interface IUserProperty {
    type: string;
    title: string;
    value: string;
}

interface IUserAvatar {
    isEmpty: boolean;
    url: string;
}

interface ICurrentUserDetails {
    avatar: IUserAvatar;
    fullname: string;
    infoBlock: IUserProperty[];
}

interface IUser {
    [key: string]: unknown;
    id: number;
    login: string;
    email: null | string;
    avatar: null | string;
    first_name: null | string;
    second_name: null | string;
    display_name: null | string;
    phone: null | string;
}

interface IUpdateUserProps {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone?: string;
}

interface IUpdatePasswordProps {
    oldPassword: string;
    newPassword: string;
}

interface INewChatProps {
    title: string;
}

interface IDeleteChatProps {
    chatId: number;
}

interface IChatActionUsersProps {
    users: number[];
    chatId: number;
}

interface ISearchInputProps {
    search: (login: string) => unknown;
}

interface ISearchRequestProps {
    login: string;
}

interface IExistingChat {
    id: number;
    title: string;
    avatar: string;
}

interface IGlobalState {
    state: TObjectType;
    setProp: (propName: string, possibleCallback: unknown) => void;
    getProp: (propName: string) => any;
    check: () => TObjectType;
}

interface INewGroupChatTitle {
    title: string;
}

interface IDeleteUsersListProps {
    users: IUser[];
    closeButton: IBlock;
}

interface IDeleteUserProps {
    login: string;
    deleteButton: IBlock;
}

interface IInputElement {
    inputField: IBlock;
}

interface IActionElement {
    action: TActionElement | IBlock;
}

interface IUserConnected {
    content: string;
    type: "user connected";
}

interface ISocketMessage {
    id: number;
    user_id: number;
    time: string;
    content: string;
    chat_id: number;
}

interface ISocketNewMessage {
    id: number;
    userId: number;
    time: string;
    content: string;
    type: "message";
}
