import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';
import { useForm, Controller } from 'react-hook-form';
import { insertAccount } from 'db';
import { Input } from 'components/Input';

export const AddDialog = () => {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    insertAccount(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(insertAccount)}>
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
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={handleSubmit(onSubmit)}>
              Do Something
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default AddDialog;
