import React from 'react';
import { calculateSumOfHand } from '../utils/utils';

/**
 * This component renders the player's hand and calculates the total value of the hand.
 *
 * @param {Object} props - The props object containing the player's hand.
 * @param {Array<string>} props.playerHand - An array of strings representing the player's hand.
 * @returns {JSX.Element} - A JSX element displaying the player's hand and total value.
 */
function PlayerHand({ playerHand, setGameOver }) {
  // Check if playerHand is an array and has elements
  if (!Array.isArray(playerHand) || playerHand.length === 0) {
    console.error('No cards in players hand.');
  }

  // Calculate the total value of the player's hand
  const total = calculateSumOfHand(playerHand);
  console.info(`playerHand: ${playerHand} playerTotal: ${total}`)
  
  if (total > 21 || total === 21) {
    setGameOver(true)
    console.info('Setting game to over due to players hand');
  }

  return (
    <>
      <p>Player's Hand: {playerHand.join(', ')} (Total: {playerHandValue})</p>
    </>
  );
}

export default PlayerHand;
