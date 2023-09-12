import { RouteInfo } from '../types';
import View from './view';

export default class Router {
  defaultPage: RouteInfo | null;
  routeList: RouteInfo[];

  constructor() {
    this.defaultPage = null;
    this.routeList = [];

    window.addEventListener('hashchange', this.route.bind(this));
  }

  setDefaultPage(defaultView: View): void {
    this.defaultPage = { path: '', view: defaultView };
  }

  addRouteList(path: string, view: View): void {
    this.routeList.push({ path, view });
  }

  route(): void {
    const currentHash = window.location.hash;

    if (currentHash === '' && this.defaultPage) {
      this.defaultPage.view.render();
      return;
    }

    for (const route of this.routeList) {
      if (currentHash.indexOf(route.path) >= 0) {
        route.view.render();
        return;
      }
    }
  }
}
