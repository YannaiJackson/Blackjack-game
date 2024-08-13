import React from 'react';
import { calculateSumOfHand } from '../utils/utils';

/**
 * This component renders the player's hand and calculates the total value of the hand.
 *
 * @param {Object} props - The props object containing the player's hand.
 * @param {Array<string>} props.playerHand - An array of strings representing the player's hand.
 * @returns {JSX.Element} - A JSX element displaying the player's hand and total value.
 */
function PlayerHand({ playerHand }) {
  // Check if playerHand is an array and has elements
  if (!Array.isArray(playerHand) || playerHand.length === 0) {
    return (
      <p>No cards in player's hand.</p>
    );
  }

  // Calculate the total value of the player's hand
  const total = calculateSumOfHand(playerHand);

  // Determine the game outcome based on the total
  if (total === 21) {
    return (
      <>
        {console.log(`playerHand: ${playerHand} playerTotal: ${total}`)} {/* For debugging */}
        <p>Player has a blackjack! You win!</p>
      </>
    );
  } else if (total > 21) {
    return (
      <>
        {console.log(`playerHand: ${playerHand} playerTotal: ${total}`)} {/* For debugging */}
        <p>Player busts! Dealer wins.</p>
      </>
    );
  } else {
    // Default display of player's hand and total
    return (
      <>
        {console.log(`playerHand: ${playerHand} playerTotal: ${total}`)} {/* For debugging */}
        <p>Player's Hand: {playerHand.join(', ')}</p>
        <p>Total: {total}</p>
      </>
    );
  }
}

export default PlayerHand;
