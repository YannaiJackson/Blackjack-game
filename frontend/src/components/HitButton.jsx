import React from 'react';
import { dealCard } from '../utils/utils';  // Adjust the import if necessary

/**
 * HitButton component for drawing a card from the deck and adding it to the hand.
 * 
 * This component renders a button that, when clicked, draws a card from the deck,
 * adds it to the player's hand, and updates the deck accordingly.
 * 
 * @param {Function} setHand - Function to update the player's hand.
 * @param {Array<string>} deck - The current deck of cards.
 * @param {Function} setDeck - Function to update the deck.
 * 
 * @returns {JSX.Element} The rendered HitButton component.
 */
function HitButton({ setHand, deck, setDeck }) {

  const handleClick = () => {
    // Destructure the returned object from dealCard
    const { card, updatedDeck } = dealCard(deck);

    // Add the card to the hand
    setHand(prevHand => [...prevHand, card]);

    // Remove the card from the deck
    setDeck(updatedDeck);
    console.log(`Player hit successfully, remaining deck length: ${deck.length}`);
  };

  return (
    <button onClick={handleClick}>
      Hit
    </button>
  );
}

export default HitButton;
