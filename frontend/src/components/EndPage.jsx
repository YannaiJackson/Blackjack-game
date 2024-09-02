import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
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
    <Box sx={{ textAlign: 'center', p: 3, mt: -5 }}>
      <Typography variant="h5" gutterBottom>
        End of Round
      </Typography>

      {/* Dealer's Hand */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Dealer's Hand (total of {dealerTotal})
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {dealerHand.map((card, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: '100px',
                height: '150px',
                m: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${cardImages[`${card}.png`] || BACK})`,
                backgroundColor: '#f5f5f5',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Player's Hand */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Player's Hand (total of {playerTotal})
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {playerHand.map((card, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: '100px',
                height: '150px',
                m: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${cardImages[`${card}.png`] || BACK})`,
                backgroundColor: '#f5f5f5',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Game Result */}
      <Typography variant="h4" gutterBottom>
        {result}
      </Typography>

      <Button 
        variant="contained"
        color="primary"
        onClick={startNewRound}
        sx={{ mt: 2 }}
      >
        New Round
      </Button>
    </Box>
  );
}

export default EndPage;
