import * as React from 'react';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import { useLanguage } from 'contexts/TranslationProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    maxWidth: '400px',
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
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Dropdown>
      </div>
    );
  },
);

export default Select;
