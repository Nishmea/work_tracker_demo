/*Material UI*/
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';

/*Components*/

/*Actions*/

/*Styles*/
import { palette } from '../../theme';
const styles = {};

/*Constants*/

export default class DropDown extends React.Component{
  constructor(props){
    super(props);
    this.labelWidth = React.createRef();
    this.state = {
      labelWidth: 0,
    };
  }

  renderInput(){
    switch (this.props.variant) {
      case 'outlined':
        return <OutlinedInput labelWidth={this.state.labelWidth} />
        break;
      case 'filled':
        return <FilledInput />
        break;

      default:
        return false;
    }
  }

  renderNone(){
    if (this.props.allowNone) {
      return(
        <MenuItem value={''}>
          <em>Select None</em>
        </MenuItem>
      )
    }
  }
  componentDidMount(){
    this.setState({labelWidth: this.labelWidth.current.offsetWidth})
  }

  render(){
    return(
      <div style={{width: '100%', ...this.props.wrapperStyle, display: (this.props.hidden) ? 'none' : 'inherit'}}>
  			<FormControl variant={this.props.variant} fullWidth={this.props.fullWidth}>
  				<InputLabel ref={this.labelWidth}>{this.props.label}</InputLabel>
  				<Select
            name={this.props.name}
  					value={this.props.value}
  					disabled={this.props.disabled}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
  					style={this.props.style}
            input={this.renderInput()}
            SelectDisplayProps={this.props.SelectDisplayProps}
            renderValue={this.props.renderValue}
  				>
            {this.renderNone()}
            {this.props.children}
  				</Select>
  			</FormControl>
      </div>
    )
  }
}

DropDown.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'filled']),
  SelectDisplayProps: PropTypes.object,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  fullWidth: PropTypes.bool,
  allowNone: PropTypes.bool,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  renderValue: PropTypes.func,
}

DropDown.defaultProps = {
  variant: 'outlined',
  style: {},
  wrapperStyle: {},
  SelectDisplayProps: {},
  label: 'Drop Down',
  name: 'drop_down',
  value: '',
  fullWidth: false,
  allowNone: false,
  disabled: false,
  hidden: false,
}
