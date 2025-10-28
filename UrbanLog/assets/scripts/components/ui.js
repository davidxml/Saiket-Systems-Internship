// ui.js - Handles all DOM manipulation: reading data from the form and rendering posts.

// Get all necessary DOM elements
const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');
const postTitleInput = document.getElementById('post-title');
const mainLogInput = document.getElementById('main-log');
const keyTakeawaysInput = document.getElementById('key-takeaways');
const dailyReflectionInput = document.getElementById('daily-reflection');
const modeToggleButton = document.getElementById('mode-toggle');
const searchInput = document.getElementById('search-input'); 
const categoryFilter = document.getElementById('category-filter');
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
const sanitizeInput = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};
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
        <div class="post-card" data-post-id="${sanitizeInput(post.id.toString())}">
            <h3>${sanitizeInput(post.title)}</h3>
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
 * Initializes listeners for the search input and category filter.
 * @param {function} updateTermHandler - Handler to update the search term in app.js.
 * @param {function} updateCategoryHandler - Handler to update the search category in app.js.
 */

export const initSearch = (updateTermHandler, updateCategoryHandler) => {
    // Listen for keyup events on the search bar
    searchInput.addEventListener('keyup', (event) => {
        updateTermHandler(event.target.value);
    });

    // Listen for change events on the category selector
    categoryFilter.addEventListener('change', (event) => {
        updateCategoryHandler(event.target.value);
    });
};
export const clearSearchInput = () => {
    searchInput.value = ''; // Clears the search 
};

/**
 * Initializes the view navigation buttons (Active / Archive / Trash).
 * @param {function} switchViewHandler - Function from app.js to switch views.
 */
export const initViewButtons = (switchViewHandler) => {
    const viewButtons = document.querySelectorAll('.view-btn');
    if (!viewButtons || viewButtons.length === 0) {
        console.warn('View buttons not found in DOM');
        return;
    }

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const view = btn.dataset.view;
            if (view && typeof switchViewHandler === 'function') {
                switchViewHandler(view);
            }
        });
    });
};

/**
 * Updates the visual state of the view buttons to reflect the currently selected view.
 * @param {string} currentView - 'active' | 'archive' | 'trash'
 */
export const updateViewButtons = (currentView) => {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        if (btn.dataset.view === currentView) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};
/**
 * Attaches the event listener to the mode toggle button.
 * @param {function} toggleHandler - The function from app.js to handle the theme change.
 */
export const initThemeToggle = (toggleHandler) => {
    if (!modeToggleButton) {
        console.error('Theme toggle button not found');
        return;
    }

    // Add click handler
    modeToggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleHandler();
    });

    // Listen for theme changes from other sources
    window.addEventListener('themeChanged', (event) => {
        applyTheme(event.detail.theme);
    });

    // Also listen for system preference changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only react to system changes if no user preference is stored
            if (!localStorage.getItem('urbanLogTheme')) {
                toggleHandler();
            }
        });
    }
};

/**
 * Updates the text on the toggle button and applies the class to the body.
 * @param {string} theme - The current theme ('dark' or 'light').
 */
export const applyTheme = (theme) => {
    try {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (modeToggleButton) {
                modeToggleButton.textContent = '☀️ Light Mode';
                modeToggleButton.setAttribute('aria-label', 'Switch to light mode');
            }
        } else {
            document.body.classList.remove('dark-mode');
            if (modeToggleButton) {
                modeToggleButton.textContent = '🌙 Dark Mode';
                modeToggleButton.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
        document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
        console.error('Error applying theme:', error);
    }
};

