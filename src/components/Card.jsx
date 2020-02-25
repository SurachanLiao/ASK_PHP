import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";

import { CARD_STATUS, CARD_SIZES } from "../constants";

import image from "../assets/placeholder.jpg";

const useStyles = createUseStyles({
  card: {
    padding: 5,
    borderRadius: 5,
    height: CARD_SIZES.height,
    width: CARD_SIZES.width,
    border: "black 5px solid",
    position: "relative",
    transition: "all 0.4s linear",
    transformStyle: "preserve-3d",
    margin: "5px",
    "& div": {
      position: "absolute",
      backfaceVisibility: "hidden"
    }
  },
  selected: {
    borderColor: "blue",
    transform: "rotateY(180deg)"
  },
  front: {
    transform: "rotateY(180deg)"
  },
  matched: {
    borderColor: "green",
    backgroundColor: "white",
    transform: "rotateY(180deg)"
  },
  back: {
    transform: "rotateY(180deg)",
    top: "25%",
    left: "35%"
  }
});

const Card = ({ data, handleClick, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { id, url, status } = data;
  const classes = useStyles();
  const isSelected = status === CARD_STATUS.SELECTED;
  const isMatched = status === CARD_STATUS.MATCHED;

  const onCardClick = () => {
    if (status === CARD_STATUS.HIDDEN) {
      handleClick(index, id);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={classnames(classes.card, {
        [classes.selected]: isSelected,
        [classes.matched]: isMatched
      })}
      onClick={onCardClick}
    >
      <div className={classes.front}>
        <img src={url} alt="card" onLoad={handleImageLoad} />
      </div>
      <div className={classes.back}>{!isLoaded && "Loading"}</div>
    </div>
  );
};

// const images = [
//   // { id: 1, src: "../assets/resized/2C.jpg", title: 'foo', description: 'bar' }
//   { id: 1, src: "../assets/resized/2C.jpg", title: 'foo', description: 'bar' },
//   { id: 2, src: "../assets/resized/2D.jpg", title: 'foo', description: 'bar' },
//   { id: 3, src: "../assets/resized/2H.jpg", title: 'foo', description: 'bar' },
//   { id: 4, src: "../assets/resized/2S.jpg", title: 'foo', description: 'bar' },
//   { id: 5, src: "../assets/resized/3C.jpg", title: 'foo', description: 'bar' },
//   { id: 6, src: "../assets/resized/3D.jpg", title: 'foo', description: 'bar' },
//   { id: 7, src: "../assets/resized/3H.jpg", title: 'foo', description: 'bar' },
//   { id: 8, src: "../assets/resized/3S.jpg", title: 'foo', description: 'bar' },
//   { id: 9, src: "../assets/resized/4C.jpg", title: 'foo', description: 'bar' },
//   { id: 10, src: "../assets/resized/4DC.jpg", title: 'foo', description: 'bar' },
//   { id: 11, src: "../assets/resized/4HC.jpg", title: 'foo', description: 'bar' },
//   { id: 12, src: "../assets/resized/4SC.jpg", title: 'foo', description: 'bar' },
// ];

export default Card;
