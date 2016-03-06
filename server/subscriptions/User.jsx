
Meteor.publish('userData', (userId)=>{
    var fields = {'services' : 1};
    return Meteor.users.find({_id: userId}, {fields : fields}); 
});
