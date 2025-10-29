from game.core import GuessingGame
from game.ui import CLInterface
from game.config import MIN_NUMBER, MAX_NUMBER

# This Glues the other parts together.
if  __name__ == "__main__": 

    game_engine = GuessingGame(MIN_NUMBER, MAX_NUMBER)
    ui = CLInterface(game_engine)
    ui.run_game()
