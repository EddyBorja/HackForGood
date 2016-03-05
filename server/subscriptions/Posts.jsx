

Meteor.publish('pizarra50', () => {
    return Posts.find({}, {sort: {inserted: -1}});
});

