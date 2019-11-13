/*Material UI*/
import { Snackbar as Snackbar_MUI } from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { palette } from '../../theme';

export class Snackbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
			snackbarWarning: false,
			snackbarError: false,
			snackbarNotice: false,
			error: '',
			warning: '',
			notice: '',
    };
  }

	UNSAFE_componentWillReceiveProps(nextProps){

		if (nextProps.snackbar.time !== this.props.snackbar.time) {
			switch (nextProps.snackbar.kind) {
				case 'e':
				case 'E':
				case 'error':
				case 'Error: ':
					this.setState({error: nextProps.snackbar.message, snackbarError: true })
					break;

				case 'w':
				case 'W':
				case 'warning':
				case 'Warning: ':
					this.setState({warning: nextProps.snackbar.message, snackbarWarning: true })
					break;

				case 'n':
				case 'N':
				case 'notice':
				case 'Notice: ':
					this.setState({notice: nextProps.snackbar.message, snackbarNotice: true })
					break;

				default:

			}
		}

	}


  render(){
    return(
      <React.Fragment>
  			<Snackbar_MUI
  				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
  				open={this.state.snackbarNotice}
  				autoHideDuration={4000}
  				onClose={() => this.setState({snackbarNotice: false})}
  			>
  				<SnackbarContent
  					style={{backgroundColor: palette.affirmative, color: palette.text_secondary, fontSize: '1em'}}
  					message={this.state.notice}
  					action={
  						<IconButton onClick={() => this.setState({snackbarNotice: false})}>
  							<Icon>close</Icon>
  						</IconButton>
  					}
  				/>
  			</Snackbar_MUI>

  			<Snackbar_MUI
  				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
  				open={this.state.snackbarWarning}
  				autoHideDuration={4000}
  				onClose={() => this.setState({snackbarWarning: false})}

  			>
  				<SnackbarContent
  					style={{backgroundColor: palette.warning, color: palette.text_primary, fontSize: '1em'}}
  					message={this.state.warning}
  					action={
  						<IconButton onClick={() => this.setState({snackbarWarning: false})}>
  							<Icon>close</Icon>
  						</IconButton>
  					}
  				/>
  			</Snackbar_MUI>

  			<Snackbar_MUI
  				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
  				open={this.state.snackbarError}
  				autoHideDuration={4000}
  				onClose={() => this.setState({snackbarError: false})}

  			>
  				<SnackbarContent
  					style={{backgroundColor: palette.error, color: palette.text_secondary, fontSize: '1em'}}
  					message={this.state.error}
  					action={
  						<IconButton onClick={() => this.setState({snackbarError: false})}>
  							<Icon>close</Icon>
  						</IconButton>
  					}
  				/>
  			</Snackbar_MUI>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		snackbar: state.page.snackbar,
		//kind: state.page.snackbar.kind,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

Snackbar.propTypes = {
	snackbar: PropTypes.object,
	//kind: PropTypes.string,
}

Snackbar.defaultProps = {
	snackbar: {},
	//kind: '',
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Snackbar);
