import os
import sys
from newsapi import NewsApiClient
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

# --- Constants & Setup ---
load_dotenv()
LOG_FILE = "news_results.txt"

# Maps user-friendly input (in lowercase) to the News API's required ISO 639-1 code.
LANGUAGE_MAP = {
    "english": "en", "french": "fr", "german": "de", "spanish": "es",
    "italian": "it", "chinese": "zh", "arabic": "ar", "russian": "ru",
    "yoruba": "yo", "hausa": "ha",
    # Include codes themselves as keys for flexibility
    "en": "en", "fr": "fr", "de": "de", "es": "es", "it": "it",
    "zh": "zh", "ar": "ar", "ru": "ru", "yo": "yo", "ha": "ha"
}

# --- Core Functions ---

def initialize_api():
    """Initializes and returns the NewsApiClient object."""
    api_key = os.environ.get("NEWS_API_KEY")

    if not api_key:
        print("❌ NEWS_API_KEY not found.")
        print("Set it using: $env:NEWS_API_KEY = 'your_key' (PowerShell)")
        print("Or create a .env file with NEWS_API_KEY=your_key and restart your terminal.")
        sys.exit(1)

    return NewsApiClient(api_key=api_key)

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
    ).strip().upper()

    return keyword, category, language, country

def log_to_file(content: str):
    """Append text to the defined log file."""
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(content + "\n")

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
            # Format for the 'Everything' endpoint results
            entry = (
                f"RESULT #{i} (Published: {article.get('publishedAt', 'N/A')[:10]}):\n"
                f"  Title: {article.get('title', 'N/A')}\n"
                f"  Snippet: {article.get('description', 'No snippet available')[:80]}...\n"
                f"  URL: {article.get('url', 'N/A')}\n"
                + separator + "\n"
            )
            
        print(entry)
        log_to_file(entry)

def fetch_top_headlines(newsapi, keyword, category, language, country):
    """Fetches top headlines and handles logging."""
    try:
        top_headlines = newsapi.get_top_headlines(
            category=category,
            language=language,
            country=country,
            q=keyword
        )

        if top_headlines['status'] == 'ok':
            articles = top_headlines['articles']
            total_results = top_headlines['totalResults']
            
            print(f"✅ Retrieved {len(articles)} of {total_results} top headlines.")
            log_to_file(f"✅ Retrieved {len(articles)} of {total_results} top headlines.")
            
            process_and_log_articles(articles, "--- TOP HEADLINES ---", is_headline=True)
        else:
            print(f"❌ Top Headlines API call failed with status: {top_headlines['status']}")
            log_to_file(f"❌ Top Headlines API call failed with status: {top_headlines['status']}\n")

    except Exception as e:
        print(f"⚠️ Error fetching headlines: {e}")
        log_to_file(f"⚠️ Error fetching headlines: {e}\n")

def run_advanced_search(newsapi, keyword):
    """Runs the advanced 'Everything' search and handles logging."""
    # Search for the last 7 days
    date_to = datetime.now(timezone.utc)
    date_from = date_to - timedelta(days=7)
    
    # Use a default query if the user's keyword is empty for this section
    query = keyword or 'artificial intelligence OR quantum computing' 

    try:
        all_articles = newsapi.get_everything(
            q=query,
            to=date_to.strftime('%Y-%m-%dT%H:%M:%S'),
            from_param=date_from.strftime('%Y-%m-%dT%H:%M:%S'),
            sort_by='publishedAt',
            page_size=10,
            page=1
        )

        if all_articles['status'] == 'ok':
            search_results = all_articles['articles']
            total_search_results = all_articles['totalResults']

            title = f"🔬 ADVANCED SEARCH RESULTS (Everything Endpoint) for: '{query}'\nTotal relevant articles found: {total_search_results}"
            
            process_and_log_articles(search_results, title, is_headline=False)
        else:
            print(f"❌ Everything API failed: {all_articles['status']}")
            log_to_file(f"❌ Everything API failed: {all_articles['status']}\n")

    except Exception as e:
        print(f"\n⚠️ Error during 'everything' search: {e}")
        log_to_file(f"\n⚠️ Error during 'everything' search: {e}\n")

# --- Main Execution Block ---

def main():
    """The main function to orchestrate the news fetching process."""
    try:
        # 1. Initialization
        newsapi = initialize_api()
        
        # 2. Get Input
        keyword, category, language, country = get_user_parameters()
        
        # 3. Setup Log
        setup_log(keyword, category, language, country)
        
        # 4. Fetch Top Headlines (get_top_headlines endpoint)
        print("\n--- Starting Top Headlines Search ---")
        fetch_top_headlines(newsapi, keyword, category, language, country)
        
        # 5. Run Advanced Search (get_everything endpoint)
        print("\n--- Starting Advanced Search ---")
        run_advanced_search(newsapi, keyword)
        
        # 6. Finalization
        print(f"\n🗂️ All results saved to '{LOG_FILE}'")
        log_to_file("✅ Search completed.\n")

    except Exception as e:
        print(f"An unexpected error occurred in the main process: {e}")

if __name__ == "__main__":
    main()