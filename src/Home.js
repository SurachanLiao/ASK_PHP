import React, { Component } from 'react';
import './styles/Home.css';
import {auth} from './firebase.js';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import pokerlogo from './images/poker_b.jpeg';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import razz from './images/cat_razz.png';
import holdem from './images/texas-holdem-icon.png';
import chineseP from './images/chinese-poker.jpg';
import stud from './images/seven-card-stud.jpg';
import decll from './images/dec-ll.png';
import declr from './images/dec-lr.png';
import dectr from './images/dec-tr.png';
import dectl from './images/dec-tl.png'
import poker_i from './images/poker_i.jpeg'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import Slider from '@material-ui/core/Slider';

// page styling
// theme styling
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

});

// data about the single player games
const tileData = [
  {
    img: holdem,
    title: 'texas-holdem',
    cols: 2,
    featured: true,
    info: 'one of the most popular variants of the card game of poker',
    id:1
  },
  {
    img: stud,
    title: 'seven card stud',
    info: '',
    id:2
  },
  {
    img: chineseP,
    title: 'chinese poker',
    info: '',
    id:3
  },
  {
    img: razz,
    title: 'razz',
    info: '',
    id:4
    },
];

// three tabs styling
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

// customize a dialogTitle component based on MuiDiagTitle and Typography
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}


