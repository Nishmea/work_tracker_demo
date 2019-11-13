/*Material UI*/
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import {Table, TableBody, TableFooter, TableHead, TableRow, TableCell} from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions } from '@material-ui/core';

/*Components*/
import Edit from './Edit';
import Loading from '../misc/Loading';

/*Actions*/
import { deleteRecord, updateRecord, editRecord } from '../../actions';
import { mapObject, toDate } from '../../actions/utility';

/*Styles*/
import { palette } from '../../theme';
const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowY: 'auto',
    backgroundColor: palette.paper,
    position: 'relative',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
};

class Records extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      deleteOpen: false,
      deleteKey: '',
      editOpen: false,
      edit_status: 'IN',
      edit_task: '',
      edit_time: null,
      edit_key: null,
    }
	}

  renderDeleteDialog(){
    const actions = [
      <Button
        label="Cancel"
        onTouchTap={() => this.setState({deleteOpen: false})}
      />,
      <Button
        label="Delete"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={() => this.setState({deleteOpen: false}, () => {this.props.deleteRecord(this.state.deleteKey)})}
      />,
    ];

    let records = this.props.records;
    let key = this.state.deleteKey;
    let status = (key) ? records[key]['status'] : '';
    let time = (key) ? records[key]['time'] : '';
    let task = (key) ? records[key]['task'] : '';

    return (
      <Dialog
        title="Delete Record?"
        actions={actions}
        modal={true}
        open={this.state.deleteOpen}
        onRequestClose={() => this.setState({deleteOpen: false})}
      >
        <p>Are you sure you want to delete this record?</p>
        <p>
          <span style={{color: palette[status.toLowerCase()]}}>{status}</span>
          <span>{time}</span>
          <span>{task}</span>
        </p>
      </Dialog>
    )
  }

  deleteRecord(key){
    this.setState({
      deleteOpen: true,
      deleteKey: key,
    })
  }

  editRecord(record){

    this.props.editRecord({
      ...record,
      time: new Date(Number(record.time_id)),
    })

    this.setState({
      editOpen: true,
    })
  }

  returnRecords(){
    if (this.props.isFetching) {
      return(
        <Loading />
      )
    } else {
      return this.props.records.sort((a, b) => (a.time_id > b.time_id) ? -1 : 1).map((val, ind) => {
        return(
          <ExpansionPanel key={ind} style={{width: '100%', padding: '0px'}}>
            <ExpansionPanelSummary style={{padding: '0px 8px'}}>
              <Grid container alignItems={'center'}>
                <Grid item xs={2}>
                  <Typography variant={'h6'} style={{color: palette[val.status.toLowerCase()], fontWeight: 'bold'}}>{val.status}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant={'h6'} style={{fontWeight: 'bold'}}>{toDate(val.time_id, 'time')}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'h6'}>{val.project}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'h6'}>{val.task}</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelActions>
              {/*
              <Fab
                size={'small'}
                title={'Delete'}
                style={{backgroundColor: palette.error}}
              >
                <Icon>delete</Icon>
              </Fab>
              */}
              <Fab
                size={'small'}
                title={'Edit'}
                color={'secondary'}
                onClick={() => this.editRecord(val)}
              >
                <Icon>edit</Icon>
              </Fab>
            </ExpansionPanelActions>
          </ExpansionPanel>
        )
      })
    }
  }

	render() {
		return (
      <React.Fragment>

        <Edit
          open={this.state.editOpen}
          onClose={() => this.setState({editOpen: false})}
          edit={this.props.edit}
          projects={this.props.projects}
          editRecord={this.props.editRecord.bind(this)}
          updateRecord={this.props.updateRecord.bind(this)}
        />

        <div style={styles.wrapper}>
          <Grid container alignItems={'center'} style={{padding: '8px', backgroundColor: palette.background}}>
            <Grid item xs={2}>
              <Typography variant={'h6'}>{'Status'}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={'h6'}>{'Time'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant={'h6'}>{'Project'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant={'h6'}>{'Task'}</Typography>
            </Grid>
          </Grid>

          {this.returnRecords()}
        </div>

        {/*
        <div style={styles.wrapper}>
            <Table>
              <TableHead>
                <TableRow style={{width: '100%', display: 'flex'}}>
                  <TableCell style={{width: '64px', padding: '8px'}} align={'right'}>Log</TableCell>
                  <TableCell style={{width: '64px', padding: '8px'}}>Time</TableCell>
                  <TableCell style={{width: '124px', padding: '8px'}}>Project</TableCell>
                  <TableCell style={{flexGrow: '1', padding: '8px'}}>Task</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.records.map((val, ind) => {
                  return (
                    <TableRow key={ind} hover onClick={() => this.editRecord(val)} style={{width: '100%', display: 'flex'}}>

                      <TableCell style={{width: '64px', flexShrink: '0', padding: '8px'}} align={'right'}>
                        <Typography variant={'h6'} style={{color: palette[val.status.toLowerCase()], fontWeight: 'bold'}}>{val.status}</Typography>
                      </TableCell>

                      <TableCell style={{width: '64px', flexShrink: '0', padding: '8px'}}>
                        <Typography variant={'h6'} style={{fontWeight: 'bold'}}>{toDate(val.time_id, 'time')}</Typography>
                      </TableCell>

                      <TableCell style={{width: '124px', flexShrink: '0', padding: '8px'}}>
                        <Typography variant={'h6'}>{val.project}</Typography>
                      </TableCell>

                      <TableCell style={{flexGrow: '1', flexShrink: '0', padding: '8px'}}>
                        <Typography variant={'h6'}>{val.task}</Typography>
                      </TableCell>

                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
        </div>
        */}

      </React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    records: state.log.records,
    isValid: state.log.isValid,
    isFetching: state.log.isFetching,
    lastChecked: state.log.lastChecked,
    edit: state.edit,
    projects: state.user.data.projects,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    deleteRecord: (id) => dispatch(deleteRecord(id)),
    editRecord: (payload) => dispatch(editRecord(payload)),
    updateRecord: () => dispatch(updateRecord()),
	}
}

Records.propTypes = {
  records: PropTypes.array,
  projects: PropTypes.array,
  isValid: PropTypes.bool,
  isFetching: PropTypes.bool,
  lastChecked: PropTypes.number,
}

Records.defaultProps = {
  records: [],
  projects: [],
  isValid: false,
  isFetching: false,
  lastChecked: 0,
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Records);
