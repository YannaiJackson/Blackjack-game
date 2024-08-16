import React from 'react';
import { checkForWinner, calculateSumOfHand } from '../utils/utils';


function EndPage({ playerHand, dealerHand }) {
  // Calculate the hand values
  const playerHandValue = calculateSumOfHand(playerHand);
  const dealerHandValue = calculateSumOfHand(dealerHand);

  // Determine the game result
  const result = checkForWinner(playerHandValue, dealerHandValue);

  return (
    <div className="EndPage">
      <h2>Game Over</h2>
      <p>Player's Hand: {playerHand.join(', ')} (Value: {playerHandValue})</p>
      <p>Dealer's Hand: {dealerHand.join(', ')} (Value: {dealerHandValue})</p>
      <h3>{result}</h3>
      <button>Restart Game</button>
    </div>
  );
}

export default EndPage;
