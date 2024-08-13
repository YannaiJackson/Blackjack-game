import { useState, useEffect } from 'react';
import { buildNewDeck, dealCard } from './utils/utils';
import HitButton from './components/HitButton';
import PlayerHand from './components/PlayerHand';
import DealerHand from './components/DealerHand';


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
  const [deck, setDeck] = useState(buildNewDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  /**
   * Deals two cards from the deck to a given hand setter function.
   * 
   * @param {Function} handSetter - The state updater function for the hand.
   */
  const dealTwoCards = (handSetter) => {
    let currentDeck = [...deck];
    let newHand = [];

    for (let i = 0; i < 2; i++) {
      const { card, updatedDeck } = dealCard(currentDeck);
      newHand = [...newHand, card];
      currentDeck = updatedDeck;
    }

    handSetter(newHand);
    setDeck(currentDeck);
  };

  // Effect hook to deal initial cards to player and dealer
  useEffect(() => {
    // Check if deck is properly initialized
    if (deck.length === 52) {
      // Deal cards only if we haven't already
      {console.log('Dealing cards...')}
      dealTwoCards(setPlayerHand);
      dealTwoCards(setDealerHand);
    }
  }, [deck]); // Dependency on deck to avoid endless loop
  {console.log(`Remaining deck length: ${deck.length}`)}

  return (
    <div className="App">
      <h1>BlackJack</h1>

      <DealerHand dealerHand={dealerHand} />
      <PlayerHand playerHand={playerHand} />

      <HitButton 
        deck={deck}
        setDeck={setDeck} 
        setHand={setPlayerHand} 
      />
    </div>
  );
}

export default App;
