<div align="center">

# 📞 Contact Book  
### A Modular Client Side Directory for Smart Contact Management  

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=black&style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Client_Side_App-blue?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-5-DD4B25?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![MVC](https://img.shields.io/badge/Architecture-MVC_Design_Pattern-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>


**Contact Book** is a high performance single page web application built for managing personal contact directories. It demonstrates a clear separation of concerns through a modular JavaScript architecture that mirrors the principles of the Model View Controller design pattern.  
Every contact you create, edit, or delete is automatically persisted in your browser local storage for quick and reliable access, even after closing the tab.

---

## 🧠 What It Does

The application provides a clean and intuitive interface where users can add new contacts, search instantly through existing ones, and delete them when necessary.  
All operations happen directly in the browser with no backend server required. A live search feature ensures results are filtered dynamically as you type, making contact management effortless and immediate.

---

## ✨ Core Features

- **Modular Architecture:** Organized into logical modules that follow the Model View Controller pattern for maintainability and clarity.  
- **Persistent Storage:** Uses browser localStorage to save all contact data and automatically reloads it when the app is reopened.  
- **Real Time Search:** Instantly filters contacts as the user types, powered by efficient keyup event handling.  
- **Unique Identification:** Every contact is assigned a globally unique ID through `crypto.randomUUID()`, ensuring safe and accurate management.  
- **Event Delegation:** Delete actions are handled efficiently using event delegation, even when the contact list grows large.  
- **Clean UI:** Designed with clarity, responsiveness, and accessibility in mind for a seamless user experience.

---

## 🧩 Project Structure

Each part of the application plays a focused role within the modular setup.

| File | Layer | Description |
|------|--------|-------------|
| `js/main.js` | Controller | Initializes the app and connects user actions from the UI to data operations handled by the service layer. |
| `js/services/contactService.js` | Service / Data Access | Acts as the central data manager, synchronizing contacts with localStorage. |
| `js/views/ui.js` | View | Handles all DOM manipulation, rendering, and user interaction events like form submission, deletion, and search. |
| `js/models/contact.js` | Model | Defines the `Contact` class blueprint and handles automatic ID generation for new entries. |
| `css/main.css` | Styling | Provides clean and responsive design to ensure a pleasant user experience across devices. |

---

## ⚙️ Getting Started

To run the Contact Book locally, you only need a modern browser and a lightweight web server to enable ES Modules. Follow these steps:

```bash
git clone https://github.com/davidxml/contact_book.git
cd contact_book
```

Run the app using a local web server such as VS Code Live Server or Python:

```bash
python -m http.server 8000
```

Then open the application in your browser:

```
http://localhost:8000/contactBook.html
```

The app will load instantly and allow you to add, search, and manage contacts from your local device.

---

## 🧠 Concepts Showcased

- **MVC Inspired Design:** Clear separation between data, logic, and presentation.  
- **Modular JavaScript:** Each component is designed for reusability and independent updates.  
- **Local Storage Integration:** Fast and secure data persistence on the client side.  
- **Real Time UX:** Dynamic filtering and event driven interactivity.  
- **Scalable Front End Engineering:** Built with maintainability and performance in mind.  

---

## 🧑‍💻 Author

**David Adewunmi**  
AI, ML and Robotics Software Engineer • Saiket Systems  
📧 **pycodegenius@gmail.com**  
🌐 [GitHub](https://github.com/davidxml)

---

⭐ *If you find Contact Book useful, give it a star and explore how modular front end architecture can make your projects cleaner and faster.* ⭐
