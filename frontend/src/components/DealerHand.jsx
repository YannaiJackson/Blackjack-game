import React from 'react';
import { calculateSumOfHand } from '../utils/utils';

/**
 * This component renders the dealer's hand with the first card hidden as 'X'
 * and calculates the total value of the hand, including the first card in the calculation.
 *
 * @param {Object} props - The props object containing the dealer's hand.
 * @param {Array<string>} props.dealerHand - An array of strings representing the dealer's hand.
 * @returns {JSX.Element} - A JSX element displaying the dealer's hand with the first card as 'X' and the total value.
 */
function DealerHand({ dealerHand }) {
  // Check if dealerHand is an array and has elements
  if (!Array.isArray(dealerHand) || dealerHand.length === 0) {
    return (
      <p>No cards in dealer's hand.</p>
    );
  }

  // Throw an error if there are fewer than two cards
  if (dealerHand.length < 2) {
    throw new Error('Dealer must have at least two cards in their hand.');
  }

  // Calculate the total value of the dealer's hand including the 'X' card
  const total = calculateSumOfHand(dealerHand);

  // Create the displayed hand with the first card as 'X'
  const displayedDealerHand = ['X', ...dealerHand.slice(1)];

  return (
    <>
      {console.log(`dealerHand: ${dealerHand} dealerTotal: ${total}`)}
      <p>Dealer's Hand: {displayedDealerHand.join(', ')}</p>
    </>
  );
}

export default DealerHand;
