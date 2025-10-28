// js/services/contactService.js
import { Contact } from '../models/contact.js';

// The main "database" for our app.
// We'll initialize it by trying to load from localStorage.
let contacts = loadContactsFromStorage();

function saveContactsToStorage() {
  // localStorage can only store strings, so we convert the array to a JSON string.
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsFromStorage() {
  const contactsJson = localStorage.getItem('contacts');
  if (contactsJson) {
    // If we have data, parse the JSON string back into an array of objects.
    // We then map it back into Contact class instances to ensure methods (if any)
    // are available.
    const contactsData = JSON.parse(contactsJson);
    return contactsData.map(c => Object.assign(new Contact(), c));
  }
  return []; // Return an empty array if no data is found
}

// This 'contactService' object is what we will export.
// It exposes a clean API for our application to use.
export const contactService = {
  
  /**
   * Gets all contacts.
   * @returns {Array<Contact>} A copy of the contacts array.
   */
  getAllContacts: () => {
    // Return a *copy* to prevent accidental modification from outside
    return [...contacts];
  },

  /**
   * Adds a new contact to the list and saves to storage.
   * @param {string} name 
   * @param {string} phone 
   * @param {string} email 
   */
  addContact: (name, phone, email) => {
    const newContact = new Contact(name, phone, email);
    contacts.push(newContact);
    saveContactsToStorage();
    console.log('Contact added:', newContact);
  },

  /**
   * Deletes a contact by its ID and saves to storage.
   * @param {string} contactId The ID of the contact to delete.
   */
  deleteContact: (contactId) => {
    contacts = contacts.filter(contact => contact.id !== contactId);
    saveContactsToStorage();
    console.log('Contact deleted:', contactId);
  },

  /**
   * Searches for contacts whose name includes the search term.
   * @param {string} searchTerm The text to search for.
   * @returns {Array<Contact>} An array of matching contacts.
   */
  searchContacts: (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    if (!lowerCaseSearchTerm) {
      return [...contacts]; // Return all if search is empty
    }
    
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
};