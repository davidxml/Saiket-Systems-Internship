// postForm.js - Manages the form submission event.

const postForm = document.getElementById('post-form');

/*****
 * Sets up the event listener for the post creation form.
 * @param {function} createPostHandler - The function from app.js to call when the form is submitted.
 *
*****/
export const initForm = (createPostHandler) => {
    postForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the browser from performing a standard form submission
        createPostHandler();    // Call the main logic function
    });
};