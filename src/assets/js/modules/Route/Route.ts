import {isEqual} from "../helpers";
import {renderInterface} from "../domHelpers";

export default class Route {
    _pathname: string;
    _blockClass: IBlockConstructable;
    _block: null | IBlock;
    _props: TObjectType;

    constructor(pathname: string, view: IBlockConstructable, props: TObjectType) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.detach();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass("div", {});
        }

        renderInterface(this._props.rootQuery, this._block);
    }

    refresh(): void {
        if (this._block) {
            this._block = new this._blockClass("div", {});
        }
    }
}