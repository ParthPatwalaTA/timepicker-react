import React from 'react';

const TimeInput = ({
    focused,
    placeholder,
    value,
    disabled,
    showInput,
    onChange,
    onkeypress
  }) => {
  return (
    <div className={(focused) ? 'time-picker-input focused' : 'time-picker-input'}>
        <input 
            type="text"
            name="timepicker"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            disabled={(disabled) ? true : false}
            onFocus={() => { showInput() }}
            onKeyPress= {e => onkeypress(e) }
            maxLength="5"
            onClick={() => { showInput() }}
        />
    </div>
  )
}

export default TimeInput;