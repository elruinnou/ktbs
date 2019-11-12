import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  const {text, children, style, onClick, onBlur, disabled} = props
  
  return (
    <button 
    	style={style} 
    	onClick={onClick}
    	onBlur={onBlur} 
    	disabled={disabled}
	>
      {typeof children !== 'undefined'
      ? children
      : text
      }
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
}

export default Button
