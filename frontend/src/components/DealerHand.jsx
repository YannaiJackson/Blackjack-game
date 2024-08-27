import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { calculateSumOfHand } from '../utils/utils';
import cardImages from '../assets/cards/exporter';
import BACK from '../assets/cards/BACK.png';

/**
 * This component renders the dealer's hand with the first card hidden as 'BACK'
 * and calculates the total value of the hand, including the first card in the calculation.
 *
 * @param {Object} props - The props object containing the dealer's hand.
 * @param {Array<string>} props.dealerHand - An array of strings representing the dealer's hand.
 * @returns {JSX.Element} - A JSX element displaying the dealer's hand with the first card as 'BACK' and the total value.
 */
function DealerHand({ dealerHand }) {
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const loadImages = () => {
      const urls = dealerHand.reduce((acc, card) => {
        const imagePath = `${card}.png`;
        acc[card] = cardImages[imagePath] || BACK; // Fallback to BACK image if not found
        return acc;
      }, {});
      
      console.log('Loaded image URLs:', urls); // Verify loaded URLs
      setImageUrls(urls);
    };

    loadImages();
  }, [dealerHand]);

  // Check if dealerHand is an array and has elements
  if (!Array.isArray(dealerHand) || dealerHand.length === 0) {
    return (
      <Typography variant="body1">No cards in dealer's hand.</Typography>
    );
  }

  // Throw an error if there are fewer than two cards
  if (dealerHand.length < 2) {
    throw new Error('Dealer must have at least two cards in their hand.');
  }

  // Calculate the total value of the dealer's hand including the 'BACK' card
  const total = calculateSumOfHand(dealerHand); 

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Dealer's Hand
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {dealerHand.map((card, index) => {
          // Set the first card to BACK, and the rest to their respective image
          const imageUrl = index === 0 ? BACK : (imageUrls[card] || BACK); 
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
      <Typography variant="body1" sx={{ mt: 2 }}>
        Total: {total}
      </Typography>
    </Box>
  );
}

export default DealerHand;
