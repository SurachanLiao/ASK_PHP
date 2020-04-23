import React, { Component } from 'react';

export class Room extends Component {

    render() {
        return (
<div>
    This is the room page. Your room number is {this.props.roomCode}
    <button onClick = {()=>this.props.doneWithRoom()} />
</div>
        )
    }
}

export default Room;