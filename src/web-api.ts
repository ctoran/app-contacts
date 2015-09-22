let latency = 0;
let id = 0;

function getId() {
  return ++id;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

let contacts: Contact[] = [
  {
    id:getId(),
    firstName:'John',
    lastName:'Tolkien',
    email:'tolkien@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Clive',
    lastName:'Lewis',
    email:'lewis@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Owen',
    lastName:'Barfield',
    email:'barfield@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Charles',
    lastName:'Williams',
    email:'williams@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Roger',
    lastName:'Green',
    email:'green@inklings.com',
    phoneNumber:'867-5309'
  }
];

export class WebAPI {
  isRequesting: boolean;

  sleep(msecs: number) {
    return new Promise((resolve: any) => setTimeout(resolve, msecs));
  }
  
  async simulateLatency() {
      this.isRequesting = true;
      await this.sleep(latency);
      this.isRequesting = false;
  }
  
  async getContactList(): Promise<Contact[]> {
    await this.simulateLatency();
    return contacts.map(x => <Contact>{
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        email: x.email,
        phoneNumber: x.phoneNumber
    });
  }

  async getContactDetails(id: number): Promise<Contact> {
    await this.simulateLatency();
    let found = contacts.filter(x => x.id == id)[0];
    return JSON.parse(JSON.stringify(found));
  }

  async saveContact(contact: Contact): Promise<Contact> {
    await this.simulateLatency();
    let instance = JSON.parse(JSON.stringify(contact));
    let found = contacts.filter(x => x.id == contact.id)[0];

    if (found) {
      let index = contacts.indexOf(found);
      contacts[index] = instance;
    } else {
      instance.id = getId();
      contacts.push(instance);
    }

    return instance;
  }
  
}
