declare module 'aurelia-app' {
  import {Router, RouterConfiguration} from 'aurelia-router';

  export interface AureliaApp {
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router): void;
  }

}
