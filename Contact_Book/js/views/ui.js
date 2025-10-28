// js/views/ui.js

// --- DOM Element Selectors ---
// We select all the HTML elements we need to interact with once.
const contactListEl = document.getElementById('contact-list');
const addFormEl = document.getElementById('add-contact-form');
const nameInputEl = document.getElementById('name');
const phoneInputEl = document.getElementById('phone');
const emailInputEl = document.getElementById('email');
const searchBarEl = document.getElementById('search-bar');

// This 'ui' object is what we will export.
export const ui = {

  /**
   * Renders an array of contact objects to the HTML list.
   * @param {Array} contacts - The array of contacts to display.
   */
  renderContacts: (contacts) => {
    // Clear the list first to prevent duplicates
    contactListEl.innerHTML = '';
    
    if (contacts.length === 0) {
      contactListEl.innerHTML = '<li>No contacts found.</li>';
      return;
    }

    contacts.forEach(contact => {
      const li = document.createElement('li');
      
      // Use data-id attribute to store the contact's unique ID
      li.dataset.id = contact.id; 
      
      li.innerHTML = `
        <div class="contact-details">
          <strong>${contact.name}</strong>
          <span>${contact.phone}</span>
          <span>${contact.email || ''}</span>
        </div>
        <button class="delete-btn">Delete</button>
      `;
      contactListEl.appendChild(li);
    });
  },

  /**
   * Gets the values from the "Add Contact" form fields.
   * @returns {object} An object with name, phone, and email properties.
   */
  getAddFormData: () => {
    return {
      name: nameInputEl.value.trim(),
      phone: phoneInputEl.value.trim(),
      email: emailInputEl.value.trim()
    };
  },

  /**
   * Gets the current value of the search bar.
   * @returns {string} The search term.
   */
  getSearchTerm: () => {
    return searchBarEl.value.trim();
  },

  /**
   * Clears the input fields of the "Add Contact" form.
   */
  clearAddForm: () => {
    addFormEl.reset(); // Resets the form to its default state
  },


  // --- Event Binding Functions ---
  // These functions connect the DOM events to the "controller" functions in main.js.

  /**
   * Attaches an event listener to the "Add Contact" form submission.
   * @param {function} handler - The controller function to call on submit.
   */
  bindAddContact: (handler) => {
    addFormEl.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the browser from refreshing
      handler();
    });
  },

  /**
   * Attaches an event listener to the "Search" bar.
   * @param {function} handler - The controller function to call on keyup.
   */
  bindSearchContact: (handler) => {
    // 'keyup' fires every time the user releases a key
    searchBarEl.addEventListener('keyup', handler);
  },

  /**
   * Attaches an event listener to the contact list for handling deletes.
   * This uses "event delegation" to efficiently listen for clicks
   * on all 'delete' buttons, even ones added in the future.
   * @param {function} handler - The controller function to call on click.
   */
  bindDeleteContact: (handler) => {
    contactListEl.addEventListener('click', (event) => {
      // Check if the clicked element has the 'delete-btn' class
      if (event.target.classList.contains('delete-btn')) {
        // Find the parent 'li' element to get its 'data-id'
        const parentLi = event.target.closest('li');
        const id = parentLi.dataset.id;
        handler(id);
      }
    });
  }
};