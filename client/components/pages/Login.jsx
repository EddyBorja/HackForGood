import React from 'react';
import ReactMixin from 'react-mixin';
import { PropTypes as RouterPropTypes} from 'react-router';
import Input from '../Input.jsx';

export default class Login extends React.Component {


    constructor(){
        super();
        this.initialState = this.initialState.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = this.initialState();
    }

    getMeteorData(){
        return {
            isLoggingIn: Meteor.loggingIn()
        };
    }

    initialState(){
        return {
            errorMessage: '',
            attempts: 0
        };
    }

    render(){
        return(
        <div className="content container credential">
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <h1>Login</h1>
                    {this.renderError()}
                    {this.renderForm()}
                </div>
            </div>
        </div>
        );
    }

    renderForm(){
        if(this.data.isLoggingIn){

           return  <form onSubmit={this.onSubmit}>
                <Input type="text" name="email" placeholder="Email Address" className="form-control" required={true} disabled={true} />
                <Input type="password" name="password" placeholder="Password" className="form-control" required={true} disabled={true} />
                <div><span className="fa fa-cog fa-spin"></span><span style={{"marginLeft":"10px"}}>Logging in...</span></div> 
            </form>
        } else {
           return  <form onSubmit={this.onSubmit}>
                <Input name="email" placeholder="Email Address" className="form-control" required />
                <Input type="password" name="password" placeholder="Password" className="form-control" required />
                <Input type="submit" value="Login" className="btn btn-primary" />
            </form>
        }
    }

    renderError(){
        if(this.state.errorMessage !== ''){
            return this.state.attempts > 3 ? this.state.errorMessage.toUpperCase() + "!" : this.state.errorMessage;
        } else {
            return null;
        }
    }

    onSubmit(e){
        e.preventDefault();

        var self = this;
        var email = $(e.target).find("[name=email]").val();
        var password = $(e.target).find("[name=password]").val();
        Meteor.loginWithPassword(email,password, (error) => {
            if(error){
                var attempts = error.reason == self.state.errorMessage ? self.state.attempts + 1 : 0;
                self.setState({'errorMessage' : error.reason, 'attempts' : attempts});
            } else {
                self.context.history.pushState(null, '/');
            }
        });
    } 
}


Login.propTypes = {
    //stringProp: React.PropTypes.string
};

Login.defaultProps = {
    //stringProp: 'defaultValue'
};

Login.contextTypes = { 
    history: RouterPropTypes.history.isRequired 
};

ReactMixin(Login.prototype, ReactMeteorData);
