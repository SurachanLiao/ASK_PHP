import React, { Component } from 'react';
import './styles/Home.css';
import {auth, provider, facebookProvider} from './firebase.js';
import MainPoker from './MainPoker.jsx';
import alternate from './images/alternate.png';
import ReactTooltip from 'react-tooltip'
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { withStyles, StylesProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import TimeIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Google from './images/googlefront.jpg';
import pokerlogo from './images/poker_b.jpeg';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import razz from './images/cat_razz.png';
import holdem from './images/texas-holdem-icon.png';
import chineseP from './images/chinese-poker.jpg';
import stud from './images/seven-card-stud.jpg';
import decll from './images/dec-ll.png';
import declr from './images/dec-lr.png';
import dectr from './images/dec-tr.png';
import dectl from './images/dec-tl.png'
import profile from './Profile'

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

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
});



class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: null ,
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
      renderGame:0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gmailLogin = this.gmailLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.fblogin = this.fblogin.bind(this);
    this.login = this.login.bind(this);
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

  gmailLogin() {
    auth.signInWithRedirect(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }


  login(){
    const thisUser = this
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=> {
      user = firebase.auth().user;
      thisUser.setState({
        user
      })
    })
    .catch((error) => {
      alert("Incorrect email or login.")
    });
  }


  fblogin(){
    auth.signInWithRedirect(facebookProvider)
    .then((result)=> {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  //event listener for our form
  handleSubmit(e) {
    //prevents the page from refreshing
    e.preventDefault();
      this.setState({
      username: ''
    });
  }
  displayInfo(tile) {
    alert(tile.info)
  }


  
  componentDidMount() {
    let currentComponent = this
    auth.onAuthStateChanged((user) => {
      if (user) {
        currentComponent.setState({ user });
      } 
    });
    
  }    

  codeGenerator(){
    var s = "";
    //var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i=0; i<=5; i++) {
    s  += Math.round(Math.random()*10);
    }
    var root = firebase.database();
    root.ref("/").once("value", function(snapshot){
      if (snapshot.hasChild(s)){
        s += Math.round(Math.random()*10);
      }
    })
    return s
    }


  
  render() {
    
    const { classes } = this.props;
    const { value } = this.state;

    if(this.state.renderGame === 0){
      return (


        <div>
             <div className={classes.root}>
             {this.state.user ?
                  <AppBar position="static">
                  <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" className={classes.title}   >
                    Welcome, {this.state.user.displayName}
                    </Typography>
                    <Tabs
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
                        <Tab className="tab"  label="Profile" icon={<TimeIcon />} />
  
                    </Tabs>
                    <Avatar src={this.state.user.photoURL} alt = {this.state.user.displayName} className={classes.big}/>
                  </Toolbar>

                </AppBar>
                :
                <div className='text_input'>
                <h5>Welcome, {this.username}!</h5>
                </div>
            }     

          <SwipeableViews 
           backgroundColor = "black"
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >

          {/* rendering the first tab of the page with the admin sign in user journey*/}
          {value === 0 && <TabContainer className="tab" backgroundColor = "black">
          <div style={{textAlign: "center" , backgroundColor :"black"}} className="pt-callout pt-icon-info-sign">
          <img src={pokerlogo} style={{width:"80%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
              

            <GridList align="center"
            cellHeight={180} className={classes.gridList} backgroundColor = "black">
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          </GridListTile>
          {tileData.map((tile) => (
            <GridListTile key={tile.img} >
              <img src={tile.img} alt={tile.title} onClick={()=>this.setState({renderGame:tile.id} )}/>
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
          {/* rendering the second tab of the page with the group code user journey*/}
          {value === 1 && <TabContainer className="tab" backgroundColor = 'black'>
            <form onSubmit={this.handleSubmit}>
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={pokerlogo} style={{width:"80%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
        <br />
        <h3 style={{color: "white"}}>Enter the shared group code to join the group</h3>
        <br />
        
        <input onChange={(e)=>this.handleChangeGC(e)} style={{width: "98%", backgroundColor : "black"}} type="text" name="GroupCode" placeholder="Group Code" />
  
        <br />
        <button style={{width: "100%",  borderColor:'black'}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitGC(e)}  value="Log In" block> Join Group</button>
        </div>
              <div class="padding">

              </div>
        </form>
          </TabContainer>}

          {/* rendering the third tab of the page with the group code user journey*/}
          {value === 2 && <TabContainer className="tab" backgroundColor = 'black'>
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <br />
        <div style={{color: "white"}}>
        <h2> {this.username}, 25 </h2>
          <img alt="player-photo" style={{width:"25%", maxWidth:"200px", float:"center", margin:"5%"}} className="photo" src={alternate} />
          <h3>Current coin: 500</h3>
          <h3>Highest coin: 1000</h3>
          <h3>Win/lost : 100/50</h3>
          <h3>Total game: 150</h3>
        </div>
        <br />
        
        </div>
              <div class="padding">

              </div>
          </TabContainer>}
  
              </SwipeableViews>
              
      </div>
      <div class="bottomleft"><img src={decll} style={{maxWidth:"150px"}}></img></div>
            <div class="bottomright"><img src={declr} style={{maxWidth:"150px"}}></img></div>
            <div class="topright"><img src={dectr} style={{maxWidth:"150px"}}></img></div>
            <div class="topleft"><img src={dectl} style={{ maxWidth:"150px"}}></img></div>
      </div>
      )
    } else if (this.state.renderGame === 1){
      return (<MainPoker userProfile = {this.state.user.photoURL} userName = {this.state.user.displayName}/>)
    }
    
} 


  
}

// applying the styling to the app page
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);