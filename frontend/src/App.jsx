import { useState, useEffect } from 'react';
import { buildNewDeck, dealCard, checkForWinner, calculateSumOfHand } from './utils/utils';
import PlayerHand from './components/PlayerHand';
import DealerHand from './components/DealerHand';
import HitButton from './components/HitButton';
import StandButton from './components/StandButton';
import EndPage from './components/EndPage'; // Import the EndPage component

/**
 * The main application component for the Blackjack game.
 * 
 * This component initializes the deck and hands for both player and dealer, deals two cards to each,
 * and provides the Hit button functionality to draw additional cards.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
function App() { 
  // Initialize state
  const [deck, setDeck] = useState(() => {
    const newDeck = buildNewDeck() || [];
    console.info(`Initial deck created with ${newDeck.length} cards.`);
    return newDeck;
  });
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [cardsDealt, setCardsDealt] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  /**
   * Deals two cards to the player and two cards to the dealer, then logs the deck and hands.
   */
  const dealInitialCards = () => {
    let currentDeck = [...deck];
    let newPlayerHand = [];
    let newDealerHand = [];

    console.info('Dealing two cards to the player...');
    for (let i = 0; i < 2; i++) {
      console.info(`Deck length before dealing player card ${i + 1}: ${currentDeck.length}`);
      const { card, updatedDeck } = dealCard(currentDeck);
      if (!card || !updatedDeck) {
        console.error('Error: Failed to deal card.');
        return;
      }
      newPlayerHand = [...newPlayerHand, card];
      currentDeck = updatedDeck;
      console.info(`Player card ${i + 1}:`, card);
      console.info(`Deck length after dealing player card ${i + 1}: ${currentDeck.length}`);
    }

    console.info('Dealing two cards to the dealer...');
    for (let i = 0; i < 2; i++) {
      console.info(`Deck length before dealing dealer card ${i + 1}: ${currentDeck.length}`);
      const { card, updatedDeck } = dealCard(currentDeck);
      if (!card || !updatedDeck) {
        console.error('Error: Failed to deal card.');
        return;
      }
      newDealerHand = [...newDealerHand, card];
      currentDeck = updatedDeck;
      console.info(`Dealer card ${i + 1}:`, card);
      console.info(`Deck length after dealing dealer card ${i + 1}: ${currentDeck.length}`);
    }

    // Update hands and deck state
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setDeck(currentDeck);
  };


  if (!cardsDealt && deck.length === 52) {
    console.info(`Initial deck length: ${deck.length}`);
    dealInitialCards();
    setCardsDealt(true);
  } else if (!cardsDealt && deck.length !== 52) {
    console.error('Deck does not have the correct number of cards.');
  }
  

  // Effect hook to log the deck length whenever it changes
  useEffect(() => {
    if (deck.length !== 52) {
      console.info('Updated deck length:', deck.length);
    }
  }, [deck]);


  return (
    <div className="App">
      <h1>BlackJack</h1>

      {!gameOver ? (
        <>
          <DealerHand dealerHand={dealerHand} />
          <PlayerHand playerHand={playerHand} setGameOver={setGameOver} />

          <HitButton
            deck={deck}
            setDeck={setDeck} 
            setHand={setPlayerHand} 
          />

          <StandButton 
            deck={deck}
            setDeck={setDeck} 
            playerHand={playerHand}
            dealerHand={dealerHand}
            setDealerHand={setDealerHand}
            setGameOver={setGameOver}
          />
        </>
      ) : (
        <EndPage
          playerHand={playerHand}
          dealerHand={dealerHand}
        />
      )}
    </div>
  );
}

export default App;
