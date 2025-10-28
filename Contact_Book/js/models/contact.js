// js/models/contact.js

export class Contact {
  constructor(name, phone, email) {
    // Generate a unique ID for each contact
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.phone = phone;
    this.email = email || ''; // Default to empty string if email is not provided
  }
}