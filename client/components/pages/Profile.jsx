import React from 'react';
import ReactMixin from 'react-mixin';
import CircularProgress from 'material-ui/lib/circular-progress';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;

export default class Profile extends React.Component {

    constructor() {
        super();

        //bind instance methods to instance here
        this.initialState = this.initialState.bind(this);
        this.render = this.render.bind(this);
        this.state = this.initialState();
    }

    getMeteorData(){
        var data = {};
        data.isLoggedIn = Meteor.userId() !== null;
        data.user = Meteor.user(); 

        return data;
    }

    initialState(){
        return {
            loaded : false,
            profileData: {}
        }
    }

    componentWillMount(){
       if(this.data.isLoggedIn){ 
            console.log("Logged in", Meteor.user());
            Meteor.call("getProfileInfo", this.data.user.profile.email, 
            (error, result) => {
                if(result){
                    this.setState({loaded : true, profileData: result});
                } else {
                    console.log(error);
                }
                console.log(error, result);
            });

        } else {
            console.log("Logged out");
        }

    }


    //componentWillMount(){}

    //componentDidMount(){}

    //componentWillUnmount(){}

    //shouldComponentUpdate(nextProps, nextState){}
    
    //componentWillUpdate(nextProps, nextState){}

    //componentDidUpdate(prevProps, prevState){}

    //componentWillReceiveProps(nextProps){}

    render(){
        console.log("Loaded? ", this.state.loaded);
        if(this.state.loaded){
            return <Paper className="container-fluid">
                <Formsy.Form>
                    <FormsyText
                        name="Name"
                        validations='isWords'
                        required
                        hintText="What is your name?"
                        value="Eddy"
                        floatingLabelText="Name"
                    />
                </Formsy.Form>
            </Paper>
        } else {
            return (
                <CircularProgress size={2} />
            );
        }
    }
}

Profile.propTypes = {
    //stringProp: React.PropTypes.string
};

Profile.childContextTypes = {
    //muiTheme: React.PropTypes.object
};

Profile.defaultProps = {
    //stringProp: 'defaultValue'
};

ReactMixin(Profile.prototype, ReactMeteorData);