const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



 export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1', // index to keep track of which tab is opened
      GroupCodeInp: null,  // the room code provided by the user
      value: 0,
      slideIndex: 0, // index to keep track of slide index in tabs
      renderGame:false, // if true, render the selected game
      renderGameId:0, // which game to render
      mobileMoreAnchorEl: null, // if true, display menu (profile and log out), otherwise null
      dialog:false, // if true, display dialog
      userProfil_aseet: 0, // user information: how many current asset does the user holds
      userProfil_highestCoin:0, // user information: how many asset has the user held the most
      userProfil_win:0, // user information: how many games has the user win
      userProfil_lost:0, // user information: how many games has the user lost
      userProfil_games:0, // user information: how many games has the user played
      invalideCode: false, // user joining room: if true, the code of the room is invalid
      duplicateName: false, // user joining room: if true, there has already existed someont with the same name in the room
      profile: false // if true, display user profile as a dialog
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitGC = this.handleSubmitGC.bind(this);
    this.logout = this.logout.bind(this);
  }

  // which tab(out of home, rooms, profile) to view
  handleChange = (event, value) => {
    this.setState({ value ,
      slideIndex: value,});
  };


  
  /* create a new room by setting a new directory in firebase database */
  createRoom() {
    let newCode = this.codeGenerator()  // generate random room code
    let currentComponent = this
    var root = firebase.database()
    var ref = root.ref('rooms/').child(newCode+'/users/'+this.props.username)
    const branch = {
      // each user in the room will have the following data
      assets: currentComponent.state.userProfil_aseet,
      highest_coin_history: currentComponent.state.userProfil_highestCoin,
      win: currentComponent.state.userProfil_win,
      lost: currentComponent.state.userProfil_lost,
      total_games: currentComponent.state.userProfil_games+1,
      profile: currentComponent.props.photoURL
    }
    ref.set(branch) // setting the directory in firebase
    currentComponent.props.setRoomCode(newCode); // update room code in router.js
    currentComponent.props.doneWithHomeToRoom();  // routes to room
  }

  // add the user to a room
  handleSubmitGC (){
    var currentComponent = this
    //check if the groupcode is valid
    var groupcodehere = document.getElementById("roomcode").value;
    var userHere = document.getElementById("name").value;
    if(!groupcodehere){
      // if the field of room code is empty, alert
      alert("invalid entry")
    }
    else{
      // while the room code is not empty, check if this group exists by checking the database
      var root = firebase.database();
      root.ref('rooms/').child(groupcodehere).once("value", function(snapshot){
        const output = snapshot.val()
        
      if (output != null){
        // this is an a valid groupcode
        var allUsers = output["users"]
        currentComponent.props.setRoomCode(groupcodehere);
        currentComponent.props.doneWithHomeToRoom();
        if (allUsers[userHere]){
          currentComponent.setState({
            duplicateName :true
          })
        } else {
          const ResultsRef = root.ref('rooms/').child(groupcodehere+'/users/'+userHere)
          const branch = {
            assets: currentComponent.state.userProfil_aseet,
            highest_coin_history: currentComponent.state.userProfil_highestCoin,
            win:currentComponent.state.userProfil_win,
            lost:currentComponent.state.userProfil_lost,
            total_games:currentComponent.state.userProfil_games+1,
            profile:currentComponent.props.photoURL
          }
          ResultsRef.set(branch)
        }
      }
      else{
        currentComponent.setState({
          invalideCode :true
        })
      }   
    })
  }
  if (currentComponent.state.invalideCode === false && currentComponent.state.duplicateName === false){
    currentComponent.props.setRoomCode(groupcodehere);
    currentComponent.props.doneWithHomeToRoom();
  } else if (currentComponent.state.invalideCode === true) {
    // TODO: now this two conditions are not possible to reach because checking the value of the boolean
    // inside firebase snapchot is not okay
    alert("oopsi this room doesn't exist yet")
  } else {
    alert("oopsi someone already has the same name in the room")
  }
    
  }

  //receives inputs from our inputs and updates the corresponding piece of state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //when signout method is called, we remove the user from our app's state
  logout(){
    console.log("logging out")
    auth.signOut()
    .then(() => {
      this.setState({
        user:null
      });
    });
    document.location.reload();
  }



  // display the selected game information using alert
  // TODO: display the information using a dialog
  displayInfo(tile) {
    alert(tile.info)
  }

  // this is called after the user selects a game to play, therefore, append 1 to the number of games user has played
  // and update firebase database
  updateUserProfile(){
    let currentComponent = this
    var curuser = 
    {displayName: this.props.username,
      photoURL: this.props.photoURL
    }
    var root = firebase.database();
        const ResultsRef = root.ref('users/').child(curuser.displayName)
            const branch = {
              name: curuser.displayName,
              profile: curuser.photoURL,
              assets: currentComponent.state.userProfil_aseet,
              highest_coin_history: currentComponent.state.userProfil_highestCoin,
              win:currentComponent.state.userProfil_win,
              lost:currentComponent.state.userProfil_lost,
              total_games:currentComponent.state.userProfil_games+1
            }
            ResultsRef.set(branch)
            console.log(this.state.userProfil_games)
            currentComponent.props.setUserGames(currentComponent.state.userProfil_games)
            currentComponent.props.setUserLost(currentComponent.state.userProfil_lost)
            currentComponent.props.setUserWin(currentComponent.state.userProfil_win)
            currentComponent.props.setUserHighestCoins(currentComponent.state.userProfil_highestCoin)
            currentComponent.props.setUserCurrentCoins(currentComponent.state.userProfil_aseet)
      }

  // this is called right after user authentication is passed. We obtain the user information from firebase database
  getUserProfile(curuser){
     let currentComponent = this
    var root = firebase.database();
    root.ref("/users").child(curuser.displayName).once("value", function(snapshot){
      const data = snapshot.val() 

      if (data != null){
        // this is an old user, retrieve data from database
        const data = snapshot.val()
        currentComponent.setState({
          userProfil_aseet: data.assets,
          userProfil_highestCoin: data.highest_coin_history,
          userProfil_win: data.win,
          userProfil_lost: data.lost,
          userProfil_games: data.total_games
        })
      } else {
        // this is a newly joined user, assign new data to the user and update database
        const ResultsRef = root.ref('users/').child(curuser.displayName)
            const branch = {
              name: curuser.displayName,
              profile: curuser.photoURL,
              assets: 500,
              highest_coin_history: 500,
              win:0,
              lost:0,
              total_games:0
            }
            ResultsRef.set(branch)
            currentComponent.setState({
              userProfil_aseet: 500,
              userProfil_highestCoin: 500,
              userProfil_win: 0,
              userProfil_lost: 0,
              userProfil_games: 0
            })
      }
      // send this information back to router so other components can share this information
      currentComponent.props.setUserGames(currentComponent.state.userProfil_games)
      currentComponent.props.setUserLost(currentComponent.state.userProfil_lost)
      currentComponent.props.setUserWin(currentComponent.state.userProfil_win)
      currentComponent.props.setUserHighestCoins(currentComponent.state.userProfil_highestCoin)
      currentComponent.props.setUserCurrentCoins(currentComponent.state.userProfil_aseet)
    })
  }

  
  componentDidMount() {
    var curuser = 
    {displayName: this.props.username,
      photoURL: this.props.photoURL
    }

    let currentComponent = this
    auth.onAuthStateChanged((user) => {
      if (user) {
        currentComponent.setState({ user });
      } 
    });
    // if logging in not using google, will not have username
    if(this.props.username){
       curuser = 
      {displayName: this.props.username,
        photoURL: this.props.photoURL
      }     
    }else{
      // thus, use the email address and set profile to null
       curuser = 
      {displayName: this.props.email,
        photoURL: null
      }  
    }
  currentComponent.getUserProfile(curuser)
    
  }    

  /* Generate groupcode of length 10, an identifying id used by 
  different players to log into the same room*/
  codeGenerator(){
    var s = "";
    // randomly generate a string of length 5
    for (var i=0; i<=5; i++) {
    s  += Math.round(Math.random()*10);
    } 
    // check firebase database to see if the code already exists
    var root = firebase.database();
    root.ref("/").once("value", function(snapshot){
      if (snapshot.hasChild(s)){
        // if it's duplicated, modify the code
        s += Math.round(Math.random()*10);
      }
    })  
    return s
    }

    // this method first update the user information by adding 1 to the number of games played,
    // and then route to game
    doneWithHome(){

      this.updateUserProfile()
      this.props.doneWithHomeToGame()
    }

  
  render() {
    
    const { classes } = this.props;
    const { value , mobileMoreAnchorEl} = this.state;
    const appBar = (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Avatar src={poker_i}  className={classes.big}/>
          <Tabs className = {classes.title}
              onChange={this.handleChange}
              // scrollable
              //scrollButtons="on"
              indicatorColor="white"
              textColor="white"
              value={this.state.slideIndex}
              centered = 'true'
              boxShadow="none"
            >
          <Tab centered className="tab" label="Home" icon={<HomeIcon />} />
          <Tab centered className="tab"  label="Room" icon={<GroupIcon />} />
          <Tab className="tab"  label="Profile" icon={<PersonIcon />} />

          </Tabs>
          <Avatar src={this.state.profile} alt = {this.state.username} 
          className={classes.big}  onClick={(e)=>this.setState({mobileMoreAnchorEl: e.currentTarget})}/>

          {/* this menu is shown on when mobileMoreAnchorEl is true */}
          <Menu
          id="lock menu" anchorEl = {mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted
          open = {Boolean(mobileMoreAnchorEl)}  onClose={()=>this.setState({mobileMoreAnchorEl: null})}>
          {/* display the profile menu item */}
          <MenuItem onClick={()=>this.setState({profile:true})}> 
            <IconButton >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          {/* display the log out menu item */}
          <MenuItem onClick = {()=>this.logout()}> 
            <IconButton >
              <ExitToAppIcon />
            </IconButton>
            <p>Log Out</p>
          </MenuItem>
          </Menu>
        </Toolbar>
        <Dialog  onClose={()=>this.setState({profile:false })} aria-labelledby="customized-dialog-title" open={this.state.profile }>
          <DialogTitle style={{color: 'white', backgroundColor: '#333399'}} id="customized-dialog-title" onClose={()=>this.setState({dialog:false })}>
            {this.props.username}
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            assets: {this.state.userProfil_aseet}
          </DialogContentText>
          <DialogContentText>
            number of games played: {this.state.userProfil_games}
          </DialogContentText>
          <DialogContentText>
            win / lose: {this.state.userProfil_win} / {this.state.userProfil_lost}
          </DialogContentText>
          <DialogContentText>
            most assets in the history: {this.state.userProfil_highestCoin}
          </DialogContentText>
        </DialogContent>     
      </Dialog>

    </AppBar>
    )
      // information about the game displayed as grids
    const gridlist = (
      <GridList 
        spacing = {20} className={classes.gridList} backgroundColor = "black" cols={4} >
        
          {tileData.map((tile) => (
            <GridListTile key={tile.img} >
              <img src={tile.img} alt={tile.title} onClick={()=>this.setState({dialog:true, renderGameId: tile.id})} />
              <GridListTileBar onClick={()=>this.displayInfo(tile)}
                title={tile.title}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
    )
      return (
            <div style={{ flexGrow: 0.1,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: "black",}} >


             {appBar}
                  


          <SwipeableViews 
           backgroundColor = "black"
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
          {/* rendering the first tab of the page with the admin  sign in user journey */}
          {value === 0 && <TabContainer width='100%' className="tab" backgroundColor = "black">
          <div style={{textAlign: "center" , backgroundColor :"black"}} className="pt-callout pt-icon-info-sign">
          <img src={pokerlogo} alt="" style={{width:"100%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
              

            {gridlist}

        <Dialog onClose={()=>this.setState({dialog:false})} aria-labelledby="customized-dialog-title" open={this.state.dialog}>
        <DialogTitle style = {{color: 'white', backgroundColor:'#333399'}}id="customized-dialog-title" onClose={()=>this.setState({dialog:false})}>
          How much do you want to start with?
        </DialogTitle>
                

          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" width='80%' defaultValue={20} 
          color = "primary" max = {100} min = {0}/>


        <DialogActions>
          <Button autoFocus onClick={()=>this.doneWithHome()} color="primary">
            Start the game
          </Button>
        </DialogActions>
      </Dialog>
        
             <br />
                <section className='add-item'>
                      <form onSubmit={this.handleSubmit}>
                      
                </form>
                </section>
      
                <section className='add-item'>
  
                </section>
            </div>
            <div class="padding1">

</div>
          </TabContainer>}
         {/* rendering the second tab of the page with the group code user journey */}
          {value === 1 && <TabContainer backgroundColor = 'black'>
            <form onSubmit={this.handleSubmit}>
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={pokerlogo} alt="" style={{width:"80%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
        <br />
        <button style={{width: "100%",  borderColor:'black'}} type="submit" className="btn btn-primary" onClick={()=>this.createRoom()}  value="Log In" block> Create a Room</button>
        <br />
        <h3>Enter the shared room code to join the room</h3>
        <br />
        <input style={{color:"white", width: "98%",backgroundColor:"black"}} type="text" id= "name" name="name" placeholder="nick name in room" />
         <input style={{color:"white", width: "98%",backgroundColor:"black"}} type="text" id= "roomcode" name="roomcode" placeholder="room code" />
  
        <br />
        <button style={{width: "100%",  borderColor:'black'}} type="submit" className="btn btn-primary" onClick={()=>this.handleSubmitGC()}  value="Log In" block> Join Room!!</button>
        </div>
              <div class="padding">

              </div>
        </form>
          </TabContainer>}
          {/* rendering the third tab of the page */}
          {/* profile tab: displaying user's info: username, level, photo, current&highest coin, win/loss/total game */}
          {value === 2 && <TabContainer className="tab" backgroundColor = 'black'>
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <br />
        <div style={{color: "white"}}>
        <h2> {this.state.username} </h2>
          <img  alt="" style={{width:"25%", maxWidth:"200px", float:"center", margin:"5%"}} className="photo" src={this.state.user.photoURL} />
              <h3>Current coin: {this.state.userProfil_aseet}</h3>
              <h3>Highest coin: {this.state.userProfil_highestCoin}</h3>
          <h3>Win/lost : {this.state.userProfil_win} / {this.state.userProfil_lost}</h3>
          <h3>Total game: {this.state.userProfil_games}</h3>
        </div>
        <br />
        {/* we can create a database for user in firebase with required properties then retrive and show them here {console.log(this.state.user)} */}
        </div>
              <div class="padding">

              </div>
              <div class="padding">

            </div>
          </TabContainer>}

              </SwipeableViews>
              
      
    
      <div class="bottomleft"><img src={decll} alt="" style={{maxWidth:"150px"}}></img></div>
            <div class="bottomright"><img src={declr} alt="" style={{maxWidth:"150px"}}></img></div>
            <div class="topright"><img src={dectr} alt="" style={{maxWidth:"150px"}}></img></div>
            <div class="topleft"><img src={dectl} alt="" style={{ maxWidth:"150px"}}></img></div> 
            </div>
            
      )
    } 
} 


  

// applying the styling to the app page
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);