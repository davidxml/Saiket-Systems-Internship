import os
from newsapi import NewsApiClient
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# --- configuration and initialisation ---
api_key = os.environ.get("NEWS_API_KEY")

if  not api_key:
    print(" Error: please update your api key with the NewsAPI key")
    exit(1)

newsapi = NewsApiClient(api_key=api_key)

# --- API interaction: Fetching Data ---
keyword_to_search = input("Enter the keyword to search for: ")
category_set = input("""Which category interests you at the moment ?
                    (e.g.business, entertainment, general, health, science, sports, technology): """)
language_set = input("Enter the language you'd love to read in: ")
country_set = input("Which country news excites best:  ")
try: 
    top_headlines = newsapi.get_top_headlines(
         category = category_set,
         language = language_set,
         country = country_set
    )

# --data Processing and output ---
    if top_headlines['status'] == 'ok':
        articles = top_headlines['articles']
        total_results = top_headlines['totalResults']
       
        print(f"Successfully retrieved {len(articles)} out of {total_results} total results.")
        print("-" * 50)
     
        # Loop through the list of articles retrieved
        for i, article in enumerate(articles, 1):
            # Each 'article' is a dictionary with keys like 'title', 'description', 'url', etc.        
            print(f"📰 ARTICLE #{i}:")
            # Use .get() with a default value to safely access dictionary keys.
            # This prevents a crash if a key is unexpectedly missing (e.g., no description).
            print(f"  Title: {article.get('title', 'N/A')}")
            print(f"  Source: {article.get('source', {}).get('name', 'Unknown')}")
            print(f"  Published: {article.get('publishedAt', 'N/A')}")
            print(f"  URL: {article.get('url', 'N/A')}")
            print(f"  Description: {article.get('description', 'No description available')}")
            print("-" * 50)       
    else:
        # Handle cases where the 'status' is not 'ok' (e.g., a bad request or authentication issue)
        print(f" API call failed with status: {top_headlines['status']}")

except Exception as e:
    # Catch any network errors, invalid API keys, or other unexpected issues
    print(f"An unexpected error occurred: {e}")


    ## Advanced Example: Searching All News (`/everything`)


# --- Advanced API Interaction: Searching All Articles ---

# 4. Define API Parameters for Everything Search:
# The '/v2/everything' endpoint searches across all sources and articles.

# Calculate a date range for the search (e.g., articles published in the last 7 days)
date_to = datetime.now()
date_from = date_to - timedelta(days=7)

try:
    all_articles = newsapi.get_everything(
    # Keywords for the search
    q='artificial intelligence OR quantum computing',
    
    # Specific domains to search (optional)
    # domains='techcrunch.com,thenextweb.com',
    
    # Date range in ISO 8601 format (YYYY-MM-DD)
    from_param=date_from.isoformat(),
    to=date_to.isoformat(),
    
    # How to sort the results: 'relevancy', 'popularity', or 'publishedAt'
    sort_by='publishedAt',
    # The number of articles to return per page (max 100 for this endpoint)
    page_size=10,
    
    # The page number to retrieve
    page=1
    )

# 5. Process the Advanced Response:
    if all_articles['status'] == 'ok':
        search_results = all_articles['articles']
        total_search_results = all_articles['totalResults']
        
        print("\n🔬 ADVANCED SEARCH RESULTS (Everything Endpoint):")
        print(f"Total relevant articles found: {total_search_results}")
        print("-" * 50)
       
        for j, article in enumerate(search_results, 1):
            print(f"SEARCH RESULT #{j} (Published: {article.get('publishedAt', 'N/A')[:10]}):")
            print(f"  Title: {article.get('title', 'N/A')}")
            print(f"  Snippet: {article.get('description', 'No snippet available')[:80]}...") # Print first 80 chars
            print(f"  URL: {article.get('url', 'N/A')}")
            print("-" * 50)

except Exception as e:
    print(f"\nAn error occurred during the 'everything' search: {e}")