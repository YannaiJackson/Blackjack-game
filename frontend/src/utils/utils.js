
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
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["C", "D", "H", "S"];
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${value}-${suit}`);
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
 * Calculates the total value of a hand of playing cards.
 * 
 * This function computes the sum of a hand of cards based on typical card values:
 * - Face cards (J, Q, K) are worth 10 points each.
 * - Number cards are worth their face value.
 * - Aces (A) can be worth 11 points if it doesn't bust the hand (i.e., total <= 21); otherwise, they are worth 1 point.
 * 
 * Note: The hand is an array of card strings where each card is represented as a combination of value and suit, e.g., "4-C" or "K-H".
 * 
 * @param {string[]} hand - An array of strings representing the cards in the hand. Each string has the format "value-type", where:
 *   - `value` is the card value ("2"-"10", "J", "Q", "K", "A").
 *   - `type` is the card type/suit ("C", "D", "H", "S").
 * 
 * @returns {number} The total value of the hand based on the card values and rules described.
 * 
 * @example
 * const hand = ["4-C", "K-H", "3-S"];
 * const sum = calculateSumOfHand(hand);
 * console.log(sum); // Output: 17
 * 
 * @example
 * const handWithAce = ["A-D", "9-C", "5-H"];
 * const sumWithAce = calculateSumOfHand(handWithAce);
 * console.log(sumWithAce); // Output: 15 (Ace counted as 11)
 */
export function calculateSumOfHand(hand) {
  if (!Array.isArray(hand)) {
    throw new Error("Invalid hand: must be an array.");
  }
  
  if (hand.length === 0) {
    throw new Error("Invalid hand: cannot be empty.");
  }

  console.log("Calculating the sum of the hand...");
  
  let sum = 0;
  for (let i = 0; i < hand.length; i++) {
    let data = hand[i].split("-");
    let value = data[0];
    if (value === "J" || value === "Q" || value === "K") {
      sum += 10;
    } else if (value != "A") {
      sum += parseInt(value, 10); // Ensure value is treated as a number
    } else if (value === "A" && sum <= 10) {
      sum += 11;
    } else if (value === "A" && sum > 10) {
      sum += 1;
    }
  }
  return sum;
}

