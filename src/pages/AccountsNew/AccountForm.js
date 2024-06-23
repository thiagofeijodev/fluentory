import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'components/Input';

export const AccountForm = ({ onSubmit, form }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <Input label="Name" placeholder="Name" onBlur={onBlur} onChange={onChange} />
        )}
        name="name"
      />
      {errors.name && <span>This field is required</span>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <Input
            type="number"
            label="Amount"
            placeholder="Amount"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="amount"
      />
      {errors.amount && <span>This field is required</span>}
    </form>
  );
};

export default AccountForm;
