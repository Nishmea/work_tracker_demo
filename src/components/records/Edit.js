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

export default class Edit extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    let { entry_id, time, project, task, status } = this.props.edit.editRecord;
    return(
      <Dialog
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <DialogTitle>
          <Typography variant={'h5'}>Edit Record</Typography>
        </DialogTitle>

        <DialogContent>

          <Typography variant={'h3'} align={'center'} style={{color: palette[status]}}>{status}</Typography>

          <DropDown
            label={'Project'}
            fullWidth
            value={project}
            onChange={(e) => this.props.editRecord({project: e.target.value})}
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
            value={task}
            fullWidth
            onChange={(e) => this.props.editRecord({task: e.target.value})}
            wrapperStyle={{marginTop: '32px'}}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              ampm={false}
              value={time}
              onChange={(e, v) => this.props.editRecord({time: e})}
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
              this.props.updateRecord()
            }}
          >
            Update
          </Button>
        </DialogActions>

      </Dialog>
    )
  }
}
