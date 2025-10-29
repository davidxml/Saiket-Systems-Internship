import os
import sys
from newsapi import NewsApiClient
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

# Import utility functions for logging and processing
from utils import process_and_log_articles, log_to_file

# --- Private Initialization Function ---
def _initialize_api():
    """Initializes and returns the NewsApiClient object."""
    load_dotenv()
    api_key = os.environ.get("NEWS_API_KEY")

    if not api_key:
        print("❌ NEWS_API_KEY not found.")
        # We raise an exception here that main.py should catch
        raise EnvironmentError("NEWS_API_KEY not found. Please set it in your environment or .env file.")

    return NewsApiClient(api_key=api_key)

# Initialize the client once at the module level (or inside each function)
try:
    newsapi = _initialize_api()
except Exception as e:
    # If API initialization fails, the rest of the module won't work.
    # We still need to print the error but let the system exit naturally.
    newsapi = None
    print(e)
    # Exiting here is cleaner if the dependency (API key) is missing
    sys.exit(1)


# --- Public Functions for Main ---

def fetch_top_headlines(keyword, category, language, country):
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
            log_to_file(f"❌ Top Headlines API call failed with status: {top_headlines['status']}\n")
            print(f"❌ Top Headlines API call failed with status: {top_headlines['status']}")

    except Exception as e:
        log_to_file(f"⚠️ Error fetching headlines: {e}\n")
        print(f"⚠️ Error fetching headlines: {e}")

def run_advanced_search(keyword):
    """Runs the advanced 'Everything' search and handles logging."""
    date_to = datetime.now(timezone.utc)
    date_from = date_to - timedelta(days=7)
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
            log_to_file(f"❌ Everything API failed: {all_articles['status']}\n")
            print(f"❌ Everything API failed: {all_articles['status']}")

    except Exception as e:
        log_to_file(f"\n⚠️ Error during 'everything' search: {e}\n")
        print(f"\n⚠️ Error during 'everything' search: {e}")