import React from 'react';
import ReactMixin from 'react-mixin';
import {Link} from 'react-router';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import CircularProgress from 'material-ui/lib/circular-progress';


export default class PizarraPublic extends React.Component {

    constructor(){
        super();

        this.postWidget = this.postWidget.bind(this);
        this.renderPostList = this.renderPostList.bind(this);
        this.state = this.initialState();
    }

    getMeteorData(){
        var data = {}
        data.user = Meteor.user();
        data.servicesConfigured = Accounts.loginServicesConfigured();
        data.isLoggedIn = Meteor.userId() !== null;
        data.loaded = false;
        data.userDataLoaded = false;
        data.userData = {};

        var handle = Meteor.subscribe('pizarra50');
        if(handle.ready()){
            data.loaded = true;
            //fetch data and add to data object
            data.posts = Posts.find({}, {sort: {inserted: -1}}).fetch();
        }
        
        var userSub = Meteor.subscribe('userData', Meteor.userId()); 
        if(userSub.ready()){
            var userArray = Meteor.users.find({_id : Meteor.userId()}).fetch();
            data.userData = userArray[0];
            data.userDataLoaded = true;
        }

        return data;
    }

    componentDidMount(){
        Meteor.call("updatePizarraLast50");
    }

    initialState(){
        return {
            
            loaded: false,
            posts: [],
            newMessage: ""
        }
    }


    render(){
        return (
            <div style={{"paddingTop": "8px"}}>
                <div className="col-sm-12 col-md-10 col-md-offset-1">
                    <h2>Public Chat</h2>
                    {this.postWidget()}
                    {this.renderPostList(this.data.posts)}
                </div>
            </div>
        );
    }

    postWidget(){
            if(this.data.isLoggedIn === false){
                return <Paper style={{"margin" : "8px 0 36px 0", "padding" : "0 0 0 0"}}>
                    <div className="container-fluid">Log in to send messages to Cuba.</div>
                    <RaisedButton label="Log in with Facebook" onClick={()=>{
                        console.log("Facebook login");
                        Meteor.loginWithFacebook({}, (error) => {
                            if(error){
                                throw new Meteor.Error("Facebook login failed: ", error);
                            }
                        });
                    }} />
                </Paper>;
            }

            if(this.data.userDataLoaded === false){
                return null;
            }
            
            var avatarURL = "http://graph.facebook.com/" + this.data.userData.services.facebook.id + "/picture?type=large";
            
            return <Paper style={{"margin" : "8px 0 36px 0", "padding" : "16px 0 16px 0"}}>
                <div className="container-fluid" style={{"overflow" : "auto"}}>
                    <div style={{"float" : "left"}}>
                        <img src={avatarURL} style={{"width": "120px"}} />
                    </div>
                    <div style={{"margin-left" : "132px"}}>
                        <b>{this.data.userData.services.facebook.name}</b>
                        <TextField
                              fullWidth={true}
                              multiLine={true}
                              value={this.state.newMessage}
                              onChange={(event)=> {
                                    if(event.target.value.length <= 130){
                                        this.setState({newMessage : event.target.value});
                                    }
                              }}
                              hintText="Send a Message to Cuba..."
                            /><br/>
                        <div style={{"float" : "right"}}>
                            <RaisedButton label="Submit" primary={true} onClick={() => {
                                Meteor.call("postMessage", this.state.newMessage, this.data.userData.services.facebook.email);
                                this.setState({newMessage: ""});
                            }}
                            />
                        </div>
                        {this.textCount(this.state.newMessage)}
                    </div>
                </div>
            </Paper>;
    }

    textCount(message){
        return <small style={{"float" : "left"}}>{message.length}/130 characters</small>;
    }

    renderPostList(posts){
        if(this.data.loaded == false){
            return <CircularProgress size={2} /> 
        } else {
            return <Paper>
                        {posts.map((post, index) => {
                            var photoURL = "https://apretaste.com/profile/thumbnail/" +  post.email + ".jpg";
                            return <div key={post._id}>
                                <div className="container-fluid" style={{"min-height" : "200px", "overflow" : "auto", "padding" : "16px"}}>
                                        <div style={{"float" : "left", "max-height" : "100px", "overflow" : "hidden"}}>
                                            <img src={photoURL} style={{"display" : "block", "width" : "75px"}} />
                                        </div>
                                        <div style={{"margin-left" : "85px"}}>
                                            <b>{post.name}</b><br />
                                            <small>{post.location}</small>
                                            <p>{post.text}</p> 
                                        </div>
                                </div>
                                    <Divider />
                                </div>
                        })}
                    </Paper>
        }
    }


}

PizarraPublic.propTypes = {
    //stringProp: React.PropTypes.string
};

PizarraPublic.defaultProps = {
    //stringProp: 'defaultValue'
};



ReactMixin(PizarraPublic.prototype, ReactMeteorData);
