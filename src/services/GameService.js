import { CARD_STATUS, DECK_SIZE, CARD_SIZES } from "../constants";
import C2 from "../assets/resized/2C.jpg";

const BASE_URL = "https://picsum.photos";
const LIMIT = Math.ceil(DECK_SIZE / 2);

/**
 * Create new game
 */
export default () => {
  const urls = getRandomUrls();
  const deck = urls.concat(urls);

  while (deck.length > DECK_SIZE) {
    deck.pop();
  }

  const shuffledDeck = deck.sort(() => 0.5 - Math.random());
  // change this to shuffle a desk of 52 cards
  return shuffledDeck;
};

////// change this function to generate a deck of 52 cards
export const getRandomUrls = () => {
  // const imageUrl = `${BASE_URL}/${CARD_SIZES.width}/${CARD_SIZES.height}?random=`;

  const imageUrl = C2;
  const urlArray = [];

  for (let index = 0; index < LIMIT; index++) {
    urlArray.push({
      id: index,
      url: imageUrl,
      // url: imageUrl + index,
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
