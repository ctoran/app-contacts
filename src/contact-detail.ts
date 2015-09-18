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

  activate(params: any, config: RouteConfig) {
    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = contact;
      config.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactViewed(contact));
    });
  }

  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactUpdated(this.contact));
    });
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
