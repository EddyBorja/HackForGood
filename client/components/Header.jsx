import React from 'react';
import ReactMixin from 'react-mixin';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';

import CustomTheme from './customTheme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
  title: {
    cursor: 'pointer',
  },
};



export default class Header extends React.Component {

      //the key passed through context must be called "muiTheme"


    constructor(){
        super();
        this.iconMenu = this.iconMenu.bind(this);
        this.state = this.initialState();
    }

    getChildContext() {
        return {
          muiTheme: ThemeManager.getMuiTheme(CustomTheme)
        };
    }

    initialState(){
        return {
        }
    }

    getMeteorData(){
        var data = {}
        data.loaded = false;
        data.isLoggedIn = Meteor.user() !== null;
        data.userData = {};

        var handle = Meteor.subscribe('userData', Meteor.userId());
        if(handle.ready()){
            data.loaded = true;
            var userArray = Meteor.users.find({_id : Meteor.userId()}).fetch();
            data.userData = userArray[0];
            console.log(userArray);
        }

        return data;
    }

    render(){
        return (
            <AppBar
                title={<span style={styles.title}>Pizarra</span>}
                iconElementRight={this.iconMenu()} 
            />
        );
    }

    iconMenu(){
        if(this.data.isLoggedIn){

            var avatarURL = ""//"http://graph.facebook.com/" + this.data.userData.services.facebook.id + "/picture?type=large";

            return <IconMenu
                    iconButtonElement={
                      <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <div>
                    <img style={{"width": "48px"}} src={avatarURL}/>
                    Eddy Borja
                    </div>
                    <MenuItem primaryText="Edit Profile" />
                    <MenuItem primaryText="Log Out" onClick={()=> {
                        Meteor.logout(); 
                    }}/>
                  </IconMenu>
        } else {
            return null;
        }

    }

}

Header.propTypes = {
    //stringProp: React.PropTypes.string
};

Header.childContextTypes = {
    muiTheme: React.PropTypes.object
};

Header.defaultProps = {
    //stringProp: 'defaultValue'
};

ReactMixin(Header.prototype, ReactMeteorData);
