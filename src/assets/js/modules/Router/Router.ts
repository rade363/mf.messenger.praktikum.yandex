import Route from "../Route/Route";

export default class Router {
    private static __instance: Router;

    _currentRoute: null | Route;
    _rootQuery: string;

    routes: Route[];
    history: History;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: IBlockConstructable): this {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = (event: PopStateEvent): void => {
            const popEvent = event.currentTarget as Window;
            if (popEvent) {
                this._onRoute(popEvent.location.pathname);
            }
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        if (route) {
            this._currentRoute = route;
            route.render();
        } else {
            this.go("/404/");
        }
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}