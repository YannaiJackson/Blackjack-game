import React, { useState, useEffect } from 'react';
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
      <p>No cards in dealer's hand.</p>
    );
  }

  // Throw an error if there are fewer than two cards
  if (dealerHand.length < 2) {
    throw new Error('Dealer must have at least two cards in their hand.');
  }

  // Calculate the total value of the dealer's hand including the 'BACK' card
  const total = calculateSumOfHand(dealerHand); 

  return (
    <>
      <p>Dealer's Hand:</p>
      <div>
        {dealerHand.map((card, index) => {
          // Set the first card to BACK, and the rest to their respective image
          const imageUrl = index === 0 ? BACK : (imageUrls[card] || BACK); 
          console.log('Card:', card, 'Image URL:', imageUrl); // Verify image URL for each card
          return (
            <img
              key={index}
              src={imageUrl}
              alt={`Card ${card}`}
              style={{ width: '100px', margin: '5px' }}
            />
          );
        })}
      </div>
    </>
  );
}

export default DealerHand;
