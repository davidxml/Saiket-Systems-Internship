import sys
from news_fetcher import fetch_top_headlines, run_advanced_search
from utils import get_user_parameters, setup_log, log_to_file

def main():
    """The main function to orchestrate the news fetching process."""
    # 1. Initialization (Now handled inside news_fetcher or utils if needed)
    
    # 2. Get Input
    keyword, category, language, country = get_user_parameters()
    
    # 3. Setup Log
    setup_log(keyword, category, language, country)
    
    try:
        # 4. Fetch Top Headlines (calls the module function)
        print("\n--- Starting Top Headlines Search ---")
        fetch_top_headlines(keyword, category, language, country)
        
        # 5. Run Advanced Search (calls the module function)
        print("\n--- Starting Advanced Search ---")
        # The advanced search keyword is passed to the fetcher module
        run_advanced_search(keyword)
        
        # 6. Finalization
        log_to_file("✅ Search completed.\n")
        print(f"\n🗂️ All results saved to '{log_to_file.log_file}'") 

    except Exception as e:
        print(f"An unexpected error occurred in the main process: {e}")

if __name__ == "__main__":
    main()