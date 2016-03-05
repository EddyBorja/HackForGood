import React from 'react';
import ReactMixin from 'react-mixin';

export default class Dashboard extends React.Component {

    constructor() {
        super();

        //bind instance methods to instance here
        this.initialState = this.initialState.bind(this);

        this.state = this.initialState();
    }

    getMeteorData(){
        return {
            user: Meteor.user(),
        };
    }


    initialState(){
        return {

        };
    }

    //componentWillMount(){}

    //componentDidMount(){}

    //componentWillUnmount(){}

    //shouldComponentUpdate(nextProps, nextState){}
    
    //componentWillUpdate(nextProps, nextState){}

    //componentDidUpdate(prevProps, prevState){}

    //componentWillReceiveProps(nextProps){}

    render(){
        return (
            <div>
                Dashboard
            </div>
        );
    }
}

Dashboard.propTypes = {
    //stringProp: React.PropTypes.string
};

Dashboard.defaultProps = {
    //stringProp: 'defaultValue'
};

ReactMixin(Dashboard.prototype, ReactMeteorData);
