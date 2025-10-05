from emi_generator import emi_engine        # This makes emi_engine available to be used.


print("WElCOME TO MY LOAN EMI CALCULATOR \nLet's get to work!")
print("Enter the data carefully and accurately, we don't want errors")

while True:
    emi_engine()
    run_again = input("Do you want to Calculate Another EMI? (yes or no): ")
    print("\n")
    if run_again == "no".lower():
        break
