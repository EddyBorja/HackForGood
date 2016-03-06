ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1521215024847848',
    secret: '0dbca9dd49670d48146e72169fd2b008',
    requestPermissions: ['public_profile', 'email']
});
