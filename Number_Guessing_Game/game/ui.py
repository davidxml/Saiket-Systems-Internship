class CLInterface:
    """
    Handles all user interaction:
    - Printing 
    - Input
    """

    def __init__(self, game_engine):
        self.game = game_engine

    def run_game(self):
        """
        This is the main game loop, which contains all print
        and input statements.
        """
        print("--- Welcome to the Guessing Game! --- ")
        print(f"I'm thinking of a number between {self.game.min_num} and {self.game.max_num}.")

        while not self.game.game_over:
            try:
                # this gets the raw text input first
                guess_str = input("Guess The number in my head: ")
                # this then convert it to an integer 
                user_guess = int(guess_str)
            
            except ValueError:
                # This catches if int() fails (e.g., user types "hello" or " ")
                print(f" '{guess_str}' is not a valid number. Try again.")
                continue
            
            result =  self.game.check_guess(user_guess)

            # --- This is the feedback logic ---

            # This just print the result from the core 
            if result == "high":
                print(f"Beautiful, your guess {user_guess} is a bit too high 🙁")
            elif result == "low":
                print(f"Almost there, your guess {user_guess} is now low 😌")
            elif result == "correct":
                print(f"That was smart!. your guess,{user_guess} is correct 🏆")
                print("CONGRATULATIONS 🥇")
                print(f" you used {self.game.guess_count} guesses")

        print("--- Game Over! Thanks for playing! ---")