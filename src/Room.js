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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { purple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Menubar from './Appbar.js';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    gridList: {
      width: 800,
      height: 450,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography color="white" variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});
export class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            profile: this.props.photoURL,
          users: [],
          dialog: false,
          curUser: 0,
        }

      }
    componentDidMount(){

      // listen to the change in firebase database, if new user join, add new user to the state of users
        var currentComponent = this;
        var root = firebase.database();
        root.ref('/rooms').child(this.props.roomCode+'/users').on("value", function(snapshot){
            const users = snapshot.val()
            let newState = [];
            let cid = 0
            for (let user in users) {
              // for each user, keep track of the user's id, name, profile, win and lost ratio, and how many
              // games played in the past
            newState.push({
                id: cid, // used to index user
                name: user,
                profile: users[user].profile, 
                win: users[user].win,
                highestcoin: users[user].highest_coin_history,
                lost: users[user].lost,
                total: users[user].total_games,
            });
            cid += 1
            }
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
          <div class="bottomleft"><img src={decll} alt="" style={{maxWidth:"150px"}}></img></div>
            <div class="bottomright"><img src={declr} alt="" style={{maxWidth:"150px"}}></img></div>
            <div class="topright"><img src={dectr} alt="" style={{maxWidth:"150px"}}></img></div>
            <div class="topleft"><img src={dectl} alt="" style={{ maxWidth:"150px"}}></img></div> 
      <div styles={{      
        position: 'absolute',

      width:"50%",
      maxWidth:"100px",  
      centering: true}}>
        <Menubar toHome = {true} doneWithRoomToHome = {this.props.doneWithRoomToHome.bind(this)} 
        user_lost = {this.props.user_lost} user_win = {this.props.user_win}
        user_currentCoin = {this.props.user_currentCoin} user_highestCoin = {this.props.user_highestCoin}
        user_games = {this.props.user_games}/>
      <img src={logoloading} alt="poker" style = {{      
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
    <ColorButton onClick = {()=>this.props.doneWithRoomToGame()}
        variant="contained"
        color= '#9900ff'
        className={classes.button}
        endIcon={<SendIcon/>}
      >
        Start
      </ColorButton>
  
    </div>
      
    <ul className = {classes.root}>
      {/* display all the users in the room */}
      <GridList
      spacing = {20} className={classes.gridList} backgroundColor = "black" cols={4} >
   {this.state.users.map((user) => (
     <div>
      <GridListTile key={user.profile}>
      <img src={user.profile} alt={user.name} />
      <GridListTileBar onClick={()=>this.setState({dialog: true, curUser: user.id})}
        title={user.name}
        actionIcon={
          <IconButton aria-label={`info about ${user.name}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
    {/* this dialog is opened when user icon is clicked, and it display the user's information */}
    <Dialog  onClose={()=>this.setState({dialog:false })} aria-labelledby="customized-dialog-title" open={this.state.dialog && this.state.curUser === user.id}>

      <DialogTitle style={{color: 'white', backgroundColor: purple[500]}} id="customized-dialog-title" onClose={()=>this.setState({dialog:false })}>
        {user.name}
      </DialogTitle>
      <DialogContent>
          <DialogContentText>
            current id: {user.id} 
            </DialogContentText>
            <DialogContentText>
            number of games played: {user.total}
            </DialogContentText>
            <DialogContentText>
            win / lose: {user.win} / {user.lost}
          </DialogContentText>
        </DialogContent>     
    </Dialog>
          </div>
          )
        )}
  </GridList>
    </ul>
</div>
        )
    }
}
Room.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);