import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class Header extends React.Component {

    render(){
        return (
            <AppBar
                title={<span style={styles.title}>Pizarra</span>}
            />
        );
    }

}

Header.propTypes = {
    //stringProp: React.PropTypes.string
};

Header.defaultProps = {
    //stringProp: 'defaultValue'
};
