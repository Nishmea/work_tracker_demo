/*Material UI*/
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/*Components*/
import Clock from './Clock';
import Buttons from './Buttons';
import Records_Table from '../records/Records_Table';
import DropDown from '../inputs/DropDown';
import TextInput from '../inputs/TextInput';

/*Actions*/
import {
  clockIn,
  clockOut,
  fetchRecords,
  deleteRecord,
  setClock,
  changeTask,
  changeProject,
} from '../../actions';
import {mapObject} from '../../actions/utility';

/*Styles*/
import { palette } from '../../theme';
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  statusWrapper: {
    width: '100%',
    padding: '8px',
    fontSize: '2em',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskWrapper: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.secondary,
  },
};

class Main extends React.Component {
	constructor(props){
		super(props);
    this.state = {};
	}

  componentDidUpdate(prevProps, prevState, snapshot){
    if (!this.props.isValid && !this.props.isFetching) {
      this.props.fetchRecords();
    }
  }

  componentDidMount(){
    this.props.fetchRecords();
  }

	render() {
		return (
      <div className={'wrapper'} style={styles.wrapper}>

        <Clock
          clock_id={this.props.clock_id}
          unix_time={this.props.unix_time}
          setClock={this.props.setClock.bind(this)}
        />

        <Buttons
          currentStatus={this.props.currentStatus}
          clockIn={this.props.clockIn.bind(this)}
          clockOut={this.props.clockOut.bind(this)}
        />

        <div style={{...styles.statusWrapper, color: palette.white, backgroundColor: palette[this.props.currentStatus.toLowerCase()]}}>
          {this.props.currentStatus}
        </div>

        <div style={styles.taskWrapper}>

          <DropDown
            label={'Project'}
            fullWidth
            disabled={this.props.currentStatus === 'IN'}
            value={this.props.project}
            onChange={(e) => this.props.changeProject(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {this.props.projects.map((val, ind) => {
              return(
                <MenuItem key={ind} value={val}>{val}</MenuItem>
              )
            })}
          </DropDown>

          <TextInput
            label={'Task Name'}
            fullWidth
            autoFocus={this.props.task === ''}
            disabled={this.props.currentStatus === 'IN'}
            value={this.props.task}
            onChange={(e) => this.props.changeTask(e.target.value)}
            wrapperStyle={{marginTop: '16px'}}
          />

        </div>

        <Records_Table
          clock
          dateChosen={null}
        />

      </div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    records: state.log.records,
    project: state.clock.project,
    projects: state.user.data.projects,
    isValid: state.log.isValid,
    isFetching: state.log.isFetching,
    lastChecked: state.log.lastChecked,
    lastTask: state.log.lastRecord.task,
    task: state.clock.task,
    currentStatus: state.clock.status,
    clock_id: state.clock.clock_id,
    unix_time: state.clock.unix_time,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    clockIn: () => dispatch(clockIn()),
    clockOut: (payload) => dispatch(clockOut(payload)),
    fetchRecords: () => dispatch(fetchRecords()),
    deleteRecord: (id) => dispatch(deleteRecord(id)),
    changeTask: (newTask) => dispatch(changeTask(newTask)),
    changeProject: (newProject) => dispatch(changeProject(newProject)),
    setClock: (clock_id, unix_time) => dispatch(setClock(clock_id, unix_time)),
	}
}

Main.propTypes = {
  projects: PropTypes.array,
  lastTask: PropTypes.string,
  currentStatus: PropTypes.oneOf(['IN', 'OUT']),
}

Main.defaultProps = {
  projects: [],
  lastTask: '',
  lastChecked: 0,
  currentStatus: 'OUT',
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Main);
