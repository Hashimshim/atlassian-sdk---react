// eslint-disable-next-line no-use-before-define
import React from 'react';
import { RadioGroup } from '@atlaskit/radio';
import { Field } from '@atlaskit/form';

interface IProps {
  value: boolean
}

export default function CompleteField(props: IProps) {
  const { value } = props;
  return (
    <Field name="complete" defaultValue={value ? 'true' : 'false'} label="Complete">
      {({ fieldProps }) => (
        <RadioGroup
          options={[
            {
              name: 'complete',
              value: 'true',
              label: 'True',
            },
            {
              name: 'complete',
              value: 'false',
              label: 'False',
            },
          ]}
          {...fieldProps}
        />
      )}
    </Field>

  );
}
