import React from 'react';
import { checkForWinner, calculateSumOfHand } from '../utils/utils';
import cardImages from '../assets/cards/exporter';
import BACK from '../assets/cards/BACK.png';

/**
 * This component displays the results at the end of a round,
 * including the hands of both the player and the dealer with card images.
 *
 * @param {Object} props - The props object.
 * @param {Array<string>} props.playerHand - The player's hand of cards.
 * @param {Array<string>} props.dealerHand - The dealer's hand of cards.
 * @param {Function} props.startNewRound - Function to start a new round.
 * @returns {JSX.Element} - A JSX element displaying the end of round results.
 */
function EndPage({ playerHand, dealerHand, startNewRound }) {
  // Calculate the hand values
  const playerTotal = calculateSumOfHand(playerHand);
  const dealerTotal = calculateSumOfHand(dealerHand);

  // Determine the game result
  const result = checkForWinner(playerTotal, dealerTotal);

  return (
    <div className="EndPage">
      <h2>End of round</h2>

      {/* Dealer's Hand */}
      <div>
        <h3>Dealer's Hand ({'total of '+dealerTotal}):</h3>
        <div>
          {dealerHand.map((card, index) => (
            <img
              key={index}
              src={cardImages[`${card}.png`] || BACK} // Fallback to BACK image if not found
              alt={`Card ${card}`}
              style={{ width: '100px', margin: '5px' }}
            />
          ))}
        </div>
      </div>

      {/* Player's Hand */}
      <div>
        <h3>Player's Hand ({'total of '+playerTotal}):</h3>
        <div>
          {playerHand.map((card, index) => (
            <img
              key={index}
              src={cardImages[`${card}.png`] || BACK} // Fallback to BACK image if not found
              alt={`Card ${card}`}
              style={{ width: '100px', margin: '5px' }}
            />
          ))}
        </div>
      </div>

      {/* Game Result */}
      <h3>{result}</h3>
      <button onClick={startNewRound}>New Round</button>
    </div>
  );
}

export default EndPage;
