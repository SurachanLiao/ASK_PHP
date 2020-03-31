import React from 'react';

function Profile(props) {
    return (
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
          <h1> {props.player.name}, {props.player.level} </h1>
          <img alt="player-photo" className="photo" height={100} src={props.player.photo} />
          <h2>Current coin: {props.player.currentCoin}</h2>
          <h2>Highest coin: {props.player.highestCoin}</h2>
          <h2>Win/lost : {props.player.win}/{props.player.loss}</h2>
          <h2>Total game: {props.player.totalGame}</h2>
  
  
        </div>
      )
}

export default Profile;