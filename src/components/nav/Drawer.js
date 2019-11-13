/*Material UI*/
import {Drawer as MUI_Drawer} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom';

/*Actions*/
import { changePage, toggleDrawer } from '../../actions';
import { logout } from '../../actions/login';

/*Styles*/
const styles = {
  menuItem: {
    height: '75px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}

class Drawer extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <MUI_Drawer
        variant={'persistent'}
        open={this.props.drawerOpen}
        onClose={() => this.props.toggleDrawer()}
				PaperProps={{style: {zIndex: '2', width: '200px'}}}
      >
        <List style={{paddingTop: '64px'}}>

          <ListItem button style={{height: '64px'}} component={Link} to="/" onClick={() => this.props.toggleDrawer()}>
            <ListItemIcon><Icon>access_time</Icon></ListItemIcon>
            <ListItemText primary="Clock In/Out" />
          </ListItem>

          <ListItem button style={{height: '64px'}} component={Link} to="/day" onClick={() => this.props.toggleDrawer()}>
            <ListItemIcon><Icon>event_note</Icon></ListItemIcon>
            <ListItemText primary="Day View" />
          </ListItem>

          <ListItem button style={{height: '64px'}} component={Link} to="/settings" onClick={() => this.props.toggleDrawer()}>
            <ListItemIcon><Icon>settings_applications</Icon></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          {/*
          <ListItem button style={{height: '64px'}} component={Link} to="/week" onClick={() => this.props.toggleDrawer()}>
            <ListItemIcon><Icon>view_week</Icon></ListItemIcon>
            <ListItemText primary="Week View" />
          </ListItem>
          */}
          <ListItem button style={{height: '64px'}} onClick={() => {this.props.logout(); this.props.toggleDrawer();}}>
            <ListItemIcon><Icon>logout</Icon></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </MUI_Drawer>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    page: state.page.current,
    drawerOpen: state.page.drawerOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    changePage: (page) => dispatch(changePage(page)),
    toggleDrawer: () => dispatch(toggleDrawer()),
    logout: () => dispatch(logout()),
	}
}


Drawer.propTypes = {
  page: PropTypes.string,
  drawerOpen: PropTypes.bool,
  changePage: PropTypes.func,
  toggleDrawer: PropTypes.func,
  logout: PropTypes.func,
}

Drawer.defaultProps = {
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Drawer);
