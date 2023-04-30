// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';

interface IProps {
    value : number | undefined
}

export default function IdField(props : IProps) {
  const { value } = props;
  return (
    <Field id="id" name="id" label="Id" isDisabled>
      {({ fieldProps }) => (
        <Textfield
          {...fieldProps}
          defaultValue={value || undefined}
        />
      )}
    </Field>
  );
}
