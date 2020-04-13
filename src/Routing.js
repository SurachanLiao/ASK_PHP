import React, {Component } from 'react';
import Home from './Home';
import MainPoker from './MainPoker'

export class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home: false,
            game: false,
            loggout: false
        }
    }

doneWithHome() {
    this.setState({
        home: true
    })
}
doneWithGame() {
    this.setState({
        game: true,
        home: false,
    })
}

render() {
    let currentComponent = this
    if(!this.state.home) {
        return (<Home doneWithHome = {this.doneWithHome.bind(this)} google={this.props.google} username = {this.props.username} email = {this.props.email} photoURL = {this.props.photoURL}/>)
    }
    else if(this.state.game === false) {
        return (<MainPoker doneWithGame = {this.doneWithGame.bind(this)} username = {this.props.username} photoURL = {this.props.photoURL}/> )
    }
}

}

export default Routing;