/*Material Ui*/
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import Add from '../records/Add';
import Records from '../records/Records';

/*Actions*/
import { fetchRecords, deleteRecord, addRecord } from '../../actions';
import { timeCalc } from '../../actions/utility';

/*Styles*/
import {palette} from '../../theme';
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: palette.secondary,
  },
  dateWrapper: {
    width: '100%',
    margin: '8px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsWrapper: {
    width: '100%',
    margin: '8px 0px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'space-around',
  },
  statBox: {
    width: 'calc(30% - 32px)',
    margin: '8px 16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordsWrapper: {
    width: '100%',
    flexGrow: '1',
    margin: '25px',
    overflowY: 'auto',
  },
  addButton: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
  },
}

/*Constants*/
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class Day extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dateChosen: new Date(),
      addOpen: false,
    }
  }

  chooseDate(date){
    let dateTime = Number(date.setHours(0, 0, 0, 0));
    this.props.fetchRecords(dateTime);
    this.setState({dateChosen: date});
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.props.isValid && !this.props.isFetching) {
      let dateTime = Number(this.state.dateChosen.setHours(0, 0, 0, 0));
      this.props.fetchRecords(dateTime);
    }
  }

  componentDidMount(){
    if (!this.props.lastChecked || !this.props.isValid) {
      this.props.fetchRecords();
    }
  }

  render() {
    return(
      <div className={'wrapper'} style={styles.wrapper}>

        <div style={styles.dateWrapper}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label="Choose Date"
              format={'MMMM d, yyyy'}
              ampm={false}
              value={this.state.dateChosen}
              onChange={(e) => this.chooseDate(e)}
            />
          </MuiPickersUtilsProvider>
          <Typography variant={'h5'} style={{color: palette.white, fontWeight: 'bold', fontStyle: 'italic', marginLeft: '16px'}}>
            {days[this.state.dateChosen.getDay()]}
          </Typography>
        </div>

        <div style={styles.statsWrapper}>
          <p style={styles.statBox}>
            <span>{'Work Hours: '}</span>
            <span><b>{timeCalc(this.props.records, 'workHours')}</b></span>
          </p>
          <p style={styles.statBox}>
            <span>{'Periods: '}</span>
            <span><b>{timeCalc(this.props.records, 'periods')}</b></span>
          </p>
          <p style={styles.statBox}>
            <span>{'Start: '}</span>
            <span><b>{timeCalc(this.props.records, 'startTime')}</b></span>
          </p>
          <p style={styles.statBox}>
            <span>{'Break Hours: '}</span>
            <span><b>{timeCalc(this.props.records, 'breakHours')}</b></span>
          </p>
          <p style={styles.statBox}>
            <span>{'Breaks: '}</span>
            <span><b>{timeCalc(this.props.records, 'numberBreaks')}</b></span>
          </p>
          <p style={styles.statBox}>
            <span>{'End: '}</span>
            <span><b>{timeCalc(this.props.records, 'endTime')}</b></span>
          </p>
        </div>

        <Records
          dateChosen={this.state.dateChosen}
        />

        <Add
          open={this.state.addOpen}
          dateChosen={this.state.dateChosen}
          projects={this.props.projects}
          addRecord={this.props.addRecord.bind(this)}
          onClose={() => this.setState({addOpen: false})}
        />

        <Fab
          title={'Add Record'}
          color={'primary'}
          onClick={() => this.setState({addOpen: true})}
          style={styles.addButton}
        >
          <Icon>add</Icon>
        </Fab>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.log.records,
    projects: state.user.data.projects,
    isValid: state.log.isValid,
    isFetching: state.log.isFetching,
    lastChecked: state.log.lastChecked,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    fetchRecords: (payload) => dispatch(fetchRecords(payload)),
    addRecord: (payload) => dispatch(addRecord(payload)),
    deleteRecord: (id) => dispatch(deleteRecord(id)),
	}
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Day);
