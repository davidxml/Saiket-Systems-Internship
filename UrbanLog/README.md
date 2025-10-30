<div align="center">

# 📓 UrbanLog  
### A Modular Front End Application for Structured Daily Logging

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=black&style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Client_Side_App-blue?style=for-the-badge)
![ModularDesign](https://img.shields.io/badge/Architecture-ES_Modules-success?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-5-DD4B25?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>


**UrbanLog** is a thoughtfully engineered client side web application for structured daily logging and reflection. It allows users to record their thoughts, notes, and key takeaways across intuitive fields such as Title, Narrative, Key Takeaways, and Reflection.  
The app is built with modular JavaScript using ES Modules, which keeps logic, interface, and storage separate and easy to maintain. It uses localStorage to persist user data so entries remain available between sessions.

---

## 🧠 What It Does

UrbanLog helps users capture and organize daily experiences efficiently. Each entry is treated as a self contained post that can be created, viewed, archived, restored, or permanently deleted. The app includes an advanced filtering and search feature that finds entries by keywords inside specific fields. The result is a smooth and focused journaling experience.

---

## ✨ Key Features

- **Local Persistence:** All entries are stored in the browser localStorage, ensuring data stays between sessions.  
- **Multi View Filtering:** Users can switch between Active Logs, Archived Entries, and Trash, with the app updating to reflect the chosen view.  
- **Full Post Lifecycle:** Create, read, archive, restore, and permanently delete entries.  
- **Smart Theming:** Includes a persistent dark and light mode toggle that respects the user system theme preference on first load.  
- **Responsive Layout:** The three pane writing interface adapts across desktop, tablet, and mobile devices.

---

## 🧩 Modular Architecture

UrbanLog follows a modular structure where each module focuses on a single responsibility, which improves maintainability and makes the code easy to understand.

| Module / Service | Role | Key Responsibilities |
|------------------|------|----------------------|
| `app.js` | State and orchestration | Manages global state such as posts and current view. Contains core logic for creating, filtering, and switching views. |
| `components/ui.js` | View layer | Handles DOM rendering, theme application, and event listener setup for UI elements. |
| `services/storage.js` | Data layer | Reads and writes data to localStorage for posts and theme settings. |
| `components/postForm.js` | Input control | Manages form validation and submission, keeping form logic isolated from the main flow. |

This layout demonstrates solid front end engineering practices and modular thinking.

---

## ⚙️ Setup and Installation

UrbanLog runs entirely in the browser and requires no server or external database. To run it locally, follow these steps:

```bash
git clone https://github.com/davidxml/urbanlog.git
cd urbanlog
```

Because the project uses ES Modules, serve it using a local web server rather than opening the HTML file directly. You can use VS Code Live Server or Python built in server:

```bash
python -m http.server 8000
```

Then open the app in your browser at:

```
http://localhost:8000/urbanlog.html
```

---

## 🧠 Concepts Showcased

- **Modular Architecture:** Clear separation of UI, logic, and storage using ES Modules.  
- **State Management:** Dynamic rendering and view switching based on user actions.  
- **Front End Persistence:** Efficient local data storage using localStorage.  
- **Theming and UX:** Persistent theme and responsive interface for a polished user experience.  
- **Form Validation:** Input checks and graceful handling of invalid entries.

---

## 🧑‍💻 Author

**David Adewunmi**  
AI, ML and Robotics Software Engineer • Saiket Systems  
📧 **pycodegenius@gmail.com**  
🌐 [GitHub](https://github.com/davidxml)

---

⭐ *If you find UrbanLog useful, give it a star and try organizing your daily reflections the smart way.* ⭐
