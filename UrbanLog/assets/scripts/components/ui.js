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

// *** FIX: Added selectors for new button and dynamic title ***
const searchButton = document.getElementById('search-btn');
const logHistoryTitle = document.getElementById('log-history-title');

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
const createPostCard = (post, currentView = 'active') => {
    // Helper function to render a section only if content exists
    const renderSection = (heading, content) => {
        if (!content) return '';
        return `
            <h4>${heading}:</h4>
            <p>${content}</p>
        `;
    };
    // Build action buttons based on the current view
    let actionsHtml = '';
    if (currentView === 'active') {
        actionsHtml = `
            <button class="archive-btn action-btn" data-id="${post.id}">Archive</button>
            <button class="delete-btn" data-id="${post.id}">Move to Trash</button>
        `;
    } else if (currentView === 'archive') {
        actionsHtml = `
            <button class="restore-btn action-btn" data-id="${post.id}">Restore</button>
            <button class="perma-delete-btn" data-id="${post.id}">Delete Permanently</button>
        `;
    } else if (currentView === 'trash') {
        actionsHtml = `
            <button class="restore-btn action-btn" data-id="${post.id}">Restore</button>
            <button class="perma-delete-btn" data-id="${post.id}">Delete Permanently</button>
        `;
    }
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
            
            <div class="post-actions">
                ${actionsHtml}
            </div>
        </div>
    `;
};

/**
 * Renders the entire list of posts to the DOM and attaches event listeners.
 * @param {Array} posts - The array of post objects to display.
 * @param {function} deleteHandler - The function from app.js to call when a delete button is clicked.
 * @param {function} changeStatusHandler - Function to change a post's status (archive/restore/delete).
 * @param {string} currentView - The current view ('active'|'archive'|'trash').
 */
export const renderPosts = (posts, deleteHandler, changeStatusHandler, currentView = 'active') => {
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p style="text-align: center; margin-top: 30px;">No entries yet. Start writing your UrbanLog!</p>';
        return;
    }

    // Sort posts by ID (timestamp) descending so newest is on top
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

    // Build the HTML for all posts (pass currentView so cards can render appropriate actions)
    const postsHtml = sortedPosts.map(p => createPostCard(p, currentView)).join('');
    postsContainer.innerHTML = postsHtml;

    // Attach event listeners to action buttons (delete, archive, restore, permanent-delete)
    // Delete (soft-delete) buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const postId = parseInt(event.target.dataset.id);
            if (typeof deleteHandler === 'function') deleteHandler(postId);
        });
    });

    // Archive buttons
    document.querySelectorAll('.archive-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const postId = parseInt(event.target.dataset.id);
            if (typeof changeStatusHandler === 'function') changeStatusHandler(postId, 'archived');
        });
    });

    // Restore buttons (from archive or trash back to active)
    document.querySelectorAll('.restore-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const postId = parseInt(event.target.dataset.id);
            if (typeof changeStatusHandler === 'function') changeStatusHandler(postId, 'active');
        });
    });

    // Permanent delete buttons
    document.querySelectorAll('.perma-delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const postId = parseInt(event.target.dataset.id);
            if (typeof changeStatusHandler === 'function') changeStatusHandler(postId, 'permanent-delete');
        });
    });
};

// *** FIX: Rewrote initSearch to use the button and a single handler ***
/**
 * Initializes listeners for the search button.
 * @param {function} searchHandler - Handler to call when search button is clicked.
 */
export const initSearch = (searchHandler) => {
    if (!searchButton || !searchInput || !categoryFilter) {
        console.error("Search components not found in DOM");
        return;
    }

    // Listen for click events on the search button
    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission if it's in a form
        searchHandler(searchInput.value, categoryFilter.value);
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

// *** FIX: Added function to update the log history title ***
/**
 * Updates the H2 title for the log history section.
 * @param {string} currentView - 'active' | 'archive' | 'trash'
 */
export const updateLogHistoryTitle = (currentView) => {
    if (!logHistoryTitle) return;

    switch (currentView) {
        case 'active':
            logHistoryTitle.textContent = 'Active Log';
            break;
        case 'archive':
            logHistoryTitle.textContent = 'Archived Entries';
            break;
        case 'trash':
            logHistoryTitle.textContent = 'Trash';
            break;
        default:
            logHistoryTitle.textContent = 'Log Entries';
    }
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