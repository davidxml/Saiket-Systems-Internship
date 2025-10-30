<div align="center">

# 🎯 Number Guessing Game  
### A Fun Python Command-Line Challenge  

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white&style=for-the-badge)
![CLI](https://img.shields.io/badge/Interface-Command_Line_Tool-2ecc71?style=for-the-badge)
![Game](https://img.shields.io/badge/Category-Interactive_Game-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

The **Number Guessing Game** is a simple yet engaging Python project developed during my internship at **Saiket Systems**. It’s a terminal-based guessing game that challenges players to find a randomly chosen number within a specific range.  
The game demonstrates the use of **object-oriented programming**, **modular design**, and **robust error handling** — all wrapped in a fun and user-friendly command-line experience.

---

## 🧠 What It Does

This application randomly selects a number within a defined range (default: 1–100).  
The player then tries to guess the secret number, receiving hints like:

- 📉 *“Too low!”* — when the guess is smaller than the target.  
- 📈 *“Too high!”* — when the guess is larger than the target.  
- 🏆 *“Correct!”* — when the player guesses the right number.  

It also tracks the total number of attempts before success and celebrates with a congratulatory message when the game ends.

---

## ⚙️ Technologies Behind It

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![OOP](https://img.shields.io/badge/Programming_Paradigm-OOP-orange?style=for-the-badge)
![CLI](https://img.shields.io/badge/User_Interface-Command_Line-2ecc71?style=for-the-badge)
![CrossPlatform](https://img.shields.io/badge/Cross--Platform-Compatible-blueviolet?style=for-the-badge)

</div>

This project is built with **Python 3** and follows a clean, modular architecture.  
Each file plays a specific role in maintaining readability and separation of concerns:

| File | Description |
|------|--------------|
| `config.py` | Defines global constants such as the minimum and maximum numbers. |
| `core.py` | Contains the core game logic and comparison functions. |
| `ui.py` | Handles all user interaction — input, feedback, and printing results. |
| `main.py` | The entry point that connects all components and starts the game. |

---

## 🚀 Getting Started

To run the project locally, follow these simple steps:

```bash
git clone https://github.com/davidxml/number_guessing_game.git
cd number_guessing_game
python main.py
```

Once launched, the program will greet you and ask you to guess a number within the given range. Keep guessing until you find the correct number!

---

## 🧩 Example Gameplay

```text
--- Welcome to the Guessing Game! ---
I'm thinking of a number between 1 and 100.
Guess The number in my head: 45
Almost there, your guess 45 is now low 😊
Guess The number in my head: 89
Beautiful, your guess 89 is a bit too high 😕
Guess The number in my head: 72
That was smart! Your guess, 72 is correct 🏅
CONGRATULATIONS 🥇
You used 3 guesses
--- Game Over! Thanks for playing! ---
```

---

## 🧠 Concepts Showcased

- **Object-Oriented Design:** Clean class separation between game logic and interface.  
- **Error Handling:** Graceful handling of invalid inputs like text or empty entries.  
- **Encapsulation:** Each module maintains its own responsibility.  
- **User Interaction:** Friendly and guided text prompts for smooth play.

---

## 🧑‍💻 Author

**David Adewunmi**  
AI, ML & Robotics Software Engineer • Saiket Systems  
📧 **pycodegenius@gmail.com**  
🌐 [GitHub](https://github.com/davidxml)

---

⭐ *If you enjoyed this project, give it a star and try beating your best score!* ⭐
