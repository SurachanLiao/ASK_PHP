import React, { Component } from 'react';
import firebase from './firebase.js';
import { functions } from 'firebase';

export class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
          users: []
        }

      }
    componentDidMount(){
        var currentComponent = this;
        var root = firebase.database();
        root.ref('/rooms').child(this.props.roomCode+'/users').on("value", function(snapshot){
            const users = snapshot.val()
            let newState = [];
            for (let user in users) {
            newState.push({
                name: user,
            });
            }
            console.log(newState)
            currentComponent.setState({
                users: newState
            })
        })
    }
    render() {
        return (
<div>
    This is the room page. Your room number is {this.props.roomCode}
    <button onClick = {()=>this.props.doneWithRoom()} />
    <ul>
    {this.state.users.map((user) => {
        return (
            <h3>{user.name}</h3>
        )
        })}
    </ul>
</div>
        )
    }
}

export default Room;