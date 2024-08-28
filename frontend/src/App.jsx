import { useState, useEffect } from "react";
import { buildNewDeck, dealCard } from "./utils/utils";
import PlayerHand from "./components/PlayerHand";
import DealerHand from "./components/DealerHand";
import HitButton from "./components/HitButton";
import EndPage from "./components/EndPage";
import StandButton from "./components/StandButton"; // Import the StandButton component
import { Box, Typography } from '@mui/material';
import borderImage from "./assets/border-image.jpg";

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

    console.info("Dealing two cards to the player...");
    for (let i = 0; i < 2; i++) {
      console.info(
        `Deck length before dealing player card ${i + 1}: ${currentDeck.length}`
      );
      const { card, updatedDeck } = dealCard(currentDeck);
      if (!card || !updatedDeck) {
        console.error("Error: Failed to deal card.");
        return;
      }
      newPlayerHand = [...newPlayerHand, card];
      currentDeck = updatedDeck;
      console.info(`Player card ${i + 1}:`, card);
      console.info(
        `Deck length after dealing player card ${i + 1}: ${currentDeck.length}`
      );
    }

    console.info("Dealing two cards to the dealer...");
    for (let i = 0; i < 2; i++) {
      console.info(
        `Deck length before dealing dealer card ${i + 1}: ${currentDeck.length}`
      );
      const { card, updatedDeck } = dealCard(currentDeck);
      if (!card || !updatedDeck) {
        console.error("Error: Failed to deal card.");
        return;
      }
      newDealerHand = [...newDealerHand, card];
      currentDeck = updatedDeck;
      console.info(`Dealer card ${i + 1}:`, card);
      console.info(
        `Deck length after dealing dealer card ${i + 1}: ${currentDeck.length}`
      );
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
    console.error("Deck does not have the correct number of cards.");
  }

  // Effect hook to log the deck length whenever it changes
  useEffect(() => {
    if (deck.length !== 52) {
      console.info("Updated deck length:", deck.length);
    }
  }, [deck]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#111C21',
        color: 'white',
        padding: 0,
        margin: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          width: '85%',
          height: '90%',
          borderRadius: '0 0 550px 550px',
          backgroundImage: `url(${borderImage})`,
          justifyContent: 'center',
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.75)',
          border: '6px black solid',
          borderTop: 'none',
          zIndex: 2, // Higher zIndex to appear on top of Typography
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '93%',
            height: '93%',
            backgroundColor: '#006400',
            borderRadius: '0 0 520px 520px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            zIndex: 3, // Higher zIndex to appear on top of Typography
            mb: 4,
            border: '5px black solid',
            borderTop: 'none',
          }}
        >
          <Typography
            variant="h1"
            color="gold"
            fontSize={245}
            sx={{
              fontWeight: 'bold',
              opacity: 0.3,
              position: 'absolute', // Absolute positioning to place Typography in the background
              zIndex: -100, // Lower zIndex to appear behind other content
              mb: 16,
            }}
          >
            BlackJack
          </Typography>

          <Box display="flex" flexDirection="column" alignItems="center" mb={0}>
            {!gameOver ? (
              <>
                <Box display="flex" flexDirection="column" alignItems="center" mb={15}>
                  <DealerHand dealerHand={dealerHand} />
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" mb={-2}>
                  <PlayerHand playerHand={playerHand} setGameOver={setGameOver} />
                </Box>
              </>
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                <EndPage
                  playerHand={playerHand}
                  dealerHand={dealerHand}
                  startNewRound={startNewRound}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          zIndex: 4, // Higher zIndex to appear on top of everything
        }}
      >
        <HitButton
          deck={deck}
          setDeck={setDeck}
          setHand={setPlayerHand}
        />

        <StandButton
          deck={deck}
          dealerHand={dealerHand}
          setDeck={setDeck}
          setDealerHand={setDealerHand}
          setGameOver={setGameOver}
        />
      </Box>
    </Box>
  );
}

export default App;