// app.js - The main entry point and orchestrator for UrbanLog.

// Import functions from our services and components
import * as Storage from '../services/storage.js';
import * as UI from '../components/ui.js';
import * as PostForm from '../components/postForm.js';

// Application State
let posts = [];
let currentTheme;

/**
 * Main application initialization function.
 */
const initApp = () => {
    // 1. Load Data and Theme
    posts = Storage.getPosts();
    currentTheme = Storage.getThemePreference();

    // 2. Apply Theme
    UI.applyTheme(currentTheme);
    
    // 3. Initialize Components
    UI.renderPosts(posts, deletePost); // Renders initial posts and passes the delete handler
    PostForm.initForm(createPost);     // Initializes form listener and passes the creation handler
    UI.initThemeToggle(toggleTheme);   // Initializes theme toggle button

    console.log("UrbanLog Initialized. Posts loaded:", posts.length);
};

/**
 * Handles the creation of a new post.
 */
const createPost = () => {
    const formData = UI.getPostFormData();
    const now = new Date();
    const newpost = {
        id: now.getTime(),
        title: formData.title,
        content: formData.content,
        keyTakeaways: formData.keyTakeaways,
        reflection: formData.reflection,
        datelogged: now.toLocaleDateString(),
        timelogged: now.toLocaleTimeString()
    };
    
    // Basic validation: ensure the main log has content
    if (!formData.title || !formData.content) {
        alert("Please provide both a Title and an entry in the Primary Log.");
        return;
    }

    // 1. Create the new post object
    const newPost = {
        // Use the current timestamp as a simple, unique ID
        id: Date.now(), 
        title: formData.title,
        content: formData.content,
        keyTakeaways: formData.keyTakeaways,
        reflection: formData.reflection
    };

    // 2. Update state and persistence
    posts.push(newPost);
    Storage.savePosts(posts);

    // 3. Update UI
    UI.renderPosts(posts, deletePost);
    UI.clearForm();
};

/**
 * Handles the deletion of a specific post.
 * @param {number} postIdToDelete - The unique ID of the post to delete.
 */
const deletePost = (postIdToDelete) => {
    if (!confirm("Are you sure you want to delete this log entry? This action cannot be undone.")) {
        return; // User cancelled deletion
    }
    
    // 1. Update state: Filter out the post with the matching ID
    // We parse the ID to ensure strict comparison works
    posts = posts.filter(post => post.id !== postIdToDelete); 
    
    // 2. Update persistence
    Storage.savePosts(posts);

    // 3. Update UI
    UI.renderPosts(posts, deletePost);
};

/**
 * Handles toggling the theme between dark and light mode.
 */
const toggleTheme = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    Storage.saveThemePreference(currentTheme);
    UI.applyTheme(currentTheme);
};


// Start the application when the script loads
initApp();