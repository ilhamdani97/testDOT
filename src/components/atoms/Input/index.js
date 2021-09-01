// Input Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import TextBody from '../TextBody';
import 'react-datepicker/dist/react-datepicker.css';

const Input = ({
  id,
  className,
  placeholder,
  variant,
  value,
  name,
  type,
  title,
  subtitle,
  titleBottom,
  handleChange,
  optionSelect,
  selectedDatePicker,
  titleBottomColor,
  isDisable,
  maxlength
}) => {
  const classNames = classname('o-input', className, variant);
  return (
    <div className={classNames}>
      {type === 'select' ? (
        <>
          {title && (
            <div className="text-title white">
              {title}
              {subtitle && (
                <TextBody color="white" weight="light">
                  {subtitle}
                </TextBody>
              )}
            </div>
          )}
          <Select 
            id={id} 
            options={optionSelect} 
            onChange={handleChange} 
            isDisabled={isDisable} />
          {titleBottom && (
            <TextBody color="red" weight="light">
              {titleBottom}
            </TextBody>
          )}
        </>
      ) : type === 'date' ? (
        <>
          {title && (
            <div className="text-title">
              {title}
              {subtitle && (
                <TextBody color="gray" weight="light">
                  {subtitle}
                </TextBody>
              )}
            </div>
          )}
          <DatePicker
            id={id}
            selected={selectedDatePicker}
            onChange={handleChange}
          />
          {titleBottom && (
            <TextBody color={titleBottomColor || 'red'} weight="light">
              {titleBottom}
            </TextBody>
          )}
        </>
      ) : (
        <>
          {title && (
            <div className="text-title">
              {title}
              {subtitle && (
                <TextBody color="gray" weight="light">
                  {subtitle}
                </TextBody>
              )}
            </div>
          )}
          {isDisable ? (
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              variant={variant}
              value={value}
              onChange={handleChange}
              disabled
            />
          ) : (
            // <input type="text" id="username" name="username" ></input>
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              variant={variant}
              value={value}
              onChange={handleChange}
              onInput={
                maxlength != null
                  ? (e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, maxlength);
                    }
                  : undefined
              }
            />
          )}

          {titleBottom && (
            <TextBody color={titleBottomColor || 'red'} weight="light">
              {titleBottom}
            </TextBody>
          )}
        </>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleBottom: PropTypes.node,
  handleChange: PropTypes.func,
  selectedDatePicker: PropTypes.instanceOf(Date),
  titleBottomColor: PropTypes.string,
  optionSelect: PropTypes.array,
  isDisable: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  variant: '',
  type: '',
  id: '',
  value: '',
  name: '',
  title: '',
  subtitle: '',
  titleBottom: '',
  handleChange: () => {},
  selectedDatePicker: new Date(),
  titleBottomColor: '',
  optionSelect: [],
  isDisable: false,
  maxlength: null
};

export default Input;
