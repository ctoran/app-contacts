import {AureliaApp} from 'aurelia-app';
import {Router, RouterConfiguration} from 'aurelia-router';
import {WebAPI} from './web-api';
import 'bootstrap/css/bootstrap.css!';
import 'font-awesome/css/font-awesome.css!';

export class App implements AureliaApp {
  router: Router;
  api: WebAPI;

  static inject = [WebAPI];
  constructor(api: WebAPI) {
    this.api = api;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Contacts';
    config.map([
      { route: '',             moduleId: 'no-selection',   title: 'Select'},
      { route: 'contacts/:id', moduleId: 'contact-detail', name:'contacts' }
    ]);

    this.router = router;
  }
}
