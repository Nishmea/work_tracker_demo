/*Material UI*/
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import {Tabs, Tab} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

/*Components*/
import TextInput from '../inputs/TextInput';
import DropDown from '../inputs/DropDown';

import { palette } from '../../theme';

export default class Add extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      time_in: null,
      time_out: null,
      task: '',
      project: 'false',
      dateChosen: this.props.dateChosen,
    };
  }

  addRecord(){
    this.props.addRecord({
      time_in: this.state.time_in.valueOf(),
      time_out: this.state.time_out.valueOf(),
      task: this.state.task,
      project: this.state.project,
      dateChosen: this.state.dateChosen.valueOf(),
    });
  }

  render(){
    return(
      <Dialog
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <DialogTitle>
          <Typography variant={'h5'}>Add Record</Typography>
        </DialogTitle>

        <DialogContent>

          <Typography variant={'h6'}>{this.state.dateChosen.toLocaleDateString('en-US', {month: 'long', weekday: 'long', year: 'numeric', day: 'numeric', format: 'long'})}</Typography>

          <DropDown
            label={'Project'}
            fullWidth
            value={this.state.project}
            onChange={(e) => this.setState({project: e.target.value})}
            wrapperStyle={{marginTop: '32px'}}
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
            value={this.state.task}
            fullWidth
            onChange={(e) => this.setState({task: e.target.value})}
            wrapperStyle={{marginTop: '32px'}}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time IN"
              ampm={false}
              value={this.state.time_in}
              onChange={(e, v) => this.setState({time_in: e})}
              style={{width: '100%'}}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time OUT"
              ampm={false}
              value={this.state.time_out}
              onChange={(e, v) => this.setState({time_out: e})}
              style={{width: '100%'}}
            />
          </MuiPickersUtilsProvider>

        </DialogContent>

        <DialogActions>
          <Button
            variant={'contained'}
            onClick={() => this.props.onClose()}
          >
            Cancel
          </Button>

          <Button
            color={'primary'}
            variant={'contained'}
            onClick={() => {
              this.props.onClose();
              this.addRecord();
            }}
          >
            Add
          </Button>
        </DialogActions>

      </Dialog>
    )
  }
}
