import React from 'react';
import ReactMixin from 'react-mixin';
import Input from '../Input.jsx';
import { PropTypes as RouterPropTypes} from 'react-router';

export default class Signup extends React.Component {

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
                    <h1>Sign Up</h1>
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
                <div><span className="fa fa-cog fa-spin"></span><span style={{"marginLeft":"10px"}}>Creating Account...</span></div> 
            </form>
        } else {
           return  <form onSubmit={this.onSubmit}>
                <Input name="email" placeholder="Email Address" className="form-control" required />
                <Input type="password" name="password" placeholder="Password" className="form-control" required />
                <Input type="submit" value="Create Account" className="btn btn-primary" />
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
        var name = $(e.target).find("[name=username]").val();
        var email = $(e.target).find("[name=email]").val();
        var password = $(e.target).find("[name=password]").val();
        var profile = {"name" : name};

        Accounts.createUser({'email' : email,
                             'password' : password, 
                             'profile' : profile}, (error) => {
            if(error){
                var attempts = error.reason == self.state.errorMessage ? self.state.attempts + 1 : 0;
                self.setState({'errorMessage' : error.reason, 'attempts' : attempts});
            } else {
                self.context.history.pushState(null, '/');
            }
        });
    } 
}

Signup.propTypes = {
    //stringProp: React.PropTypes.string
};

Signup.defaultProps = {
    //stringProp: 'defaultValue'
};

Signup.contextTypes = {
    history: RouterPropTypes.history.isRequired
};

ReactMixin(Signup.prototype, ReactMeteorData);
