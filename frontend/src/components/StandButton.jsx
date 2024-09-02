// components/StandButton.js
import React from "react";
import { Button } from '@mui/material';
import { dealCard, calculateSumOfHand } from "../utils/utils";

/**
 * StandButton component for ending the player's turn.
 *
 * This component renders a button that, when clicked, triggers the dealer's turn.
 *
 * @param {Array<string>} deck - The current deck of cards.
 * @param {Array<string>} dealerHand - The dealer's current hand.
 * @param {Function} setDeck - Function to update the deck of cards.
 * @param {Function} setDealerHand - Function to update the dealer's hand.
 * @param {Function} setGameOver - Function to set the game over state.
 *
 * @returns {JSX.Element} The rendered StandButton component.
 */
function StandButton({ deck, dealerHand, setDeck, setDealerHand, setGameOver }) {
  const handleClick = () => {
    console.info("Player has chosen to stand.");

    if (deck.length === 0) {
      console.error("Error: Deck is empty. Cannot continue the game.");
      return;
    }

    const drawCardForDealer = (currentDeck, dealerHandCopy, dealerHandValue) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (dealerHandValue >= 17) {
            resolve({ dealerHandCopy, dealerHandValue });
            return;
          }

          console.info("Current deck length before drawing card:", currentDeck.length);

          const { card, updatedDeck } = dealCard(currentDeck);

          if (!card || !updatedDeck) {
            console.error("Error: Failed to deal card to dealer.");
            resolve({ dealerHandCopy, dealerHandValue }); // Resolve even if there's an error
            return;
          }

          dealerHandCopy = [...dealerHandCopy, card];
          dealerHandValue = calculateSumOfHand(dealerHandCopy);

          console.info("Dealer draws a card:", card);
          console.info("Current deck length after drawing card:", updatedDeck.length);

          setDeck(updatedDeck);
          setDealerHand(dealerHandCopy);

          // Recursively call this function to draw the next card
          drawCardForDealer(updatedDeck, dealerHandCopy, dealerHandValue).then(resolve);
        }, 1000); // 1000 ms delay for demonstration
      });
    };

    console.info("Starting dealer's turn.");

    let currentDeck = [...deck];
    let dealerHandCopy = [...dealerHand];
    let dealerHandValue = calculateSumOfHand(dealerHandCopy);

    drawCardForDealer(currentDeck, dealerHandCopy, dealerHandValue).then(
      ({ dealerHandCopy, dealerHandValue }) => {
        console.info(`Dealer has finished drawing cards. Final hand: ${dealerHandCopy} for a total of ${dealerHandValue}`);
        setGameOver(true);
        console.info("Game set to over, calculating winner...");
      }
    );
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
        backgroundColor: 'red', // Custom background color
        color: 'white',           // Custom text color
        '&:hover': {
          backgroundColor: 'pink', // Custom hover background color
        },
      }}
    >
      Stand
    </Button>
  );
}

export default StandButton;
