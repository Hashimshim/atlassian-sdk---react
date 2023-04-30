// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';

export interface IChildProps {
    value : string | undefined
}

interface IProps extends IChildProps {
    elementId: string
    elementLabel: string
}

export default function GenericTextField(props : IProps) {
  const { value, elementId, elementLabel } = props;
  return (
    <Field id={elementId} name={elementId} label={elementLabel} isRequired>
      {({ fieldProps }) => (
        <Textfield
          {...fieldProps}
          defaultValue={value || undefined}
        />
      )}
    </Field>
  );
}
