#  Loan EMI Calculator

A Python command-line tool to calculate the Equated Monthly Instalment (EMI) for a loan. This project was completed as Task 1 of the Saiket Systems Software Development Internship.

---

### ## 🎯 Project Overview

This tool computes the fixed monthly payment a borrower must make to repay a loan over a specific period. It takes the **principal amount**, **annual interest rate**, and **loan tenure** (in months) as inputs and produces the resulting EMI.

The primary goal was to translate a standard financial formula into a clean, modular, and user-interactive Python application, focusing on code readability and logical structure.

---

### ## ➗ The Formula

The calculation is based on the following mathematical formula:

$$ EMI = \frac{P \times R \times (1 + R)^N}{(1 + R)^N - 1} $$

Where:
- **P**: Principal Loan Amount
- **R**: Monthly Interest Rate (annual rate / 12 / 100)
- **N**: Loan Tenure in Months

---

### ## ✨ Key Features

- **Modular Design:** The core calculation logic is separated into a reusable function for clarity and maintainability.
- **Interactive Input:** Prompts the user for all necessary values (principal, rate, and tenure) in a clear sequence.
- **Input Validation:** Safely handles numeric conversions to prevent errors during execution.
- **Formatted Output:** Presents the final EMI value in a clean, currency-formatted string for easy reading (e.g., `₦451,299.71`).

---

### ## ⚙️ How to Run

1.  Ensure you have Python 3 installed.
2.  Navigate to the project directory in your terminal.
3.  Run the script using the following command:
    ```bash
    python emi_generator.py
    ```
4.  Follow the on-screen prompts to enter the loan details.

---


---

### ## 🧠 Learning Outcomes

This project served as a foundational exercise in translating a real-world requirement into a functional program. It reinforced best practices such as writing modular code, handling user input, and focusing on a clean user experience, setting the stage for more complex tasks involving APIs and data management.

---
