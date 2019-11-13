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
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}

      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator={','}
      thousandsGroupStyle={'thousand'}
      allowNegative={true}
      isNumericString={true}
      allowEmptyFormatting={true}
    />
  );
}

export default class NumberInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  returnInputProps(){
    if (this.props.units) {
      let isFilled = Boolean(this.props.variant === 'filled');
      switch (this.props.position) {
        case 'start':
          return {
            readOnly: this.props.readOnly,
            inputComponent: NumberFormatCustom,
            startAdornment:
              <InputAdornment
                position={'start'}
              >
                {this.props.units}
              </InputAdornment>,
          }
          break;
        case 'end':
          return {
            readOnly: this.props.readOnly,
            inputComponent: NumberFormatCustom,
            endAdornment:
              <InputAdornment
                position={'end'}
                style={{marginBottom: (isFilled) ? '-16px' : '0px'}}
              >
                {this.props.units}
              </InputAdornment>,
          }
          break;
        default:
          return {
            readOnly: this.props.readOnly,
            inputComponent: NumberFormatCustom,
          }
      }
    }
  }

  render(){
    let isFilled = Boolean(this.props.variant === 'filled');

    return(
      <div style={{...this.props.wrapperStyle, display: (this.props.hidden) ? 'none' : 'inherit'}} key={this.props.inputKey + '_input'}>
  			<TextField
          fullWidth={this.props.fullWidth}
          variant={this.props.variant}
          label={this.props.label}
  				value={this.props.value}
          style={this.props.style}
          disabled={this.props.disabled}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          InputProps={this.returnInputProps()}
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

NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['outlined', 'filled']),
  position: PropTypes.oneOf(['start', 'end']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  inputKey: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  negative: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  number: PropTypes.bool,
  hidden: PropTypes.bool,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  units: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
}

NumberInput.defaultProps = {
  variant: 'outlined',
  align: 'right',
  position: 'end',
  inputKey: 'number_input',
  label: 'Number Input',
  fullWidth: false,
  disabled: false,
  readOnly: false,
  number: false,
  hidden: false,
  negative: false,
  style: {},
  inputStyle: {},
  wrapperStyle: {},
  onFocus: (e) => e.target.select(),
}
