// js/main.js
import { contactService } from './services/contactService.js';
import { ui } from './views/ui.js';

// --- Controller Functions ---
// These functions act as the "glue" between the service and the UI.

/**
 * Handles the "Add Contact" form submission.
 * It gets data from the UI, sends it to the service,
 * and then refreshes the UI.
 */
function handleAddContact() {
  const { name, phone, email } = ui.getAddFormData();
  
  // Basic validation
  if (!name || !phone) {
    alert('Name and Phone Number are required.');
    return;
  }
  
  // 1. Send data to the service
  contactService.addContact(name, phone, email);
  
  // 2. Clear the form
  ui.clearAddForm();
  
  // 3. Refresh the contact list to show the new contact
  refreshContactList();
}

/**
 * Handles the "Delete Contact" button click.
 * It gets the ID from the UI, tells the service to delete,
 * and then refreshes the UI.
 * @param {string} contactId - The ID of the contact to delete.
 */
function handleDeleteContact(contactId) {
  if (confirm('Are you sure you want to delete this contact?')) {
    // 1. Tell the service to delete
    contactService.deleteContact(contactId);
    
    // 2. Refresh the contact list
    refreshContactList();
  }
}

/**
 * Handles the "Search" bar input.
 * It gets the search term from the UI, asks the service
 * for matching contacts, and tells the UI to render them.
 */
function handleSearch() {
  // 1. Get search term from UI
  const searchTerm = ui.getSearchTerm();
  
  // 2. Get filtered contacts from service
  const filteredContacts = contactService.searchContacts(searchTerm);
  
  // 3. Tell UI to render *only* the filtered contacts
  ui.renderContacts(filteredContacts);
}

/**
 * A helper function to get all contacts from the service
 * and tell the UI to render them. This is our main
 * "refresh" function.
 */
function refreshContactList() {
  // 1. Get *all* contacts from the service
  const allContacts = contactService.getAllContacts();
  
  // 2. Tell the UI to render them
  ui.renderContacts(allContacts);
}


// --- Application Initialization ---
// This is where the app "starts".
function init() {
  console.log('Contact Book App Initialized');
  
  // "Bind" the UI events to our controller functions.
  // We are telling the UI:
  // "When the add form is submitted, call handleAddContact."
  ui.bindAddContact(handleAddContact);
  
  // "When a delete button is clicked, call handleDeleteContact."
  ui.bindDeleteContact(handleDeleteContact);
  
  // "When the user types in the search bar, call handleSearch."
  ui.bindSearchContact(handleSearch);
  
  // Load and display all contacts from storage on page load.
  refreshContactList();
}

// Run the initialization function once the DOM is ready.
// (In a module, this runs automatically, but 'DOMContentLoaded'
// is a safer pattern if this were a non-module script).
init();