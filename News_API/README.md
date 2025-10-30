<div align="center">

# 📰 News_API  
### Intelligent Real-Time News Fetching System  

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white&style=for-the-badge)
![NewsAPI](https://img.shields.io/badge/NewsAPI-Integration-success?logo=rss&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

The **News_API** project is a smart Python-based tool designed to fetch and organize real-time global news. It combines user input with the power of [NewsAPI.org](https://newsapi.org/) to deliver curated headlines and in-depth keyword searches. Whether you’re exploring trends in artificial intelligence, monitoring economic updates, or studying media coverage across languages, this tool helps you do it effortlessly and elegantly.

---

## 🧠 What It Does

This application lets you fetch top headlines or perform detailed, keyword-based searches from across the globe. You can filter news by topic, country, or language, and every search session is automatically saved in a structured text file for later review. The workflow is simple, clean, and efficient — just enter what you want to search for, and let the system do the rest.

---

## ⚙️ Technologies Behind It

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Dotenv](https://img.shields.io/badge/Dotenv-ecf0f1?style=for-the-badge&logo=dotenv&logoColor=black)
![NewsAPI](https://img.shields.io/badge/NewsAPI-FFDD00?style=for-the-badge&logo=rss&logoColor=black)
![CLI](https://img.shields.io/badge/Interface-Command_Line_Tool-2ecc71?style=for-the-badge)

</div>

The project relies on **Python 3**, **NewsAPI**, and **python-dotenv** to ensure secure API handling and smooth interaction from the terminal. Its cross-platform design ensures it runs cleanly on Windows, macOS, and Linux systems.

---

## 🚧 Getting Started

To run the project, simply clone the repository and install the dependencies. It’s lightweight, fast, and easy to set up.

```bash
git clone https://github.com/davidxml/News_API.git
cd News_API
pip install newsapi-python python-dotenv
```

Next, create a `.env` file in the root directory and add your NewsAPI key:

```bash
NEWS_API_KEY=your_api_key_here
```

Then launch the app:

```bash
python main.py
```

You’ll be prompted to enter your keyword, category, language, and country, and the system will fetch and log the most relevant headlines and articles to a file named `news_results.txt`.

---

## 🌍 Supported Languages

| Language | Code |
|-----------|------|
| English   | en   |
| French    | fr   |
| Spanish   | es   |
| Arabic    | ar   |
| Yoruba    | yo   |

---

## 🧩 Example Output

```yaml
--- Gather Search Parameters ---
🔍 Enter a keyword to search for: AI
📂 Category: technology
🌐 Language: English
🏳️ Country: US

--- Starting Top Headlines Search ---
✅ Retrieved 10 of 25 top headlines.

--- Starting Advanced Search ---
🔎 ADVANCED SEARCH RESULTS (Everything Endpoint) for: 'AI'
Total relevant articles found: 1450

📰 ARTICLE #1
  Title: AI breakthrough transforms robotics
  Source: MIT Tech Review
  Published: 2025-10-30
  URL: https://tech.mit.edu/ai-breakthrough
```

---

## 📜 Logging & Error Handling

Every search session is timestamped and saved automatically in `news_results.txt`.  
The system gracefully handles missing API keys, invalid inputs, and connectivity issues, ensuring a smooth and reliable experience every time.

---

## 🧑‍💻 Author

**David Adewunmi**  
AI/ML Robotics Software Engineer • Saiket Systems  
📧 **pycodegenius@gmail.com**  
🌐 [GitHub](https://github.com/davidxml)

---

⭐ *If you found this project helpful, consider giving it a star on GitHub!* ⭐
