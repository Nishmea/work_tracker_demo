/*Material UI*/
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

/*Components*/
import MediaQuery from 'react-responsive';

/*Styles*/
import { palette } from '../../theme';
const styles = {
  wrapper: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: palette.secondary,
  },
  button_large: {
    width: '40%',
    minWidth: '275px',
    height: '100px',
  },
  button_small: {
    width: '45%',
    height: '75px',
  },
}
export default class Buttons extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  clockInOut(){
    switch (this.props.currentStatus) {
      case 'OUT':
        this.props.clockIn()
        break;

      case 'IN':
        this.props.clockOut()
        break;

      default:
        return false;
    }
  }

  render(){
    return(
			<div style={styles.wrapper}>

        <MediaQuery minDeviceWidth={1000}>
  				<Button
            variant={'contained'}
            style={styles.button_large}
            onClick={() => this.clockInOut()}
          >
            <Icon fontSize={'large'} style={{marginRight: '16px', color: palette.in}}>timer</Icon>
            <Typography variant={'h4'}>Clock In</Typography>
          </Button>

  				<Button
            variant={'contained'}
            style={styles.button_large}
            onClick={() => this.clockInOut()}
          >
            <Icon fontSize={'large'} style={{marginRight: '16px', color: palette.out}}>timer_off</Icon>
            <Typography variant={'h4'}>Clock Out</Typography>
          </Button>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={999}>
  				<Button
            variant={'contained'}
            style={styles.button_small}
            onClick={() => this.clockInOut()}
          >
            <Icon fontSize={'large'} style={{marginRight: '16px', color: palette.in}}>timer</Icon>
            <Typography variant={'h4'}>In</Typography>
          </Button>

  				<Button
            variant={'contained'}
            style={styles.button_small}
            onClick={() => this.clockInOut()}
          >
            <Icon fontSize={'large'} style={{marginRight: '16px', color: palette.out}}>timer_off</Icon>
            <Typography variant={'h4'}>Out</Typography>
          </Button>
        </MediaQuery>

			</div>
    )
  }
}
