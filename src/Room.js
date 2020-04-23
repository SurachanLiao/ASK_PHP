import React, { Component } from 'react';
import firebase from './firebase.js';
import './styles/Home.css';
import decll from './images/dec-ll.png';
import declr from './images/dec-lr.png';
import dectr from './images/dec-tr.png';
import dectl from './images/dec-tl.png'
import poker_i from './images/poker_i.jpeg'

const styles = theme => ({
    root: {
      flexGrow: 0.1,
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: "black",
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    gridList: {
      width: 500,
      height: 450,
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    tab: {
      width:'100%',
    }
})
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
<div style={{ flexGrow: 0.1,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "black",}} >
        <div style={{color: "white", textAlign: "center"}}>
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
    <div class="bottomleft"><img src={decll} style={{maxWidth:"150px"}}></img></div>
            <div class="bottomright"><img src={declr} style={{maxWidth:"150px"}}></img></div>
            <div class="topright"><img src={dectr} style={{maxWidth:"150px"}}></img></div>
            <div class="topleft"><img src={dectl} style={{ maxWidth:"150px"}}></img></div> 
</div>
        )
    }
}

export default Room;