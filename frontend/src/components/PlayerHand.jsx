import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { calculateSumOfHand } from '../utils/utils';
import cardImages from '../assets/cards/exporter';
import BACK from '../assets/cards/BACK.png';

/**
 * This component renders the player's hand of cards and calculates the total value of the hand.
 *
 * @param {Object} props - The props object.
 * @param {Array<string>} props.playerHand - An array of strings representing the player's hand. Each string represents a card with its rank.
 * @param {Function} props.setGameOver - A function to set the game over state.
 * @returns {JSX.Element} - A JSX element displaying the player's hand and total value.
 */
function PlayerHand({ playerHand, setGameOver }) {
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const loadImages = () => {
      const urls = playerHand.reduce((acc, card) => {
        const imagePath = `${card}.png`;
        acc[card] = cardImages[imagePath] || BACK; // Fallback to BACK image if not found
        return acc;
      }, {});
      
      console.log('Loaded image URLs:', urls); // Verify loaded URLs
      setImageUrls(urls);
    };

    loadImages();
  }, [playerHand]);

  if (!Array.isArray(playerHand) || playerHand.length === 0) {
    console.error('No cards in player\'s hand.');
    return <Typography variant="body1">No cards in hand.</Typography>; // Handle empty hand case gracefully
  }

  const total = calculateSumOfHand(playerHand);
  console.info(`playerHand: ${playerHand} playerTotal: ${total}`);

  if (total > 21 || total === 21) {
    setGameOver(true);
    console.info('Setting game to over due to player\'s hand.');
  }

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Your Hand (Total: {total})
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {playerHand.map((card, index) => {
          const imageUrl = imageUrls[card] || BACK; // Fallback image if the URL is not found
          console.log('Card:', card, 'Image URL:', imageUrl); // Verify image URL for each card
          return (
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
                backgroundImage: `url(${imageUrl})`,
                backgroundColor: '#f5f5f5',
                backgroundRepeat: 'no-repeat',
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default PlayerHand;
