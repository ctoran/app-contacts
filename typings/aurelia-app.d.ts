declare module 'aurelia-app' {
  import {Router, RouterConfiguration} from 'aurelia-router';

  export interface AureliaApp {
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router): void;
  }

  import {RouteConfig as RouteMap, NavModel} from 'aurelia-router';

  export interface RouteConfig extends RouteMap {
    /**
      * Navigation model. The [[RouteConfig]] only has a [[NavModel]] after it is configured.
      */
    navModel?: NavModel;
  }

}
