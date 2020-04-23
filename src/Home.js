import React, { Component } from 'react';
import './styles/Home.css';
import {auth, provider, facebookProvider} from './firebase.js';
import MainPoker from './MainPoker.jsx';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { withStyles, StylesProvider } from '@material-ui/core/styles';
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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import Slider from '@material-ui/core/Slider';

// page styling

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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

});



 export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //user: this.props.user ,
      //user_no_google: this.props.user_no_google,
      //googe: this.props.google,
      activeTab: '1',
      GroupCodeInp: null,
      GroupCode:null,
      submitGC: false,
      userInGroup: null,
      submitName:false,
      displayResult:false,
      rotationState: 0,
      value: 0,
      slideIndex: 0,
      allUsers:[],
      participatelogin:false,
      renderGame:false,
      renderGameId:0,
      mobileMoreAnchorEl: null,
      dialog:false,
      userProfil_aseet: 0,
      userProfil_highestCoin:0,
      userProfil_win:0,
      userProfil_lost:0,
      userProfil_games:0,
      //user_profile_photo: this.props.photoURL
      updateFB: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value ,
      slideIndex: value,});
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  
  handleChangeGC (e){
    this.setState({
      GroupCodeInp: e.target.value
    })
  }
  handleChangeName(e){
    this.setState({
      userInGroup: e.target.value
    })
  }
  createRoom(e) {
    let newCode = this.codeGenerator()
    let currentComponent = this
    var root = firebase.database()
    var ref = root.ref('rooms/').child(newCode+'/users/'+this.props.username)
    const branch = {
      assets: currentComponent.state.userProfil_aseet,
      highest_coin_history: currentComponent.state.userProfil_highestCoin,
      win:currentComponent.state.userProfil_win,
      lost:currentComponent.state.userProfil_lost,
      total_games:currentComponent.state.userProfil_games+1
    }
    ref.set(branch)
    currentComponent.props.setRoomCode(newCode);
   currentComponent.props.doneWithHomeToRoom();
  }
  handleSubmitGC (e){
    var currentComponent = this
    //check if the groupcode is valid
    var ref = firebase.database().ref()
    var groupcodehere = currentComponent.state.GroupCodeInp
    var userHere = currentComponent.state.userInGroup
    if(!groupcodehere){
      alert("invalid entry")}
      else if(this.state.participatelogin===false && userHere==="admin"){
        alert("invalid entry")
      }
    else{
    console.log("groupcode hereh is ", groupcodehere)
    console.log("users here is", userHere)
    ref.once("value",function(snapshot){
      console.log("checking child", snapshot.val())
      if (snapshot.hasChild(groupcodehere)){
        console.log("groupcode hereh is ", groupcodehere)
        var output=snapshot.val()
        console.log("output are ",output)
        var userss = output[groupcodehere]["users"]
        var allusers = []
        for(var k in userss) allusers.push(k)
        console.log("allusers are",allusers)
        currentComponent.setState({allUsers:allusers})

        currentComponent.setState({
          submitGC: true
        })
        if(userss[userHere]){
          console.log("has same name",userHere)
          alert("someone in the group already has this name, please enter another name");
          e.preventDefault();
          document.location.reload();
        }
      }
      else{
        alert("this group doesn't exist yet")
        e.preventDefault();
        document.location.reload();
      }
    })}
  }

  handleSubmitName(e){
    console.log("new user added")
    this.setState({
      submitName: e.target.value,
      participatelogin:true
    })
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

  /*
  -signInWithPopup will trigger a popup gmail login option to sign in with a Google account
  */




  displayInfo(tile) {
    alert(tile.info)
  }


  updateUserProfile(){
    let currentComponent = this
    var curuser = 
    {displayName: this.props.username,
      photoURL: this.props.photoURL
    }
    console.log("hahaha")
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
      }


  getUserProfile(curuser){
     let currentComponent = this
    var root = firebase.database();
    root.ref("/users").child(curuser.displayName).once("value", function(snapshot){
      const data = snapshot.val() 

      if (data != null){
        // this is an old user
        const data = snapshot.val()
        currentComponent.setState({
          userProfil_aseet: data.assets,
          userProfil_highestCoin: data.highest_coin_history,
          userProfil_win: data.win,
          userProfil_lost: data.lost,
          userProfil_games: data.total_games
        })
      } else {
        // this is a newly joined user
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

    if(this.props.username){
      console.log("has user name")
      var curuser = 
      {displayName: this.props.username,
        photoURL: this.props.photoURL
      }     
    }else{
      console.log("has no user name")
      var curuser = 
      {displayName: this.props.email,
        photoURL: null
      }  
    }
    currentComponent.getUserProfile(curuser)
    
    
    
    

 
    
  currentComponent.setState({
    username: curuser.displayName,
    profile: curuser.photoURL
  })


    
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
                      {/* <MenuIcon /> */}
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
                        <Tab centered className="tab"  label="Groups" icon={<GroupIcon />} />
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
  <MenuItem onclick={()=>this.setState({value:2})}> 
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

</AppBar>
    )

    const gridlist = (
      <GridList 
            // cellHeight={180} 
            spacing = {20} className={classes.gridList} backgroundColor = "black" cols={2.5} >
        
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
          <img src={pokerlogo} style={{width:"100%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
              

            {gridlist}

        <Dialog onClose={()=>this.setState({dialog:false})} aria-labelledby="customized-dialog-title" open={this.state.dialog}>
        <DialogTitle id="customized-dialog-title" onClose={()=>this.setState({dialog:false})}>
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
          {value === 1 && <TabContainer className="tab" backgroundColor = 'black'>
            <form onSubmit={this.handleSubmit}>
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={pokerlogo} style={{width:"80%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
        <br />
        <button style={{width: "100%",  borderColor:'black'}} type="submit" className="btn btn-primary" onClick={()=>this.createRoom()}  value="Log In" block> Create a Room</button>
        <br />
        <h3>Enter the shared room code to join the room</h3>
        <br />
        
        <input onChange={(e)=>this.handleChangeGC(e)} style={{width: "98%", backgroundColor : "black"}} type="text" name="GroupCode" placeholder="Room Code" />
  
        <br />
        <button style={{width: "100%",  borderColor:'black'}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitGC(e)}  value="Log In" block> Join Room</button>
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
          <img alt="player-photo" style={{width:"25%", maxWidth:"200px", float:"center", margin:"5%"}} className="photo" src={this.state.user.photoURL} />
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
              
      
    
      <div class="bottomleft"><img src={decll} style={{maxWidth:"150px"}}></img></div>
            <div class="bottomright"><img src={declr} style={{maxWidth:"150px"}}></img></div>
            <div class="topright"><img src={dectr} style={{maxWidth:"150px"}}></img></div>
            <div class="topleft"><img src={dectl} style={{ maxWidth:"150px"}}></img></div> 
            </div>
            
      )
    } 
} 


  

// applying the styling to the app page
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);