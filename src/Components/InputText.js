import React, {Component} from 'react'
import PropTypes from 'prop-types'

class InputText extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }
  onChange (value) {
    this.setState({value})
    this.props.onChange(value)
  }
  render () {
    const {value} = this.state
    const {placeholder, inputType, style, readOnly, disabled, inputRef} = this.props
    const inputTypeValue = inputType === undefined ? 'text' : inputType
    
    return (
      <div>
        <input
        	ref={inputRef}
          	value={value}
          	onChange={(e) => this.onChange(e.target.value)}
          	onBlur={() => this.props.onBlur()}
         	onFocus={() => this.props.onFocus()}
          	placeholder={placeholder}
          	style={style}
          	readOnly={readOnly}
          	disabled={disabled}
          	type={inputTypeValue}
          	onKeyDown={(e) => this.props.onKeyDown !== undefined ? this.props.onKeyDown(e, inputTypeValue) : ''}
        />
      </div>
    )
  }
}

InputText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['default', 'shadow', 'number']),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  style: PropTypes.object,
  inputType: PropTypes.string,
  readOnly: PropTypes.bool,
  inputRef: PropTypes.object,
}

InputText.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  value: '',
  type: 'default',
  readOnly: false,
}

export default InputText
