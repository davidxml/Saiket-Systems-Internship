"""
* This Module calculates and Returns the Equated Monthly Installments to 
be paid by loan takers
"""
def calculate_emi(P, R, N):
    """
    This Calculates the Equated Monthly Installents given the:
    - Principal
    - Rate
    - Number of Months (loan tenure)
    """
    emi_result = (P *R *((1 + R)**N))/(((1+R)**N)-1)
    return emi_result

def emi_engine():
    """
    Collects and processes user's input for:
    - Principal
    - Interest rate
    - Loan tenure
    """
    P = float(input("Enter the value for Principal: #"))

    r = float(input("Enter the value for Interest Rate: "))
    is_annual = input("Is the rate annual? (yes or no): ")
    if is_annual == "yes".lower():
        R = r / 12/ 100
    else:
        R = r / 100
    N = int(input("Enter the Loan tenure in months: "))
    if P == 0 or R == 0 or N == 0:
        print("Invalid Input, P, R or N cannot be zero")
        return None
    total_emi = calculate_emi(P, R, N)
    print(f"The Equated Monthly Installment is {total_emi:,.2f}")
    return total_emi


if __name__ == "__main__":
    emi_engine()
