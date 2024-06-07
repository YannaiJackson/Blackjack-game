import removeFirstOccurrence from "./utils";

let playerIn = true;
let dealerIn = true;

const deck = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
  "A",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
  "A",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
  "A",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
  "A",
];

let playerHand = [];
let dealerHand = [];

function dealCard(turn) {
  const randomIndex = Math.floor(Math.random() * deck.length); // Generate a random index
  const card = deck[randomIndex]; // Get the random item from the array
  turn.push(card);
  removeFirstOccurrence((array = deck), (item = card));
}
