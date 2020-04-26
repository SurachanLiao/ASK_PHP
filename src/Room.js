import React, { Component } from 'react';
import firebase from './firebase.js';
import './styles/Home.css';
import decll from './images/dec-ll.png';
import declr from './images/dec-lr.png';
import dectr from './images/dec-tr.png';
import dectl from './images/dec-tl.png'
import logoloading from './images/logoloading.gif';
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { purple } from '@material-ui/core/colors';
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
      width: 800,
      height: 450,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      // transform: 'translateZ(0)',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    tab: {
      width:'100%',
    },
    button: {
      margin: theme.spacing(1),
    },
})
export class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            profile: this.props.photoURL,
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
                profile: users[user].profile
            });
            }
            console.log(newState)
            currentComponent.setState({
                users: newState
            })
        })
    }
    render() {
      
      const { classes } = this.props;
      const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: purple[500],
          '&:hover': {
            backgroundColor: purple[700],
          },
        },
      }))(Button);
        return (
<div style={{ flexGrow: 0.1,
    width: '100%',
   
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "black",}} >
      <div styles={{      
        position: 'absolute',

      width:"50%",
      maxWidth:"100px",  
      centering: true}}>

      <img src={logoloading} style = {{      
      position: 'relative',
        display: 'block',
        marginleft: 'auto',
        marginright: 'auto',
      maxWidth: '500px',
      centering: true}}
      class="center"/>

      </div>

        <div style={{color: "white", textAlign: "center"}}>
    Your room number is {this.props.roomCode}
    </div>
    <div style={{color: "white", textAlign: "center"}}>
    <ColorButton onClick = {()=>this.props.doneWithRoom()}
        variant="contained"
        color= '#9900ff'
        className={classes.button}
        endIcon={<SendIcon/>}
      >
        Start
      </ColorButton>
  
    </div>
      
    <ul className = {classes.root}>
    {/* {this.state.users.map((user) => {
        return ( */}

      <GridList
      spacing = {20} className={classes.gridList} backgroundColor = "black" cols={4} >
   {this.state.users.map((user) => (
      <GridListTile key={user.profile}>
      <img src={user.profile} alt={user.name} />
      <GridListTileBar
        title={user.name}
        actionIcon={
          <IconButton aria-label={`info about ${user.name}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
          )
        )}
  </GridList>
    </ul>
    <div class="bottomleft"><img src={decll} style={{maxWidth:"150px"}}></img></div>
            <div class="bottomright"><img src={declr} style={{maxWidth:"150px"}}></img></div>
            <div class="topright"><img src={dectr} style={{maxWidth:"150px"}}></img></div>
            <div class="topleft"><img src={dectl} style={{ maxWidth:"150px"}}></img></div> 
</div>
        )
    }
}
Room.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);