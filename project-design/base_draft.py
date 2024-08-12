import random

playerIn = True
dealerIn = True

# create deck of cards
deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 'J', 'Q', 'K', 'A', 'J', 'Q', 'K', 'A', 'J', 'Q', 'K', 'A', 'J', 'Q', 'K', 'A']
player_hand = []
dealer_hand = []


# deal the cards
def dealCard(turn):
    card = random.choice(deck)
    turn.append(card)
    deck.remove(card)


# calculate the total of each hand
def total(turn):
    total = 0
    face = ['J', 'Q', 'K']
    for card in turn:
        if card in range(1, 11):
            total += card
        elif card in face:
            total += 10
        else:
            if total > 11:
                total += 1
            else:
                total += 11
    return total


# game loop (main)
for _ in range(2):
    dealCard(player_hand)
    dealCard(dealer_hand)

while playerIn or dealerIn:
    print(f"the dealers hand is: {dealer_hand} , X")
    print(f"your hand is: {player_hand} for a total of: {total(player_hand)}")
    if playerIn:
        StayOrHit = input("1: stay\n2: hit\n")
    if total(dealer_hand) > 16:
        dealerIn = False
    else:
        dealCard(dealer_hand)
    if StayOrHit == '1':
        playerIn = False
    elif StayOrHit == '2':
        dealCard(player_hand)
    if total(dealer_hand) >= 21:
        break
    elif total(player_hand) >= 21:
        break

if total(player_hand) == 21:
    print(
        f"\nyou have {player_hand} for a total of {total(player_hand)}, the dealer has {dealer_hand} for a total of {total(dealer_hand)}.")
    print("BLACK JACK!")
elif total(dealer_hand) == 21:
    print(
        f"\ndealer has {dealer_hand} for a total of {total(dealer_hand)}, you have {player_hand} for a total of {total(player_hand)}.")
    print("you lose :(")
elif total(player_hand) > 21:
    print(
        f"\nyou have {player_hand} for a total of {total(player_hand)}, the dealer has {dealer_hand} for a total of {total(dealer_hand)}.")
    print("you bust, dealer wins :(")
elif total(dealer_hand) > 21:
    print(
        f"\ndealer has {dealer_hand} for a total of {total(dealer_hand)}, you have {player_hand} for a total of {total(player_hand)}.")
    print("dealer bust, YOU WIN!")
elif 21 - total(dealer_hand) < 21 - total(player_hand):
    print(
        f"\nyou have {player_hand} for a total of {total(player_hand)}, the dealer has {dealer_hand} for a total of {total(dealer_hand)}.")
    print("dealer has higher hand, you lose :(")
elif 21 - total(dealer_hand) > 21 - total(player_hand):
    print(
        f"\nyou have {player_hand} for a total of {total(player_hand)}, the dealer has {dealer_hand} for a total of {total(dealer_hand)}.")
    print("you have higher hand, YOU WIN!")
