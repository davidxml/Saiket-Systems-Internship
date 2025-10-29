import random 

class GuessingGame:
    """Holds the game's core logic."""
    def __init__ (self, min_num, max_num):
        self.min_num = min_num
        self.max_num = max_num
        self.secret_number = random.randint(self.min_num, self.max_num)
        self.guess_count = 0
        self.game_over = False

    def check_guess(self, guess):
        """Takes a guess, compares it, and returns a hint"""
        self.guess_count += 1   # tracks the guess
        if guess == self.secret_number:
            self.game_over = True
            return "correct"
        elif guess < self.secret_number:
            return "low"
        else: 
            return "high"
