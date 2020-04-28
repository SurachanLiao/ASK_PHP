import React, { Component } from 'react';
import './styles/App.css';
import {auth, provider, facebookProvider} from './firebase.js';
import SignUp from './SignUp'
import alternate from './images/alternate.png';
import ReactTooltip from 'react-tooltip'
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Google from './images/googlefront.jpg';
import pokerlogo from './images/poker_b.jpeg';
import decll from './images/dec-ll.png';
import declr from './images/dec-lr.png';
import dectr from './images/dec-tr.png';
import dectl from './images/dec-tl.png';
import {Routing} from './Routing'


// page styling
const loginStyles = {
  width: "100%",
  maxWidth: "470px",
  margin: "20px auto",
  padding: "0% 5% 5% 5%",
  background: "black",
  color: "black",
  boxshadow: "10px 10px gray",
  borderColor: "black",
}

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
    backgroundColor: 'black'
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null ,
      activeTab: '1',
      GroupCodeInp: null,
      GroupCode:null,
      submitGC: false,
      userInGroup: "admin",
      submitName:false,
      displayResult:false,
      rotationState: 0,
      value: 0,
      slideIndex: 0,
      allUsers:[],
      participatelogin:false,
      signup: false,
      user_no_google: null,
      google: false,
      user_profile_photo: null,
      username:null,
      email:null,
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
    this.setState({google:true})
    auth.signInWithRedirect(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      })

  }


  login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=> {
      user = firebase.auth().user;
      this.setState({
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
  componentDidMount() {
    let currentComponent = this
    var name, photo, email;
auth.onAuthStateChanged((user) => {
  if (user) {
    user.providerData.forEach(function (profile) {
      name= profile.displayName;
      email =  profile.email;
      photo= profile.photoURL;
    });
    currentComponent.setState({
      user,
      username: name,
    user_profile_photo: photo,
    email:email
  })
}})}

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

  if(!this.state.user && (this.state.submitGC===false)){
    if (this.state.signup === false){
      return (

        <div className={classes.root}>
          <AppBar position="static" background="black">
            <Tabs
              onChange={this.handleChange}
              // scrollable
              //scrollButtons="on"
              indicatorColor="white"
              textColor="white"
              value={this.state.slideIndex}
              centered
              boxShadow="none"
            >
              <Tab className="tab" label="Home" icon={<HomeIcon />} />
              <Tab className="tab"  label="Groups" icon={<GroupIcon />} />
  
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
          {/* rendering the first tab of the page with the admin  sign in user journey*/}
          {value === 0 && <TabContainer className="tab">
               {/*}
                {
                  this.state.user?
                  <button onClick={this.logout}>Log Out </button>
                  :
                  <button onClick={this.login}>Login In</button>
                }*/}
          <div style={loginStyles}> 
          <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
          <img src={pokerlogo} alt="" style={{width:"80%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
              
              {this.state.user ?
                <div>
                  <div className='user-profile'>
                    <img src={this.state.user.photoURL} alt={alternate} />
                  </div>
                </div>
                :
                <div className='text_input'>
                <h5>Log in or join now to get started!</h5>
                </div>
            }     
                <section className='add-item'>
                      <form onSubmit={this.handleSubmit}>
                      {/*this is where we need to modify to math current website
                        <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                        <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                        <button>Add Item</button>
                      */}
                      <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
                      <input style={{color:"white",width: "98%" , backgroundColor :'black'}} type="text" id= "email" name="email" placeholder="Email" />
                      <input style={{color:"white",width: "98%", backgroundColor :'black'}} type="password" id= "password" name="password" placeholder="Password" />
                      
                      <button style={{width: "100%", backgroundColor:"#primary", borderColor:"black"}} type="submit" className="btn btn-primary" value="Log In" onClick={this.login} block> Sign in </button>
                      <ReactTooltip id = "signup"/>
                      
                      <hr style={{marginTop: "10px", marginBottom: "10px"}} />
                      </div>
                </form>
                </section>
       <div class = "padding1"></div>  
                <section className='add-item'>
                      <form onSubmit={this.handleSubmit}>
                      <button style={{width: "100%", backgroundColor:"primary", color:"#primary", borderColor:"black", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={()=>this.setState({signup:true})} block> Join Now</button>
                      <div class = "padding1"></div>  
                     {this.state.user?
                    <button style={{width: "100%", backgroundColor:"primary", borderColor:"#black", marginTop: "2%"}} className="btn btn-primary" onClick = {this.logout}> Logout of Google</button>
                      :
                    <button style={{width: "100%", backgroundColor:"primary", textAlign:"center", color:"primary", borderColor:"black", marginTop: "2%"}} className="btn btn-primary" onClick={this.gmailLogin.bind(this)}> 
                    <img alt = "" src={Google} style={{width:"8%", float:"left", maxWidth:"25px"}} />
                     Join with Google</button>
                     }  
                     <div class = "padding1"></div>            
                      </form>
                </section>
              
            </div>
            </div>
            
          </TabContainer>}
          {/* rendering the second tab of the page with the group code user journey*/}
          {value === 1 && <TabContainer className="tab">
            <form onSubmit={this.handleSubmit}>
        <div style={loginStyles}>  
        <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
        <img src={pokerlogo} alt="" style={{width:"80%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
        <h5>Welcome to Poker!</h5>
        <p>Enter the shared group code to join the group</p>
        <input onChange={(e)=>this.handleChangeName(e)} style={{color:"white",width: "98%" , backgroundColor:'black'}} type="text" name="Name" placeholder="Your Name" />
        <input onChange={(e)=>this.handleChangeGC(e)} style={{color:"white", width: "98%", backgroundColor:'black'}} type="text" name="GroupCode" placeholder="Group Code" />
        {/* <button style={{width: "100%", backgroundColor:"primary", borderColor:"black"}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitGC(e)}  value="Log In" block> Join Group</button> */}
        <div class = "padding2"></div>
        </div>
        </div>
  
        </form>
          </TabContainer>}
  
              </SwipeableViews>
              <div class="bottomleft"><img src={decll} alt="" style={{maxWidth:"150px"}}></img></div>
              <div class="bottomright"><img src={declr} alt="" style={{maxWidth:"150px"}}></img></div>
              <div class="topright"><img src={dectr} alt="" style={{maxWidth:"150px"}}></img></div>
              <div class="topleft"><img src={dectl} alt="" style={{ maxWidth:"150px"}}></img></div>
      </div>
  
      )
    } else{
      return (<SignUp/>)
    }
    } 
    else {
      return (<Routing email={this.state.email} username ={this.state.username} 
        photoURL = {this.state.user_profile_photo} google={this.state.google}  
        userInGroup = {this.state.user} roomCode = {this.state.GroupCodeInp}/>)} 

    }

  
}

// applying the styling to the app page
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);