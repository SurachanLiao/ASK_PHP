import React, { Component } from 'react';
import firebase from 'firebase'
import './styles/App.css';
import pokerlogo from './images/poker_b.jpeg';
import decll from './images/dec-ll.png';
import declr from './images/dec-lr.png';
import dectr from './images/dec-tr.png';
import dectl from './images/dec-tl.png'
import { withStyles } from '@material-ui/core/styles';

const loginStyles = {
    width: "100%",
    maxWidth: "500px",
    margin: "20px auto",
    borderRadius: "5%",
    padding: "5%",
    background: "black",
    color: "black",
    boxshadow: "10px 10px gray",
    borderColor: "#0077B5",
  }
  const styles = theme => ({
    root: {
      flexGrow: 0.1,
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: "black",
    }
});

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:null,
            submit: false,
        }
    }
    login(){
      
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var password2 = document.getElementById("password2").value;
    
        if(password===password2){
          firebase.auth().createUserWithEmailAndPassword(email, password)       
         .then(function(user){
          user = firebase.auth().currentUser;
             this.setState({
                 user
             })
             .catch(() => {
                 console.log("invalid email")
             }
         );
         });
         alert("Account created successfully. Go back to login!");
         }
         else{
             alert("Please ensure both passwords match.")
         }

     }


 
   logout(){
     firebase.auth().signOut()
     .then(() => {
       this.setState({
         user:null
       });
     });
   }
    render(){
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
            <div style={loginStyles}> 
            <div style={{textAlign: "center"}} className="pt-callout pt-icon-info-sign">
            <img src={pokerlogo} alt="" style={{width:"80%", maxWidth:"500px", float:"center", margin:"5%"}} className="pt-callout pt-icon-info-sign"/>
        {/*sign up form to create a new account*/}
        <form>
            <input style={{color:"white", width: "98%" ,backgroundColor:"black"}} type="text" id= "email" name="email" placeholder="Enter Email" />
            <input style={{color:"white", width: "98%",backgroundColor:"black"}} type="password" id= "password" name="password" placeholder="Create Password" />
            <input style={{color:"white", width: "98%",backgroundColor:"black"}} type="password" id= "password2" name="password2" placeholder="Verify Password" />
            <button style={{width: "100%", borderColor:"black", marginTop: "2%"}} type="submit" className="btn btn-primary" bsStyle="" value="Log In" onClick={this.login} block> Create Account</button>
                
        </form>
        <div class="bottomleft"><img src={decll} alt="" style={{maxWidth:"150px"}}></img></div>
              <div class="bottomright"><img src={declr} alt="" style={{maxWidth:"150px"}}></img></div>
              <div class="topright"><img src={dectr} alt="" style={{maxWidth:"150px"}}></img></div>
              <div class="topleft"><img src={dectl} alt="" style={{ maxWidth:"150px"}}></img></div>
                <div className = "padding2"></div>
        </div>
        </div> 
        </div>
        )
    }
}
export default withStyles(styles)(SignUp);
