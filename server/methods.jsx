import Moment from 'moment';


const APRETASTE_URL = "https://apretaste.com/run/api/"  

Meteor.methods({

    currentUserPhotoURL(){
        var URL = "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture?type=large";
        console.log("Return " + URL);
        return URL;
    },

    getProfileInfo(email){
        //this.unblock();
        var result = HTTP.get(APRETASTE_URL, {params : {subject : "perfil " + email}});
        var jsonData = JSON.parse(result.content);
        return jsonData.profile;
    },
    
    updatePizarraLast50(){
        this.unblock();
        var result = HTTP.get(APRETASTE_URL, {headers: {'Content-Type': 'application/json; charset=UTF-8'}, params: {subject : "pizarra"}});
        var jsonData = JSON.parse(result.content);
        var newPosts = [];
        _.each(jsonData.notes, (note) => {
            var data = {};
            
            var date = Moment(note.inserted).format("YYYY-MM-DD HH:mm:ss");

            var timeStamp = date;

            data._id = CryptoJS.MD5(note.inserted+note.text).toString();
            data.email = note.email;
            data.gender = note.gender;
            data.apretasteId = note.id;
            data.inserted = timeStamp;
            data.likes = note.likes;
            data.location = note.location;
            data.name = note.name;
            data.picture = note.picture;
            data.source = note.source;
            data.text = note.text;
            newPosts.push(data);
        }, this);

        _.each(newPosts, (post) => {
            Posts.upsert(post._id, post);
        }, this);
    },

    postMessage(message, userEmail){
        this.unblock();
        var data = "pizarra " + message;
        var email = userEmail;
        var response = HTTP.post(APRETASTE_URL, {params: {subject : data, email: email}});
        return response;
    },

    getPizarraLastPublic50(){
        this.unblock();
            var result = HTTP.get(APRETASTE_URL, {headers: {'Content-Type': 'application/json; charset=UTF-8'}, params: {subject : "pizarra"}});
            var jsonData = JSON.parse(result.content);
            return jsonData.notes;
    },

    pizarraPublicPost(message, email){
        this.unblock();
        var formattedMessage = "pizarra " + message;
        var result = HTTP.post(APRETASTE_URL, {params: {subject : formattedMessage, email: email}});
        return result;
    }

});
