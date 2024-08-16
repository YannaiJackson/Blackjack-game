import React from 'react';
import { dealCard, calculateSumOfHand } from '../utils/utils';

/**
 * The Stand button component.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.deck - The current deck of cards.
 * @param {Function} props.setDeck - Function to update the deck.
 * @param {Array} props.playerHand - The player's hand.
 * @param {Array} props.dealerHand - The dealer's hand.
 * @param {Function} props.setDealerHand - Function to update the dealer's hand.
 */
const StandButton = ({ deck, setDeck, playerHand, dealerHand, setDealerHand }) => {
    const handleStand = () => {
      console.info('Player has chosen to stand.');
      
      if (deck.length === 0) {
        console.error('Error: Deck is empty. Cannot continue the game.');
        return;
      }
  
      try {
        let currentDeck = [...deck];
        let dealerHandCopy = [...dealerHand];
        let dealerHandValue = calculateSumOfHand(dealerHandCopy);
  
        console.info('Starting dealer\'s turn.');
  
        // Dealer draws until they reach at least 17 points
        while (dealerHandValue < 17) {
          console.info('Current deck length before drawing card:', currentDeck.length);
          
          const { card, updatedDeck } = dealCard(currentDeck);
  
          if (!card || !updatedDeck) {
            console.error('Error: Failed to deal card to dealer.');
            return;
          }
  
          dealerHandCopy = [...dealerHandCopy, card];
          currentDeck = updatedDeck;
          dealerHandValue = calculateSumOfHand(dealerHandCopy);
  
          console.info('Dealer draws a card:', card);
          console.info('Current deck length after drawing card:', currentDeck.length);
        }
  
        console.info(`Dealer has finished drawing cards. Final hand: ${dealerHandCopy} for a total of ${dealerHandValue}`);
        setDeck(currentDeck);
        setDealerHand(dealerHandCopy);
  
        // Additional logic for game outcome can be added here
        console.info('Dealer\'s turn ended. The game state has been updated.');
      } catch (error) {
        console.error('An unexpected error occurred during the stand action:', error);
      }
    };

  
    return (
      <button onClick={handleStand} className="stand-button">
        Stand
      </button>
    );
  };
  
  export default StandButton;