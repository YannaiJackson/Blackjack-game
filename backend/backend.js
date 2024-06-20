import removeFirstOccurrence from "./utils";

let playerIn = true;
let dealerIn = true;

const deck = [(1, 'heart'), (2, 'heart'), (3, 'heart'), 
    (4, 'heart'), (5, 'heart'), (6, 'heart'), (7, 'heart'), 
    (8, 'heart'), (9, 'heart'), (10, 'heart'), ('J', 'heart'), 
    ('Q', 'heart'), ('K', 'heart'), ('A', 'heart'),
    (1, 'diamond'), (2, 'diamond'), (3, 'diamond'), (4, 'diamond'),
    (5, 'diamond'), (6, 'diamond'), (7, 'diamond'), (8, 'diamond'),
    (9, 'diamond'), (10, 'diamond'), ('J', 'diamond'), ('Q', 'diamond'),
    ('K', 'diamond'), ('A', 'diamond'),
    (1,'spade'), (2,'spade'), (3,'spade'), (4,'spade'), (5,'spade'),
    (6,'spade'), (7,'spade'), (8,'spade'), (9,'spade'), (10,'spade'),
    ('J','spade'), ('Q','spade'), ('K','spade'), ('A','spade'),
    (1, 'club'), (2, 'club'), (3, 'club'), (4, 'club'), (5, 'club'),
    (6, 'club'), (7, 'club'), (8, 'club'), (9,'club'), (10, 'club'),
    ('J', 'club'), ('Q', 'club'), ('K', 'club'), ('A', 'club')];

let playerHand = [];
let dealerHand = [];

function dealCardFromDeck(turn) {
  const randomIndex = Math.floor(Math.random() * deck.length); // Generate a random index
  const card = deck[randomIndex]; // Get the random item from the array
  turn.push(card);
  removeFirstOccurrence((array = deck), (item = card));
}

function calculateSumOfHand(hand) {
    let sum = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i][0] === 'J' || hand[i][0] === 'Q' || hand[i][0] === 'K') {
            sum += 10;
        } else if (hand[i][0] != 'A') {
            sum += hand[i][0];
        } else if (hand[i][0] === 'A' && sum <= 10) {
            sum += 11;
        } else if (hand[i][0] === 'A' && sum > 10) {
            sum += 1;
        }
    }
    return sum;
}
