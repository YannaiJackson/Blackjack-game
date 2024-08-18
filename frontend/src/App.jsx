import { useState, useEffect } from 'react';
import { buildNewDeck, dealCard, calculateSumOfHand } from './utils/utils';
import PlayerHand from './components/PlayerHand';
import DealerHand from './components/DealerHand';
import HitButton from './components/HitButton';
import EndPage from './components/EndPage';
import './App.css';


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

  /**
   * Starts a new round by resetting the game state.
   */
  const startNewRound = () => {
    const newDeck = buildNewDeck();
    if (newDeck) {
      setDeck(newDeck);
      setPlayerHand([]);
      setDealerHand([]);
      setCardsDealt(false);
      setGameOver(false);
    }
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

  /**
   * Handles the dealer's turn when the player chooses to stand.
   * Draws cards for the dealer with a delay until the dealer's hand value is at least 17.
   */
  const handleStandButton = () => {
    console.info('Player has chosen to stand.');
    
    if (deck.length === 0) {
      console.error('Error: Deck is empty. Cannot continue the game.');
      return;
    }

    const drawCardForDealer = (currentDeck, dealerHandCopy, dealerHandValue) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (dealerHandValue >= 17) {
            resolve({ dealerHandCopy, dealerHandValue });
            return;
          }

          console.info('Current deck length before drawing card:', currentDeck.length);

          const { card, updatedDeck } = dealCard(currentDeck);

          if (!card || !updatedDeck) {
            console.error('Error: Failed to deal card to dealer.');
            resolve({ dealerHandCopy, dealerHandValue }); // Resolve even if there's an error
            return;
          }

          dealerHandCopy = [...dealerHandCopy, card];
          dealerHandValue = calculateSumOfHand(dealerHandCopy);

          console.info('Dealer draws a card:', card);
          console.info('Current deck length after drawing card:', updatedDeck.length);

          setDeck(updatedDeck);
          setDealerHand(dealerHandCopy);

          // Recursively call this function to draw the next card
          drawCardForDealer(updatedDeck, dealerHandCopy, dealerHandValue).then(resolve);
        }, 1000); // 1000 ms delay for demonstration
      });
    };

    console.info('Starting dealer\'s turn.');
    
    let currentDeck = [...deck];
    let dealerHandCopy = [...dealerHand];
    let dealerHandValue = calculateSumOfHand(dealerHandCopy);

    drawCardForDealer(currentDeck, dealerHandCopy, dealerHandValue).then(({ dealerHandCopy, dealerHandValue }) => {
      console.info(`Dealer has finished drawing cards. Final hand: ${dealerHandCopy} for a total of ${dealerHandValue}`);
      
      console.info('Dealer\'s turn ended. The game state has been updated.');
      setGameOver(true);
      console.info('Game set to over, calculating winner...');
    });
  };

  return (
    <div className="App">
      <p className="title">BlackJack</p>

      <div className='game-board'>
        {!gameOver ? (
          <>
            <div className='hands'>
              <DealerHand dealerHand={dealerHand} />
              <PlayerHand playerHand={playerHand} setGameOver={setGameOver} />
            </div>

            <div className='buttons'>
              <HitButton
                deck={deck}
                setDeck={setDeck} 
                setHand={setPlayerHand} 
              />

              <button onClick={handleStandButton}>Stand</button>
            </div>

          </>
        ) : (
          <EndPage
            playerHand={playerHand}
            dealerHand={dealerHand}
            startNewRound={startNewRound}
          />
        )}
      </div>
    </div>
  );
}

export default App;
