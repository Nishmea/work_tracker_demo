import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

export function PhoneInputComp(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  );
}

export default class PhoneInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div style={{...this.props.wrapperStyle, display: (this.props.hidden) ? 'none' : 'inherit'}}>
        <TextField
          fullWidth={this.props.fullWidth}
          variant={this.props.variant}
          label={this.props.label}
          name={this.props.name}
          value={this.props.value}
          disabled={this.props.disabled}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          style={this.props.style}
          inputProps={{
            style: {
              textAlign: this.props.align,
            },
            maxLength: this.props.maxLength,
          }}
          InputProps={{
            inputComponent: PhoneInputComp,
          }}
        />
      </div>
    )
  }
}

PhoneInput.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'filled']),
  align: PropTypes.oneOf(['left', 'right', 'center', 'justified']),
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
}

PhoneInput.defaultProps = {
  variant: 'outlined',
  style: {},
  wrapperStyle: {},
  align: 'left',
  disabled: false,
  hidden: false,
  fullWidth: false,
  label: 'Phone Input',
  name: 'phone_input',
  onFocus: (e) => e.target.select(),
  maxLength: 15,
}
