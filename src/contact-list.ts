import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI,Contact} from './web-api';
import {ContactUpdated, ContactViewed} from './messages';
import {ContactDetail} from './contact-detail';

@autoinject
export class ContactList {
  contacts: Contact[] = [];
  selectedId: number;

  constructor(public api: WebAPI, ea: EventAggregator) {
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.filter(x => x.id == id)[0];
      Object.assign(found, msg.contact);
    });
  }

  created(): void {
    this.api.getContactList().then(contacts => {
      this.contacts = contacts;
    });
  }

  select(contact: Contact) {
    this.selectedId = contact.id;
    return true;
  }
}
