import React from 'react';
import ReactMixin from 'react-mixin';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Login from './pages/Login.jsx';

export default class App extends React.Component {

    getMeteorData(){
        return {
            isLoggedIn: Meteor.userId() !== null
        };
    }

    render(){
        if(1){
            return (
                <div>
                    <Header />
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Login />
            );
        }
    }

}

App.propTypes = {
    //stringProp: React.PropTypes.string
};

App.defaultProps = {
    //stringProp: 'defaultValue'
};

ReactMixin(App.prototype, ReactMeteorData);
