
function buildDeck(){
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push([values[j] + "-" + types[i]]);
    }
  }
  console.log(deck);
}


/**
 * Removes the first occurrence of the specified card from the deck.
 *
 * @param {Array} deck - The array to remove the card from.
 * @param {any} card - The card to remove from the array.
 * @returns {void} This function modifies the array in place and does not return a new array.
 *
 * If the card is not found in the array, no action is taken.
 */
function removeCardFromDeck(deck, card) {
  console.log(`Removing ${card} from deck...`);

  // Find the index of the card in the deck
  const index = deck.indexOf(card);

  // If the card exists in the deck, remove it
  if (index !== -1) {
    deck.splice(index, 1);
  }
}

/**
 * Deals a card from the deck and adds it to the specified turn.
 *
 * This function selects a random card from the `deck` array, logs the action, and adds the card to the `turn` array.
 * It then removes the dealt card from the `deck` using the `removeCardFromDeck` function.
 *
 * @param {Array} turn - The array to which the dealt card will be added.
 * @param {Array} deck - The array from which the card will be removed.
 *
 * @returns {void} This function does not return any value but modifies the `turn` and `deck` arrays.
 *
 * @throws {Error} Throws an error if the `deck` is empty, as no card can be dealt.
 */
function dealCardFromDeck(turn, deck) {
  console.log("Dealing a card to...");

  if (deck.length === 0) {
    throw new Error("Cannot deal a card from an empty deck.");
  }

  // Generate a random index and select the card
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];

  // Add the card to the turn array
  turn.push(card);

  // Remove the card from the deck
  removeCardFromDeck(deck, card);
}

function calculateSumOfHand(hand) {
  console.log("Calculating the sum of the hand...");
  let sum = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i][0] === "J" || hand[i][0] === "Q" || hand[i][0] === "K") {
      sum += 10;
    } else if (hand[i][0] != "A") {
      sum += hand[i][0];
    } else if (hand[i][0] === "A" && sum <= 10) {
      sum += 11;
    } else if (hand[i][0] === "A" && sum > 10) {
      sum += 1;
    }
  }
  return sum;
}

// game loop
for (let i = 0; i < 2; i++) {
  dealCardFromDeck(playerHand);
  dealCardFromDeck(dealerHand);
}
while (playerIn || dealerIn) {
  let playerSum = calculateSumOfHand(playerHand);
  let dealerSum = calculateSumOfHand(dealerHand);
  console.log(`Player's hand: ${playerHand}, sum: ${playerSum}`);
  console.log(`Dealer's hand: ${dealerHand}, sum: ${dealerSum}`);
  if (playerIn) {
    const operation = prompt("Hit or stand?");
    console.log(`player chose to ${operation} with a sum of ${playerSum}`);

    if (calculateSumOfHand(dealerHand) > 16) {
      dealerIn = false;
      console.log(`Dealer is out, sum: ${dealerSum}`);
    } else {
      dealCardFromDeck(dealerHand);
    }

    if (operation.toLowerCase() === "hit") {
      dealCardFromDeck(playerHand);
      console.log("Player chose to hit.");
    } else if (operation.toLowerCase() === "stand") {
      playerIn = false;
      console.log("Player chose to stand.");
    } else {
      // Handle invalid input
      console.log("Invalid choice. Please choose 'hit' or 'stand'.");
    }

    if (calculateSumOfHand(playerHand) >= 21) {
      break;
    }
    if (calculateSumOfHand(dealerHand) >= 21) {
      break;
    }
  }
}

if (calculateSumOfHand(playerHand === 21)) {
  console.log("Player wins!");
} else if (calculateSumOfHand(dealerHand) === 21) {
  console.log("Dealer wins!");
} else if (calculateSumOfHand(playerHand) > 21) {
  console.log("Dealer wins!");
} else if (calculateSumOfHand(dealerHand) > 21) {
  console.log("Player wins!");
} else if (calculateSumOfHand(playerHand) === calculateSumOfHand(dealerHand)) {
  console.log("Draw! but player wins!");
} else if (calculateSumOfHand(playerHand) > calculateSumOfHand(dealerHand)) {
  console.log("Player wins!");
} else if (calculateSumOfHand(playerHand) < calculateSumOfHand(dealerHand)) {
  console.log("Dealer wins!");
}
