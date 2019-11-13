/*Material UI*/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

/*Actions*/
import { changePage, toggleDrawer } from '../../actions';

/*Styles*/
const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
  },
};

class TopBar extends React.Component {
	constructor(props){
		super(props);
    this.state = {};
	}

  renderHamburger(){
    if (this.props.isValid) {
      return(
				<IconButton
					style={styles.hamburger}
					onClick={() => this.props.toggleDrawer()}
				>
					<Icon fontSize="large">{(this.props.drawerOpen) ? 'close' : 'menu'}</Icon>
				</IconButton>
      )
    } else {
      return null;
    }
  }

	render() {
		return (
			<AppBar color="primary" position="fixed">
        <Toolbar disableGutters>
          {this.renderHamburger()}
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0px 16px'}}>
            <Typography variant={'h5'}>{TITLE}</Typography>
            <Typography variant={'h5'}>{`v${VERSION}`}</Typography>
          </div>
        </Toolbar>
      </AppBar>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    page: state.page.current,
    drawerOpen: state.page.drawerOpen,
    isValid: state.session.isValid,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    changePage: (page) => dispatch(changePage(page)),
    toggleDrawer: () => dispatch(toggleDrawer()),
	}
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(TopBar);
