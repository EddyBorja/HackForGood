import React from 'react';

export default class NewPost extends React.Component {

    constructor() {
        super();

        //bind instance methods to instance here
        this.initialState = this.initialState.bind(this);
        this.state = this.initialState();
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
                <h1>New Post</h1>
            </div>
        );
    }
}

NewPost.propTypes = {
    //stringProp: React.PropTypes.string
};

NewPost.defaultProps = {
    //stringProp: 'defaultValue'
};
