import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

import { palette } from '../../theme';
export function MoneyInputComp(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator={','}
      thousandsGroupStyle={'thousand'}
      decimalSeparator={'.'}
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={true}
      allowEmptyFormatting={true}
      allowLeadingZeros={true}
      prefix={'$'}
      isNumericString={false}
      //suffix={''}
    />
  );
}

export default class MoneyInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div style={{...this.props.wrapperStyle, display: (this.props.hidden) ? 'none' : 'inline'}}>
        <TextField
          variant={this.props.variant}
          label={this.props.label}
          name={this.props.name}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          disabled={this.props.disabled}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          style={this.props.style}
          fullWidth={this.props.fullWidth}
          inputProps={{
            style: {
              textAlign: this.props.align,
              //backgroundColor: palette.background,
              borderRadius: '4px',
            },
          }}
          InputProps={{
            readOnly: this.props.readOnly,
            inputComponent: MoneyInputComp,
          }}
        />
      </div>
    )
  }
}

MoneyInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  align: PropTypes.oneOf(['left', 'right', 'center', 'justified']),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  hidden: PropTypes.bool,
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
}

MoneyInput.defaultProps = {
  variant: 'outlined',
  align: 'right',
  hidden: false,
  readOnly: false,
  disabled: false,
  fullWidth: false,
  label: 'Money Input',
  name: 'money_input',
  style: {},
  wrapperStyle: {},
  onFocus: (e) => e.target.select(),
}
