import React from 'react';
import ReactMixin from 'react-mixin';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

export default class Index extends React.Component {

    getMeteorData(){
        return {
            isLoggedIn: Meteor.userId() !== null
        };
    }

    render(){
        if(this.data.isLoggedIn){
            return <Dashboard />;
        } else {
            return <Login />;
        }
    }

}

Index.propTypes = {
    //stringProp: React.PropTypes.string
};

Index.defaultProps = {
    //stringProp: 'defaultValue'
};

ReactMixin(Index.prototype, ReactMeteorData);
