// ui.js - Handles all DOM manipulation: reading data from the form and rendering posts.

// Get all necessary DOM elements
const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');
const postTitleInput = document.getElementById('post-title');
const mainLogInput = document.getElementById('main-log');
const keyTakeawaysInput = document.getElementById('key-takeaways');
const dailyReflectionInput = document.getElementById('daily-reflection');
const modeToggleButton = document.getElementById('mode-toggle');

/**
 * Reads the values from the post creation form.
 * @returns {object} An object containing the four data fields.
 */
export const getPostFormData = () => {
    return {
        title: postTitleInput.value.trim(),
        content: mainLogInput.value.trim(),
        keyTakeaways: keyTakeawaysInput.value.trim(),
        reflection: dailyReflectionInput.value.trim()
    };
};

/**
 * Clears the input fields after a post has been saved.
 */
export const clearForm = () => {
    postTitleInput.value = '';
    mainLogInput.value = '';
    keyTakeawaysInput.value = '';
    dailyReflectionInput.value = '';
};

/**
 * Generates the HTML string for a single post card.
 * @param {object} post - The post object.
 * @returns {string} The HTML markup for the post.
 */
const createPostCard = (post) => {
    // Helper function to render a section only if content exists
    const renderSection = (heading, content) => {
        if (!content) return '';
        return `
            <h4>${heading}:</h4>
            <p>${content}</p>
        `;
    };

    return `
        <div class="post-card" data-post-id="${post.id}">
            <h3>${post.title}</h3>
            <div class="log-metadata">
                <span style="font-style: italic; font-size: 0.9em; color: var(--color-text-muted);">
                    Logged: ${post.dateLogged} at ${post.timeLogged}
                </span>
            </div>
            ${renderSection('Narrative', post.content)}
            ${renderSection('Key Takeaways', post.keyTakeaways)}
            ${renderSection('Reflection', post.reflection)}
            
            <button class="delete-btn" data-id="${post.id}">Delete Entry</button>
        </div>
    `;
};

/**
 * Renders the entire list of posts to the DOM and attaches event listeners.
 * @param {Array} posts - The array of post objects to display.
 * @param {function} deleteHandler - The function from app.js to call when a delete button is clicked.
 */
export const renderPosts = (posts, deleteHandler) => {
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p style="text-align: center; margin-top: 30px;">No entries yet. Start writing your UrbanLog!</p>';
        return;
    }

    // Sort posts by ID (timestamp) descending so newest is on top
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

    // Build the HTML for all posts
    const postsHtml = sortedPosts.map(createPostCard).join('');
    postsContainer.innerHTML = postsHtml;

    // Attach event listeners to all new delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            // Convert the data-id string attribute back to a number
            const postId = parseInt(event.target.dataset.id); 
            deleteHandler(postId); 
        });
    });
};

/**
 * Attaches the event listener to the mode toggle button.
 * @param {function} toggleHandler - The function from app.js to handle the theme change.
 */
export const initThemeToggle = (toggleHandler) => {
    modeToggleButton.addEventListener('click', toggleHandler);
};

/**
 * Updates the text on the toggle button and applies the class to the body.
 * @param {string} theme - The current theme ('dark' or 'light').
 */
export const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        modeToggleButton.textContent = 'Toggle Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        modeToggleButton.textContent = 'Toggle Dark Mode';
    }
};