SyncedCron.options.collectionName = 'cronjobs';

SyncedCron.add({
    name: 'Pizarra Last 50',
    schedule: function(parser){
        return parser.text('every 1 seconds');
    },
    job: function(){
        Meteor.call('updatePizarraLast50');
    }
});

Meteor.startup(() => {
    SyncedCron.start();
});


