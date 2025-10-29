from datetime import datetime
import os

# --- Constants ---
LOG_FILE = "news_results.txt"

# Maps user-friendly input to the News API's required ISO 639-1 code.
LANGUAGE_MAP = {
    "english": "en", "french": "fr", "german": "de", "spanish": "es",
    "italian": "it", "chinese": "zh", "arabic": "ar", "russian": "ru",
    "yoruba": "yo", "hausa": "ha",
    "en": "en", "fr": "fr", "de": "de", "es": "es", "it": "it",
    "zh": "zh", "ar": "ar", "ru": "ru", "yo": "yo", "ha": "ha"
}


# --- I/O Functions ---

def log_to_file(content: str):
    """Append text to the defined log file."""
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(content + "\n")

# Expose the log file path as a module-level constant for other modules to use.
# This is clearer and type-checker friendly compared to attaching attributes to a function.

def setup_log(keyword, category, language, country):
    """Writes the header and search parameters to the log file."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    log_to_file("=" * 80)
    log_to_file(f"🕓 SEARCH TIMESTAMP: {timestamp}")
    log_to_file(f"🔍 KEYWORD: {keyword or 'None'}")
    log_to_file(f"📂 CATEGORY: {category or 'None'}")
    log_to_file(f"🌐 LANGUAGE: {language or 'None'}")
    log_to_file(f"🏳️ COUNTRY: {country or 'None'}")
    log_to_file("=" * 80 + "\n")

def get_user_parameters():
    """Gathers and standardizes user input for search parameters."""
    print("\n--- Gather Search Parameters ---")

    keyword = input("🔍 Enter a keyword to search for: ").strip()
    category = input(
        "📂 Category (business, entertainment, general, health, science, sports, technology): "
    ).strip().lower()

    # Language mapping
    language_input = input(
        "🌐 Language (e.g., English, French, Yoruba, or code like 'en', 'fr', 'yo'): "
    ).strip().lower()
    language = LANGUAGE_MAP.get(language_input, language_input)

    # Country code standardization (must be uppercase for News API)
    country = input(
        "🏳️ Country code (NG, US, FR, etc. - use **uppercase** for best results): "
    ).strip().lower()

    return keyword, category, language, country

def process_and_log_articles(articles: list, title: str, is_headline: bool = True):
    """Processes, prints, and logs a list of articles."""
    separator = "-" * 60
    
    print(f"\n{title}")
    log_to_file(f"\n{title}\n")
    
    if not articles:
        print("No articles found.")
        log_to_file("No articles found.\n")
        return

    for i, article in enumerate(articles, 1):
        if is_headline:
            entry = (
                f"📰 ARTICLE #{i}\n"
                f"  Title: {article.get('title', 'N/A')}\n"
                f"  Source: {article.get('source', {}).get('name', 'Unknown')}\n"
                f"  Published: {article.get('publishedAt', 'N/A')}\n"
                f"  URL: {article.get('url', 'N/A')}\n"
                f"  Description: {article.get('description', 'No description available')}\n"
                + separator + "\n"
            )
        else:
            entry = (
                f"RESULT #{i} (Published: {article.get('publishedAt', 'N/A')[:10]}):\n"
                f"  Title: {article.get('title', 'N/A')}\n"
                f"  Snippet: {article.get('description', 'No snippet available')[:80]}...\n"
                f"  URL: {article.get('url', 'N/A')}\n"
                + separator + "\n"
            )
            
        print(entry)
        log_to_file(entry)