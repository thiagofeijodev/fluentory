import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useForm, Controller } from 'react-hook-form';
import { Input } from 'components/Input';
import AddDialog from './AddDialog';

const useStyles = makeStyles({
  root: {},
});

export const ResourceTable = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.root}>
      <AddDialog />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur } }) => (
            <Input placeholder="Name" onBlur={onBlur} onChange={onChange} />
          )}
          name="name"
        />
        {errors.name && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default ResourceTable;
