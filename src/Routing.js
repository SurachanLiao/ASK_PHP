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
            roomCode: 0
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
setRoomCode(s) {
    this.setState({
        roomCode: s
    })
}
doneWithRoom() {
    this.setState({
        room: true,
        home: true,
        game: false,
    })
}
doneWithGame() {
    this.setState({
        game: true,
        home: false,
        room: true
    })
}

// routing based on states
render() {
    if(!this.state.home) {
        // render the home component with properties
        return (<Home doneWithHomeToGame = {this.doneWithHomeToGame.bind(this)}  setRoomCode = {this.setRoomCode.bind(this)}
        doneWithHomeToRoom={this.doneWithHomeToRoom.bind(this)}    google={this.props.google} username = {this.props.username} 
        email = {this.props.email} photoURL = {this.props.photoURL} roomCode = {this.props.roomCode}/>)
    }
    else if(this.state.game === false) {
        // render the game component with properties
        return (<MainPoker doneWithGame = {this.doneWithGame.bind(this)} username = {this.props.username} photoURL = {this.props.photoURL}/> )
    }
else if (!this.state.room) {
    return (< Room doneWithRoom = {this.doneWithRoom.bind(this)} username = {this.props.username} roomCode = {this.state.roomCode}/>)
}
}
}

export default Routing;