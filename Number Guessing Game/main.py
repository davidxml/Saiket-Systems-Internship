from random import randint 

for x in range(1, 101):
    mech_gen = randint(1,100)
    print(f"You have used {x} guesses")
    user_guess = eval(input("Guess The number in my head: "))
    if user_guess > mech_gen:
        print(f"Beautiful, your guess, {user_guess} was too high")
    elif user_guess < mech_gen:
        print(f"Wonderful, your guess, {user_guess} was too low")
    if user_guess == mech_gen:
        print(f"That was so smart of you, your guess, {user_guess} was right")
        break
    if user_guess in [' ', 0000]:
        break
    if user_guess == "stop":
        break
print(f"you used {x} guesses")
