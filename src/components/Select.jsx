import * as React from 'react';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import { useLanguage } from '../hooks/useLanguage';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '100%',
  },
});

export const Select = React.forwardRef(
  ({ onChange, onBlur, name, label, options, placeholder, value }, ref) => {
    const { t } = useLanguage();
    const dropdownId = useId('dropdown-field');
    const styles = useStyles();

    return (
      <div className={styles.root}>
        <label id={dropdownId}>{label}</label>
        <Dropdown
          aria-labelledby={dropdownId}
          name={name}
          ref={ref}
          onBlur={onBlur}
          value={value}
          selectedOptions={[value]}
          placeholder={placeholder || t('Select an option...')}
          onOptionSelect={(_, data) => onChange(data.optionValue)}
        >
          {options.map((option) => {
            // Handle both string options and object options with value/label
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;

            return (
              <Option key={optionValue} value={optionValue}>
                {optionLabel}
              </Option>
            );
          })}
        </Dropdown>
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
