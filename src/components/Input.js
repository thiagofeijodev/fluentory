import * as React from 'react';
import { makeStyles, useId, Input as BaseInput, Label } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Input = (props) => {
  const inputId = useId(props.name);
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId} size={props.size} disabled={props.disabled}>
        {props?.label || props?.name}
      </Label>
      <BaseInput {...props} id={inputId} />
    </div>
  );
};

export default Input;
