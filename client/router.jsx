import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history'

const history = useBasename(createHistory)({
    basename: '/'
})


import App from './components/App.jsx';
import Index from './components/pages/Index.jsx';
import AppNotFound from './components/pages/AppNotFound.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import PizarraPublic from './components/pages/PizarraPublic.jsx';

var Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/testPage" component={PizarraPublic}/>
        <Route path="*" component={AppNotFound}/>
    </Route>
)


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin

Meteor.startup(function() {
    console.log("Inject Tap Event Plugin");
    injectTapEventPlugin();

    render(
        <Router history={history}>
            {Routes}
        </Router>
        , document.getElementById('app')
    );
});
