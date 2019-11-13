/*Material UI*/
import Typography from '@material-ui/core/Typography';

/*Actions*/
import { toDate } from '../../actions/utility';

/*Styles*/
import { palette } from '../../theme';
const styles = {
  wrapper: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.secondary,
  },
}

export default class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  keepTime(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let clock = setInterval( () => {
      let unixTime = Date.now();
      let time = new Date(unixTime);

      let day = days[time.getDay()];
      let date = Number(time.getDate());
      if (date < 10) {
        date = String(0) + String(date)
      }
      let month = months[time.getMonth()];
      let year = time.getFullYear();

      let hour = time.getHours();
      if (hour < 10) {
        hour = String(0) + String(hour)
      }
      let minute = time.getMinutes();
      if (minute < 10) {
        minute = String(0) + String(minute)
      }
      let second = time.getSeconds();
      if (second < 10) {
        second = String(0) + String(second)
      }

      this.props.setClock(clock, unixTime);

    }, 1000)
  }

  componentDidMount(){
    this.keepTime();
  }

  componentWillUnmount(){
    clearInterval(this.props.clock_id);
  }

  render(){

    return(
      <div style={styles.wrapper}>
        <Typography variant={'h5'}>{toDate(this.props.unix_time, 'date')}</Typography>
        <Typography variant={'h5'} style={{fontStyle: 'italic', color: palette.text_primary}}>{toDate(this.props.unix_time, 'day')}</Typography>
        <span>
          <Typography variant={'h3'} display={'inline'} style={{fontWeight: 'bold'}}>{toDate(this.props.unix_time, 'time')}</Typography>
          <Typography variant={'h6'} display={'inline'}>{toDate(this.props.unix_time, 'sec')}</Typography>
        </span>
      </div>
    )
  }
}
