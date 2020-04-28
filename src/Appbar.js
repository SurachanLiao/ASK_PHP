import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {auth} from './firebase.js';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const styles = theme => ({
  root: {
    flexGrow: 0.1,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "black",
  }})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography color="white" variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

function logout() {
    console.log("logging out")
    auth.signOut()
    .then(() => {
      this.setState({
        user:null
      });
    });
    document.location.reload();
  }

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = (event) => {
    setProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setProfile(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {props.toHome?
            <KeyboardReturnIcon onClick = {()=>props.doneWithRoomToHome()} />:
            <KeyboardReturnIcon onClick = {()=>props.doneWithGame()} />
            }
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        <Dialog  onClose={handleCloseProfile} aria-labelledby="customized-dialog-title" open={profile }>

        <DialogTitle style={{color: 'white', backgroundColor: '#333399'}} id="customized-dialog-title" onClose={handleCloseProfile}>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            assets: {props.user_currentCoin}
            </DialogContentText>
            <DialogContentText>
            number of games played: {props.user_games}
            </DialogContentText>
            <DialogContentText>
            win / lose: {props.user_win} / {props.user_lost}
            </DialogContentText>
            <DialogContentText>
            most assets in the history: {props.user_highestCoin}
            </DialogContentText>
          </DialogContent>     
        </Dialog>
      </AppBar>
    </div>
  );
}
