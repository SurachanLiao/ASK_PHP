import { CARD_STATUS, DECK_SIZE, CARD_SIZES } from "../constants";

import cardsData from "../components/cardsData";

//half deck size for matching game purpose
// const LIMIT = Math.ceil(DECK_SIZE / 2);
const LIMIT = DECK_SIZE


/**
 * Create new game
 */
export default () => {
  const cards = getRandomCards();
  const deck = cards.concat(cards);

  while (deck.length > DECK_SIZE) {
    deck.pop();
  }
  // shuffle a given set of card
  const shuffledDeck = deck.sort(() => 0.5 - Math.random());

  return shuffledDeck;
};

// generate randoms cards from a deck of 52 cards
export const getRandomCards = () => {

  const imageArray = [];
  var rand = new Array(DECK_SIZE);

  // NEED FIX TO GENERATE UNIQUE RANDOM
  // select random cards from the deck
  for (let index = 0; index < DECK_SIZE; index++) {
     rand[index] = Math.floor(Math.random() * 52);
  }

  // match random cards from cardsData to the deck in play
  for (let index = 0; index < DECK_SIZE; index++) {
    imageArray.push({
      id: index,
      url: cardsData[rand[index]].image,
      status: CARD_STATUS.HIDDEN
    });
  }

  return imageArray;
};

/**
 * Check if the game is completed
 * @param {*} deck
 */
export const checkGame = deck => {
  const matches = Object.keys(deck).filter(
    key => deck[key].status === CARD_STATUS.MATCHED
  );

  return matches.length === DECK_SIZE - 1;
};
