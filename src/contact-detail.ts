import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteConfig} from 'aurelia-app';
import {WebAPI,Contact} from './web-api';
import {ContactUpdated,ContactViewed} from './messages';
import {areEqual} from './utility';

@autoinject
export class ContactDetail {
  constructor(public api: WebAPI, public ea: EventAggregator) {
  }

  contact: Contact;
  originalContact: Contact;

  async activate(params: any, config: RouteConfig) {
    this.contact = await this.api.getContactDetails(params.id);
    config.navModel.setTitle(this.contact.firstName);
    this.originalContact = JSON.parse(JSON.stringify(this.contact));
    this.ea.publish(new ContactViewed(this.contact));
  }

  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  async save() {
    this.contact = await this.api.saveContact(this.contact);
    this.originalContact = JSON.parse(JSON.stringify(this.contact));
    this.ea.publish(new ContactUpdated(this.contact));
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
