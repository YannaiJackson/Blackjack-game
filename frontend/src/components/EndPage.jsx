import React from 'react';
import { checkForWinner, calculateSumOfHand } from '../utils/utils';


function EndPage({ playerHand, dealerHand, startNewRound }) {
  // Calculate the hand values
  const playerTotal = calculateSumOfHand(playerHand);
  const dealerTotal = calculateSumOfHand(dealerHand);

  // Determine the game result
  const result = checkForWinner(playerTotal, dealerTotal);

  return (
    <div className="EndPage">
      <h2>End of round</h2>
      <p>Dealer's Hand: {dealerHand.join(', ')} (Total: {dealerTotal})</p>
      <p>Player's Hand: {playerHand.join(', ')} (Total: {playerTotal})</p>
      <h3>{result}</h3>
      <button onClick={startNewRound}>New Round</button>
    </div>
  );
}

export default EndPage;
