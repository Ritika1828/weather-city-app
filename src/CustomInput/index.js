import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './index.module.scss';

const CustomInput = ({
  placeholder,
  disabled,
  type = 'text',
  value,
  icon = '',
  iconClassname,
  inputClassName,
  onBlur,
  onChange,
  onFocus,
  boxClassName,
  onEnter
}) => {
  function handleOnBlur(event) {
    event.preventDefault();

    onBlur &&
      onBlur({
        event,
        value: event.target.value
      });
  }

  function handleOnChange(event) {
    const value = event.target.value;
    if (event.target.type === 'tel' && !/^\d*$/.test(value)) {
      return true;
    }
    onChange && onChange({ value, event });
  }

  function handleFocus(event) {
    event.preventDefault();

    if (value) {
      event.target.value = '';
      event.target.value = value;
    }

    onFocus &&
      onFocus({
        event
      });
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnter &&
        onEnter({
          event,
          value: event.target.value
        });
    }
  }

  return (
    <div className={cx(styles.box, boxClassName)}>
      <input
        type={type}
        className={cx(styles.inputBox, inputClassName)}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
        value={value}
        onKeyDown={handleKeyPress}
      />
      {icon ? <div className={cx(iconClassname, styles.inputIcon)} onClick={()=> onEnter()}>{icon}</div> : null}
    </div>
  );
};

CustomInput.propTypes = {
  type: PropTypes.oneOf(['text', 'tel', 'number', 'password', 'file', 'date', 'email'])
};

export default CustomInput;
