import { CARD_STATUS, DECK_SIZE, CARD_SIZES } from "../constants";
//import 8 images of playing cards for testing purpose
import C2 from "../assets/resized/2C.jpg";
import C3 from "../assets/resized/3C.jpg";
import C4 from "../assets/resized/4C.jpg";
import C5 from "../assets/resized/5C.jpg";
import C6 from "../assets/resized/6C.jpg";
import C7 from "../assets/resized/7C.jpg";
import C8 from "../assets/resized/8C.jpg";
import cardsData from "../components/cardsData";

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
  
  const imageUrl = [C2,C3,C4,C5,C6,C7,C8];
  // const imageUrl = [LIMIT];
  // imageUrl = imageUrl.map(url => cardsData.)

  // const imageUrl = images;
  const urlArray = [];

  // for (let index = 0; index < LIMIT; index++) {
  for (let index = 0; index < LIMIT; index++) {
    urlArray.push({
      id: index,
      url: imageUrl[index],
      // url: imageUrl + index,
      status: CARD_STATUS.HIDDEN
    });
  }

  return urlArray;
};

// // Attribution: from https://kaz-yamada.github.io/Card-Match-Game
// // generate a deck of 52 cards
// export const generateDeck = () => {
//   // only 8 cards in deck for testing
//   const cards = [C2,C3,C4,C5,C6,C7,C8];
  
//   const deckArray = [];

//   // create properties of each card
//   for (let index = 0; index < LIMIT; index++) {
//     deckArray.push({
//       id: index,
//       card: cards[index],
//       status: CARD_STATUS.HIDDEN
//     });
//   }

//   return deckArray;
// };

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
