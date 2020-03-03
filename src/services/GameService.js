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

  const urlArray = [];
  var rand = new Array(LIMIT);

  //////// NEED FIX TO GENERATE UNIQUE RANDOM
  // random cards from the deck
  for (let index = 0; index < LIMIT; index++) {
     rand[index] = Math.floor(Math.random() * 52);
  }

  for (let index = 0; index < LIMIT; index++) {
    urlArray.push({
      id: index,
      url: cardsData[rand[index]].image,
      status: CARD_STATUS.HIDDEN
    });
  }

  return urlArray;
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
