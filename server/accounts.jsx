Accounts.onCreateUser((options, user) => {
    console.log("created user: ", user);

    user.profile = {};
    user.profile.email = user.services.facebook.email;
    user.profile.first_name = user.services.facebook.first_name;
    user.profile.last_name = user.services.facebook.last_name;

    var APRETASTE_URL = "https://apretaste.com/run/api/"  
    
    var data = "api crear " + user.services.facebook.email;
    var email = "anonymous@anonymous.org";
    HTTP.post(APRETASTE_URL, {params: {subject : data, email: email}});

    data = "perfil nombre " + user.services.facebook.first_name + " " + user.services.facebook.last_name;
    HTTP.post(APRETASTE_URL, {params: {subject : data, email: email}});

    data = "perfil foto"
    var photoURL = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=large";
    var fullURL = "https://apretaste.com/run/api?subject=perfil foto&attachments=" + photoURL + "&email=" + email;
    HTTP.post(fullURL);
    console.log(fullURL);

    if(user.services.facebook.gender === "male") {
        
        data = "perfil sexo masculino";
    } else if (user.services.facebook.gender === "female") {

        data = "perfil sexo femenino";
    }
    HTTP.post(APRETASTE_URL, {params: {subject: data, email: email}});

    data = "perfil ciudad Miami"
    HTTP.post(APRETASTE_URL, {params: {subject: data, email:email}});
    
    return user;
});
