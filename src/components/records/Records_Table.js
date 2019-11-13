/*Material UI*/
import {Table, TableBody, TableFooter, TableHead, TableRow, TableCell} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

/*Components*/

/*Actions*/
import { toDate } from '../../actions/utility';

/*Styles*/
import { palette } from '../../theme';
const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflowY: 'auto',
    backgroundColor: palette.paper,
  },
};

class Records extends React.Component {
	constructor(props){
		super(props);
    this.state = {};
	}

	render() {
		return (
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
                  <TableRow key={ind} hover style={{width: '100%', display: 'flex'}}>

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
		)
	}
}

const mapStateToProps = (state) => {
  return {
    records: state.log.records,
    isValid: state.log.isValid,
    projects: state.user.data.projects,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

Records.propTypes = {
  records: PropTypes.array,
  projects: PropTypes.array,
  isValid: PropTypes.bool,
}

Records.defaultProps = {
  records: [],
  projects: [],
  isValid: false,
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Records);
