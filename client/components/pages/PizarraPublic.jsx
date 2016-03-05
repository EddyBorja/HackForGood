import React from 'react';
import ReactMixin from 'react-mixin';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import CircularProgress from 'material-ui/lib/circular-progress';


export default class PizarraPublic extends React.Component {

    constructor(){
        super();

        this.renderPostList = this.renderPostList.bind(this);
        this.state = this.initialState();
    }

    getMeteorData(){
        var data = {}
        data.loaded = false;

        var handle = Meteor.subscribe('pizarra50');
        if(handle.ready()){
            data.loaded = true;
            //fetch data and add to data object
            data.posts = Posts.find({}, {sort: {inserted: -1}}).fetch();
        }

        return data;
    }

    componentDidMount(){
        Meteor.call("updatePizarraLast50");
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
            {this.renderPostList(this.data.posts)}
            </div>
        );
    }

    renderPostList(posts){
        if(this.data.loaded == false){
            return <CircularProgress size={2} /> 
        } else {
            return <Paper>
                        {posts.map((post, index) => {
                            return <div key={index}>
                                    <p><b>{post.name}</b></p>
                                    <p>{post.text}</p> 
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
