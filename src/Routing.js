import React, {Component } from 'react';
import Home from './Home';
import MainPoker from './MainPoker';
import Room from './Room'

export class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home: false,
            game: false,
            loggout: false,
            room: false,
            roomCode: 0,
            user_highestCoin: 0,
            user_currentCoin: 0,
            user_win: 0,
            user_lost:0,
            user_games: 0
        }
    }

doneWithHomeToGame() {
    this.setState({
        home: true,
        game: false,
        room: true,
    })
}

doneWithHomeToRoom() {
    this.setState({
        home: true,
        game: true,
        room: false,
    })
}
doneWithRoomToGame() {
    this.setState({
        room: true,
        home: true,
        game: false,
    })
}
doneWithRoomToHome() {
    this.setState({
        room: true,
        home: false,
        game: true,
    })
}
doneWithGame() {
    this.setState({
        game: true,
        home: false,
        room: true
    })
}
setUserGames(s) {
    this.setState({
        user_games: s
    })
}
setUserHighestCoins(s) {
    this.setState({
        user_highestCoin: s
    })
}
setUserCurrentCoins(s) {
    this.setState({
        user_currentCoin: s
    })
}
setUserWin(s) {
    this.setState({
        user_win: s
    })
}
setUserLost(s) {
    this.setState({
        user_lost: s
    })
}
setRoomCode(s) {
    this.setState({
        roomCode: s
    })
}
// routing based on states
render() {
    if(!this.state.home) {
        // render the home component with properties
        return (<Home doneWithHomeToGame = {this.doneWithHomeToGame.bind(this)}  setRoomCode = {this.setRoomCode.bind(this)}
        doneWithHomeToRoom={this.doneWithHomeToRoom.bind(this)}    google={this.props.google} username = {this.props.username} 
        email = {this.props.email} photoURL = {this.props.photoURL} roomCode = {this.props.roomCode}
        setUserGames = {this.setUserGames.bind(this)} setUserCurrentCoins = {this.setUserCurrentCoins.bind(this)}
        setUserLost = {this.setUserLost.bind(this)} setUserWin = {this.setUserWin.bind(this)}
        setUserHighestCoins = {this.setUserHighestCoins.bind(this)}
        />)
    }
    else if(this.state.game === false) {
        // render the game component with properties
        return (<MainPoker doneWithGame = {this.doneWithGame.bind(this)} username = {this.props.username} photoURL = {this.props.photoURL} user_lost = {this.state.user_lost} user_win = {this.state.user_win}
        user_currentCoin = {this.state.user_currentCoin} user_highestCoin = {this.state.user_highestCoin}
        user_games = {this.state.user_games}/> )
    }
else if (!this.state.room) {
    return (< Room doneWithRoomToHome = {this.doneWithRoomToHome.bind(this)} doneWithRoomToGame = {this.doneWithRoomToGame.bind(this)} username = {this.props.username} 
    roomCode = {this.state.roomCode} user_lost = {this.state.user_lost} user_win = {this.state.user_win}
    user_currentCoin = {this.state.user_currentCoin} user_highestCoin = {this.state.user_highestCoin}
    user_games = {this.state.user_games} />)
}
}
}

export default Routing;