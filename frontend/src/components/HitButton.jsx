import React from "react";
import { dealCard } from "../utils/utils";
import { Button } from '@mui/material';

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
    const { card, updatedDeck } = dealCard(deck);
    setHand((prevHand) => [...prevHand, card]);
    setDeck(updatedDeck);
    console.log(`Player hit successfully (card: ${card})`);
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      sx={{
        width: 140,
        height: 130,
        fontSize: 20,
        fontWeight: 'bold',
        border: '3px solid black',
        borderRadius: '50%',
        backgroundColor: 'blue', // Custom background color
        color: 'white',           // Custom text color
        '&:hover': {
          backgroundColor: 'lightBlue', // Custom hover background color
        },
      }}
    >
      Hit
    </Button>
  );
}

export default HitButton;
