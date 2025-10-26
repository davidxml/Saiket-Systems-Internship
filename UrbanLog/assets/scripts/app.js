// app.js - The main entry point and orchestrator for UrbanLog.

// Import functions from our services and components
import * as Storage from '../services/storage.js';
import * as UI from '../components/ui.js';
import * as PostForm from '../components/postForm.js';

// Application State
let posts = [];
let currentTheme;
let currentView = 'active'; // Initialize current view to 'active'
let searchTerm = ''; // State for search keyword
let searchCategory = 'all'; // State for search field

// --- Utility and Orchestration Functions ---

/**
 * Filters the main posts array based on the current view state AND search criteria.
 * @returns {Array} The filtered list of posts to display.
 */
const getFilteredPosts = () => {
    // 1. Filter by Status (Active, Trash, Archive)
    let filteredByStatus = posts.filter(post => {
        // Use a default status of 'active' for older posts without a status
        const status = post.status || 'active';
        
        if (currentView === 'active') {
            return status === 'active';
        } else if (currentView === 'trash') {
            return status === 'deleted';
        } else if (currentView === 'archive') {
            return status === 'archived';
        }
        return false;
    });

    // 2. Filter by Search Term and Category
    if (!searchTerm) {
        return filteredByStatus; // If no search term, return only status-filtered posts
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    return filteredByStatus.filter(post => {
        let fieldsToSearch = [];

        // Determine which fields to search based on category
        if (searchCategory === 'all') {
            // Search all main content fields
            fieldsToSearch = [post.title, post.content, post.keyTakeaways, post.reflection];
        } else if (searchCategory === 'content') {
            fieldsToSearch = [post.content];
        } else if (searchCategory === 'keyTakeaways') {
            fieldsToSearch = [post.keyTakeaways];
        } else if (searchCategory === 'reflection') {
            fieldsToSearch = [post.reflection];
        }

        // IMPORTANT CORRECTION: If searching a specific section (not 'all'), we still want to include the title for context.
        // The original logic for specific section search was overly complicated. Let's simplify:
        if (searchCategory !== 'all') {
            // If we are searching a specific text field, only search that one field.
            // If we want to include the title, we must explicitly add it back here:
            // fieldsToSearch.push(post.title); // Decided to exclude title for focused section search to allow better filtering.
        }
        
        // Check if the search term exists in any of the chosen fields
        return fieldsToSearch.some(field => field && field.toLowerCase().includes(lowerCaseSearch));
    });
};

/**
 * Saves the current state of posts to local storage and refreshes the UI.
 */
const saveAndRender = () => {
    Storage.savePosts(posts);
    const postsToDisplay = getFilteredPosts();
    // Pass the necessary handlers and the current view to the UI component
    UI.renderPosts(postsToDisplay, deletePost, changePostStatus, currentView); 
};

/**
 * Function to switch the application view (Active, Archive, Trash).
 * @param {string} view - 'active', 'trash', or 'archive'.
 */
const switchView = (view) => {
    currentView = view;
    // Clear search when switching views to prevent unexpected filtering
    searchTerm = '';
    UI.clearSearchInput(); // We will add this helper to ui.js
    
    saveAndRender();
    UI.updateViewButtons(currentView);
};

/**
 * Updates the search term and re-renders the list.
 * @param {string} term - The text input from the search bar.
 */


/**
 * Updates the search category and re-renders the list.
 * @param {string} category - The selected field from the dropdown.
 */
const updateSearchCategory = (category) => {
    searchCategory = category;
    saveAndRender();
};


// --- CRUD & Theme Handlers ---

/**
 * Handles the creation of a new post.
 */
const createPost = () => {
    const formData = UI.getPostFormData();

    // Basic validation: ensure the main log has content
    if (!formData.title || !formData.content) {
        alert("Please provide both a Title and an entry in the Primary Log.");
        return;
    }

    const now = new Date();
    
    // 1. Create the new post object with ALL fields and auto-logged data/status
    const newPost = {
        id: now.getTime(), 
        title: formData.title,
        content: formData.content,
        keyTakeaways: formData.keyTakeaways,
        reflection: formData.reflection,
        dateLogged: now.toLocaleDateString(),
        timeLogged: now.toLocaleTimeString(),
        status: 'active' // All new posts start as 'active'
    };

    // 2. Update state and persistence
    posts.push(newPost);
    UI.clearForm();

    // Ensure we switch back to the active log view after creating a new post
    if (currentView !== 'active') {
        switchView('active');
    } else {
        saveAndRender();
    }
};


/**
 * Handles the initial soft deletion (move to trash).
 * NOTE: This replaces the old simple deletePost logic.
 * @param {number} postId - The ID of the post to move to trash.
 */
const deletePost = (postId) => {
    changePostStatus(postId, 'deleted');
};

/**
 * Handles changing the status of a post (soft delete, archive, restore) or permanent deletion.
 * @param {number} postId - The ID of the post to update.
 * @param {string} newStatus - The target status ('active', 'deleted', 'archived', or 'permanent-delete').
 */
const changePostStatus = (postId, newStatus) => {
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) return;

    if (newStatus === 'permanent-delete') {
        // PERMANENT DELETION: Filter post out of the array
        if (!confirm("WARNING: Are you sure you want to permanently delete this entry? This action cannot be undone.")) return;
        posts.splice(postIndex, 1);
    } else {
        // SOFT STATUS CHANGE (Active, Deleted, or Archived)
        posts[postIndex].status = newStatus;
    }

    saveAndRender();
};

/**
 * Handles toggling the theme between dark and light mode.
 */
const toggleTheme = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    Storage.saveThemePreference(currentTheme);
    UI.applyTheme(currentTheme);
};

// --- Initialization ---

/**
 * Main application initialization function.
 */
const initApp = () => {
    // 1. Load Data and Theme
    posts = Storage.getPosts();
    posts = posts.map(post => ({
        ...post,
        status: post.status || 'active' 
    }))
    currentTheme = Storage.getThemePreference(); // This includes the system preference check

    // 2. Apply Theme
    UI.applyTheme(currentTheme);
    
    // 3. Initialize Components
    UI.initViewButtons(switchView);   // Initializes view buttons and passes the switchView handler
    UI.initSearch(updateSearchTerm, updateSearchCategory); // Initialize search listeners
    
    UI.updateViewButtons(currentView); // Set the initial button state
    
    saveAndRender();                  // Renders initial filtered posts

    PostForm.initForm(createPost); 
    UI.initThemeToggle(toggleTheme);  

    console.log("UrbanLog Initialized. Posts loaded:", posts.length);
};

/**
 * Updates the search term and re-renders the list.
 * @param {string} term - The text input from the search bar.
 */

let searchTimeout;
const updateSearchTerm = (term) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchTerm = term;
        saveAndRender();
    }, 300);
}


// Start the application when the script loads
initApp();