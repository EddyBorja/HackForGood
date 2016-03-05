import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import CircularProgress from 'material-ui/lib/circular-progress';


export default class TestPage extends React.Component {

    constructor(){
        super();

        this.renderPostList = this.renderPostList.bind(this);
        this.state = this.initialState();
    }

    componentDidMount(){

        Meteor.call("getPizarraLastPublic50", (error, result) => {
            if(result){
                console.log("Got result: %O", result);
                this.setState({loaded: true, posts : result});
            } else {
                console.log("Error Fetching Public 50: %O", error);
            }
        });

    }

    initialState(){
        return {
            loaded: false,
            posts: []
        }
    }


    render(){
        return (
            <div>
            <h1>Pizarra Public Chat</h1>
            <RaisedButton label="New Post" primary={true} />
            {this.renderPostList(this.state.posts)}
            </div>
        );
    }

    renderPostList(posts){
        if(this.state.loaded == false){
            return <CircularProgress size={2} /> 
        } else {
            return <Paper>
                        {posts.map((post, index) => {
                            return <div>
                                    <p><b>{post.name}</b></p>
                                    <p>{post.text}</p> 
                                    <Divider />
                                </div>
                        })}
                    </Paper>
        }
    }


}

TestPage.propTypes = {
    //stringProp: React.PropTypes.string
};

TestPage.defaultProps = {
    //stringProp: 'defaultValue'
};
