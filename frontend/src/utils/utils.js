
/**
 * Builds a standard deck of 52 playing cards.
 * 
 * This function generates a deck of cards with 13 values (A, 2, 3, ..., 10, J, Q, K) and 4 suits (C, D, H, S).
 * Each card is represented as a string combining the value and suit, e.g., "A-C" for Ace of Clubs.
 * 
 * The resulting deck is an array of strings where each string represents a card in the format "value-suit".
 * 
 * @function
 * @returns {string[]} The array representing a standard deck of 52 playing cards.
 * 
 * @example
 * const deck = buildNewDeck();
 * console.log(deck); 
 * // Output: ["A-C", "2-C", "3-C", ..., "K-S"]
 */
export function buildNewDeck() {
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
  const suits = ["club", "diamond", "heart", "spade"];
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${suit}${value}`);
    }
  }
  
  return deck;
}

/**
 * Deals a card from the deck.
 * 
 * This function randomly selects a card from the deck and returns the card along with the updated deck.
 * 
 * @param {string[]} deck - The current deck of cards.
 * 
 * @returns {{ card: string, updatedDeck: string[] }} An object containing the dealt card and the updated deck.
 */
export function dealCard(deck) {
  if (deck.length === 0) {
    throw new Error("Cannot deal a card from an empty deck.");
  }

  // Generate a random index and select the card
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];

  // Return the dealt card and the updated deck
  return {
    card,
    updatedDeck: deck.filter((_, index) => index !== randomIndex)
  };
}

/**
 * Calculates the total value of a hand of cards.
 * 
 * This function evaluates a hand of cards where each card is represented by a string with its rank as the last character.
 * Face cards (`J`, `Q`, `K`, `T` for Ten) are worth 10 points. Aces (`A`) are worth 11 points initially and adjusted to 1 if the total exceeds 21. Numeric cards are worth their face value.
 * 
 * @param {Array<string>} hand - An array of strings representing the player's hand. Each string represents a card with its rank as the last character.
 * @returns {number} The total value of the hand.
 * 
 * @throws {Error} If the input `hand` is not an array or if it is an empty array.
 */
export function calculateSumOfHand(hand) {
  if (!Array.isArray(hand)) {
    throw new Error("Invalid hand: must be an array.");
  }
  
  if (hand.length === 0) {
    throw new Error("Invalid hand: cannot be empty.");
  }
  
  let sum = 0;
  let numberOfAces = 0;
  
  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
    let value = card.slice(-1); // Extract the rank of the card
    
    // Determine the value of the card
    if (value === "J" || value === "Q" || value === "K" || value === "T") {
      sum += 10; // Face cards and Ten are worth 10 points
    } else if (value === "A") {
      numberOfAces += 1; // Count the number of Aces
      sum += 11; // Initially count each Ace as 11 points
    } else {
      sum += parseInt(value, 10); // Convert numeric value to integer and add to sum
    }
  }
  
  // Adjust the sum for Aces if necessary
  while (sum > 21 && numberOfAces > 0) {
    sum -= 10; // Convert one Ace from 11 points to 1 point
    numberOfAces -= 1;
  }
  
  return sum;
}

/**
 * Checks for the winner in a Blackjack game based on the hand values of the dealer and player.
 * 
 * @param {number} dealerHandValue - The total value of the dealer's hand.
 * @param {number} playerHandValue - The total value of the player's hand.
 * @returns {string} - A string indicating the result: "Player wins", "Dealer wins", "Push", or "Player busts" / "Dealer busts".
 */
export function checkForWinner(playerHandValue, dealerHandValue) {
  // Define constants for the game
  const BLACKJACK = 21;
  
  // Determine if either player or dealer busts
  const playerBusted = playerHandValue > BLACKJACK;
  const dealerBusted = dealerHandValue > BLACKJACK;

  // Handle busts
  if (playerBusted) {
    return "Bust! Dealer wins";
  } else if (dealerBusted) {
    return "Player wins";
  }

  // Handle cases where neither busts
  if (playerHandValue === BLACKJACK && dealerHandValue === BLACKJACK) {
    return "Push";
  } else if (playerHandValue === BLACKJACK) {
    return "BLACKJACK! Player wins";
  } else if (dealerHandValue === BLACKJACK) {
    return "Dealer wins";
  }

  // Determine the winner based on hand values
  if (playerHandValue > dealerHandValue) {
    return "Player wins";
  } else if (playerHandValue < dealerHandValue) {
    return "Dealer wins";
  } else {
    return "Push";
  }
}

