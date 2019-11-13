/*Material UI*/
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import InputBase from '@material-ui/core/InputBase';

/*Components*/

/*Actions*/

/*Styles*/
import { palette } from '../../theme';
const styles = {};

/*Constants*/

export default class TextInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div style={{width: '100%', ...this.props.wrapperStyle, display: (this.props.hidden) ? 'none' : 'inherit'}}>
  			<TextField
          fullWidth={this.props.fullWidth}
          variant={this.props.variant}
          label={this.props.label}
          name={this.props.name}
  				value={this.props.value}
          style={this.props.style}
          required={this.props.required}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
          multiline={this.props.multiline}
          rows={this.props.rows}
          rowsMax={this.props.rowsMax}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          InputLabelProps={this.props.InputLabelProps}
          InputProps={{
            readOnly: this.props.readOnly,
            ...this.props.InputProps,
          }}
          inputProps={{
            style: {
              textAlign: this.props.align,
              ...this.props.inputStyle,
            },
            maxLength: this.props.maxLength,
          }}
  			/>
      </div>
    )
  }
}

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['outlined', 'filled']),
  position: PropTypes.oneOf(['start', 'end']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool,
  rowsMax: PropTypes.number,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  style: PropTypes.object,
  InputLabelProps: PropTypes.object,
  inputStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  units: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
}

TextInput.defaultProps = {
  variant: 'outlined',
  align: 'left',
  position: 'end',
  name: '',
  label: 'Text Input',
  fullWidth: false,
  required: false,
  autoFocus: false,
  disabled: false,
  hidden: false,
  readOnly: false,
  multiline: false,
  maxLength: 50,
  style: {},
  inputStyle: {},
  wrapperStyle: {},
  onFocus: (e) => e.target.select(),
}
